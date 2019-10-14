import React from "react"
import { graphql } from "gatsby"
import Select from "react-select"

import Head from "../../components/Head"
import Layout from "../../components/Layout"
import TutsHeader from "../../components/TutsHeader"
import styles from "./styles/tutorial.module.scss"

import Grid from "@material-ui/core/Grid"
import PageGrid from "../../components/PageGrid"

class Wordpress extends React.Component {
  constructor() {
    super()
    this.state = {
      selectedOption: null,
    }
  }

  handleChange = selectedOption => {
    this.setState({ selectedOption })
    // console.log(`Option selected:`, selectedOption);
  }

  //　Initialized selected option
  handleReset = () => {
    this.setState({ selectedOption: (this.state.selectedOption = null) })
    // console.log(`Set state Null:`, this.state);
  }

  render() {
    const { data } = this.props
    const { selectedOption } = this.state

    //　get select option from airtable master and make it array(object)
    const selectValue = data.master.edges.map(edge => {
      return {
        value: edge.node.data.Name,
        label: edge.node.data.Name,
      }
    })

    return (
      <Layout>
        <Head title="WordPress&API Tutorial Selection" />

        <div className={styles.container}>
          <TutsHeader />

          <div className={styles.selectBlock}>
            <Select
              value={selectedOption}
              onChange={this.handleChange}
              options={selectValue}
              className={styles.selector}
            />
            <button onClick={this.handleReset} className={styles.resetBtn}>
              Reset
            </button>
          </div>

          <Grid container>
            {data.allAirtable.edges
              .filter(edges =>
                !selectedOption
                  ? edges.node.data.category
                  : edges.node.data.category === selectedOption.value
              )
              .map(edges => {
                return <PageGrid grids={edges} key={edges.node.id} />
              })}
          </Grid>
        </div>
      </Layout>
    )
  }
}

export const pageQuery = graphql`
  query {
    allAirtable(
      filter: { table: { eq: "04_WordPress" }, data: { Title: { ne: null } } }
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
`

export default Wordpress
