import React from "react"
import { Link, graphql, useStaticQuery } from "gatsby"
import Image from "gatsby-image"
import styles from "./styles/header.module.scss"

const Header = () => {
  const data = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          title
        }
      }

      fluid: file(relativePath: { eq: "images/logo.png" }) {
        childImageSharp {
          fluid {
            ...GatsbyImageSharpFluid_tracedSVG
          }
        }
      }
    }
  `)

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <Link className={styles.title} to="/">
          <Image
            fluid={data.fluid.childImageSharp.fluid}
            className={styles.logo}
          />
        </Link>

        <nav>
          <ul className={styles.navList}>
            <li>
              <Link
                className={styles.navItem}
                activeClassName={styles.activeNavItem}
                partiallyActive={true}
                to="/blogs"
              >
                Blog
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  )
}

export default Header
