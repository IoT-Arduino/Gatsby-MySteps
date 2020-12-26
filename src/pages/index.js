import React from "react"
import Image from "gatsby-image"
import { graphql } from "gatsby"
import Layout from "../components/Layout"
import SEO from "../components/SEO"
import TutsBlock from "../components/TutsBlock"

import styles from "./index.module.scss"

import Grid from "@material-ui/core/Grid"
import Card from "@material-ui/core/Card"
import CardActions from "@material-ui/core/CardActions"
import CardContent from "@material-ui/core/CardContent"
import CardMedia from "@material-ui/core/CardMedia"
import Button from "@material-ui/core/Button"
import Typography from "@material-ui/core/Typography"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCheck } from "@fortawesome/free-solid-svg-icons"

export const query = graphql`
  {
    allContentfulBlogPost(
      sort: { fields: publishedDate, order: DESC }
      filter: { featured: { eq: true } }
    ) {
      edges {
        node {
          title
          slug
          publishedDate(formatString: "MMMM Do, YYYY")
          catetory {
            catTitle
          }
          body {
            json
          }
          excerpt
          thumbnail {
            fluid(maxWidth: 400, quality: 100) {
              ...GatsbyContentfulFluid
            }
          }
        }
      }
    }

    defaultBcg: file(relativePath: { eq: "images/heroImage.jpg" }) {
      childImageSharp {
        fluid(quality: 90, maxWidth: 4600) {
          ...GatsbyImageSharpFluid_withWebp
        }
      }
    }

    fluid: file(relativePath: { eq: "images/pic1.jpg" }) {
      childImageSharp {
        fluid {
          ...GatsbyImageSharpFluid
        }
      }
    }
  }
`

const IndexPage = ({ data }) => {
  return (
    <Layout>
      <SEO title="Home" />

      <div className={styles.jumboContainer}>
        <h1 className={styles.jumboTitle}>Y-Learning</h1>
        <p className={styles.jumboText}>
          Tutorial Selections for Frontend Developers
        </p>
      </div>

      <div className={styles.container}>
        <TutsBlock />

        <div className={styles.pickupBlock}>
          <h3 className={styles.panelTitle}>PickUp Articles</h3>

          <Grid container spacing={3}>
            {data.allContentfulBlogPost.edges.map(edge => {
              return (
                <Grid
                  item
                  xs={12}
                  sm={6}
                  md={3}
                  style={{ padding: 24 }}
                  key={edge.node.title}
                >
                  <Card>
                    <CardMedia
                      style={{ height: 0, paddingTop: "56.25%" }}
                      image={edge.node.thumbnail.fluid.src}
                      title={edge.node.title}
                    />
                    <CardContent>
                      <Typography
                        gutterBottom
                        variant="inherit"
                        component="h3"
                        style={{
                          height: 40,
                          overflow: "hidden",
                          fontSize: "18px",
                        }}
                      >
                        {edge.node.title}
                      </Typography>
                      <Typography
                        component="p"
                        style={{ marginBottom: "10px" }}
                      >
                        "{edge.node.excerpt.substr(0, 130)}..."
                      </Typography>
                    </CardContent>
                    <CardActions>
                      <Button
                        size="small"
                        color="primary"
                        href={`/blog/${edge.node.slug}`}
                        target="_blank"
                      >
                        Go to Article
                      </Button>
                    </CardActions>
                  </Card>
                </Grid>
              )
            })}
          </Grid>
        </div>

        <section className={styles.contentRegion2}>
          <div className="row">
            <div className="col-md-5">
              <Image
                className={styles.region2Img}
                fluid={data.fluid.childImageSharp.fluid}
              />
            </div>

            <div className="col-md-7">
              <h3 className={styles.listGroupHeader}>
                Feature of this Gatsby theme
              </h3>
              <ul>
                <li className={styles.listGroupItem}>
                  <FontAwesomeIcon icon={faCheck} className={styles.fa} />
                  The Logo is created with{" "}
                  <a
                    href="https://www.designevo.com/jp/"
                    title="free logo maker"
                  >
                    DesignEvo
                  </a>
                </li>
                <li className={styles.listGroupItem}>
                  <FontAwesomeIcon icon={faCheck} className={styles.fa} />
                  Using Bootstrap and Material-UI for grid system
                </li>
                <li className={styles.listGroupItem}>
                  <FontAwesomeIcon icon={faCheck} className={styles.fa} />
                  CreatePage with GraphQL and Airtable{" "}
                </li>
              </ul>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  )
}

export default IndexPage
