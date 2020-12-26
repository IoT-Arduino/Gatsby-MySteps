import React from "react"
import { Link, graphql } from "gatsby"
import { documentToReactComponents } from "@contentful/rich-text-react-renderer"

import styles from "./styles/blog.module.scss"
import Layout from "../components/Layout"
import SEO from "../components/SEO"

import Grid from "@material-ui/core/Grid"
import RelatedGrid from "../components/RelatedGrid"

export const query = graphql`
  query($slug: String!, $catSlug: String) {
    contentfulBlogPost(slug: { eq: $slug }) {
      title
      publishedDate(formatString: "MMMM Do, YYYY")
      catetory {
        catTitle
        catSlug
      }
      body {
        json
      }
    }

    allContentfulBlogPost(
      sort: { fields: publishedDate, order: DESC }
      filter: { catetory: { catSlug: { eq: $catSlug } } }
    ) {
      edges {
        node {
          id
          title
          slug
          publishedDate(fromNow: true)
          catetory {
            catTitle
          }
          featured
          excerpt
          thumbnail {
            fluid(maxWidth: 400, quality: 100) {
              ...GatsbyContentfulFluid_withWebp
            }
          }
        }
      }
    }
  }
`

const Blog = props => {
  const thisPageCat = JSON.stringify(
    props.data.contentfulBlogPost.catetory.catTitle
  )

  // JSON.stringify is required to prevent error

  const relatedArticles = props.data.allContentfulBlogPost.edges.filter(
    edge => JSON.stringify(edge.node.catetory.catTitle) === thisPageCat
  )

  // filter items under 3
  const newRelatedArticles = relatedArticles.slice(0, 3)

  const options = {
    renderNode: {
      "embedded-asset-block": node => {
        const alt = node.data.target.fields.title["en-US"]
        const url = node.data.target.fields.file["en-US"].url
        return <img alt={alt} src={url} />
      },
    },
  }

  return (
    <Layout>
      <SEO title={props.data.contentfulBlogPost.title} />
      <div className={styles.titleBar}></div>

      <div className={styles.wrapper}>
        <h1 className={styles.h1}>{props.data.contentfulBlogPost.title}</h1>

        <p className={styles.catDate}>
          <Link
            to={`/blog/${props.data.contentfulBlogPost.catetory.catSlug}/`}
            className={styles.catLink}
          >
            {props.data.contentfulBlogPost.catetory.catTitle}
          </Link>
          {props.data.contentfulBlogPost.publishedDate}
        </p>

        <div className={styles.contents}>
          {documentToReactComponents(
            props.data.contentfulBlogPost.body.json,
            options
          )}
        </div>

        <div className={styles.relatedWrapper}>
          <h4 className={styles.relatedTitle}>Related Articles</h4>

          <Grid container>
            {newRelatedArticles.map(({ node }) => (
              <RelatedGrid grids={node} key={node.id} />
            ))}
          </Grid>
        </div>
      </div>
    </Layout>
  )
}

export default Blog
