import React from "react"
import { Link } from "gatsby"

import Layout from "../components/Layout"
import SEO from '../components/SEO'
import styles from "./index.module.scss"

const NotFound = () => {
  return (
    <Layout>
      <div styles={styles.container}>
        <SEO title="Error"/>
        <h1>Page not found</h1>
        <p>
          <Link to="/"> Head home </Link>
        </p>
      </div>
    </Layout>
  )
}

export default NotFound
