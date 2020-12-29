import React from "react"

import Header from "./Header"
import Footer from "./Footer"
import "../styles/index.scss"
import layoutStyles from "./styles/layout.module.scss"

import "bootstrap/dist/css/bootstrap.css"

import "@fortawesome/fontawesome-svg-core/styles.css"
import { config } from "@fortawesome/fontawesome-svg-core"
config.autoAddCss = false

const Layout = props => {
  return (
    <div className={layoutStyles.wrapper}>
      <div className={layoutStyles.content}>
        <Header className={layoutStyles.container} />
        <div className={layoutStyles.childContent}>{props.children}</div>
      </div>

      <Footer />
    </div>
  )
}

export default Layout
