import React from "react"

import Layout from "../components/Layout"
import SEO from '../components/SEO'
import TutsBlock from '../components/TutsBlock'

const tuts = () => {
  return (
    <Layout>
      <SEO title="Tutorial Index" />
      <TutsBlock />
 
    </Layout>
  )
}

export default tuts
