import React from "react"
import styles from "./tuts.module.scss"
import Layout from "../components/Layout"
import SEO from "../components/SEO"
import TutsBlock from "../components/TutsBlock"

const tuts = () => {
  return (
    <Layout>
      <SEO title="Tutorial Index" />
      <div className={styles.wrapper}>
        <TutsBlock />
      </div>
    </Layout>
  )
}

export default tuts
