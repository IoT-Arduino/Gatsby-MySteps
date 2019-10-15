import React from "react"
import Layout from "../components/Layout"
import { graphql } from "gatsby"

import SEO from '../components/SEO'
import SideBar1 from "../components/SideBar1"
import Pagination from "../components/CatPagination"

import styles from "./styles/postList.module.scss"
import Blogs from "../components/Blogs"

const postListCat = ({
  data: { file, allContentfulBlogPost },
  pageContext: {
    catId,
    catName,
    catSlug,
    categories,
    humanPageNumber,
    numberOfPages,
  },
}) => (
  <Layout>
    <SEO title={allContentfulBlogPost.edges[0].node.catetory.catTitle} />

    <h1 className={styles.h1}>
      <div className={styles.h1Wrapper}>
        {allContentfulBlogPost.edges[0].node.catetory.catTitle}
      </div>
    </h1>

    <div className={styles.wrapper}>
      <div className={styles.mainContents}>
        <Blogs blogs={allContentfulBlogPost.edges} />

        <Pagination
          catSlug={catSlug}
          page={humanPageNumber}
          totalPages={numberOfPages}
        />
      </div>

      <div className={styles.sideWidget}>
        <SideBar1 />
      </div>
    </div>
  </Layout>
)

export default postListCat

export const postListCatQuery = graphql`
  query postListCatQuery($catSlug: String!, $skip: Int!, $limit: Int!) {
    allContentfulBlogPost(
      sort: { fields: publishedDate, order: DESC }
      filter: { catetory: { catSlug: { eq: $catSlug } } }
      limit: $limit
      skip: $skip
    ) {
      edges {
        node {
          id
          title
          slug
          publishedDate(fromNow: true)
          catetory {
            catTitle
            catSlug
          }
          body {
            json
          }
          featured
          excerpt
          thumbnail {
            fluid(maxWidth: 100, quality: 10) {
              ...GatsbyContentfulFluid
            }
          }
        }
      }
    }
  }
`
