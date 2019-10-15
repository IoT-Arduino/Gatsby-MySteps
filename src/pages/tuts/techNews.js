import React, { useState } from "react"
import { graphql, useStaticQuery } from "gatsby"

import SEO from '../../components/SEO'
import Layout from "../../components/Layout"
import TutsHeader from "../../components/TutsHeader"
import styles from "./styles/tutorial.module.scss"

import Grid from "@material-ui/core/Grid"
import PageGrid from "../../components/PageGrid"

const airtable = () => {
  const data = useStaticQuery(graphql`
    query {
      allAirtable(
        filter: { table: { eq: "06_TechNews" }, data: { Title: { ne: null } } }
        sort: { fields: data___PublishedDate, order: DESC }
      ) {
        edges {
          node {
            id
            data {
              Title
              Channel
              Description
              PublishedDate
              VideoURL
              Tag
              category
              Thumbnail
            }
          }
        }
      }
      master: allAirtable(
        filter: { table: { eq: "00_ChargeCategory" } }
        sort: { fields: id, order: DESC }
      ) {
        edges {
          node {
            table
            data {
              Name
            }
          }
        }
      }
    }
  `)

  const [text, setText] = useState("")

  return (
    <Layout>
      <SEO title="Tech News & Tutorials" />

      <div className={styles.container}>
        <TutsHeader />

        <div className={styles.inputBox}>
          <h3>Tech News & Tutorials Search</h3>
          <input onChange={event => setText(event.target.value)} value={text} />
        </div>

        <Grid container>
          {data.allAirtable.edges
            .filter(item =>
              item.node.data.Title.toLowerCase().includes(text.toLowerCase())
            )
            .map(edges => {
              return <PageGrid grids={edges} key={edges.node.id} />
            })}
        </Grid>
      </div>
    </Layout>
  )
}

export default airtable
