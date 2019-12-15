import React from "react"
import styles from "./styles/sidebar1.module.scss"
import { Link, graphql, useStaticQuery } from "gatsby"

const SideBar1 = () => {
  const res = useStaticQuery(graphql`
    query {
      allContentfulCategory {
        totalCount
        edges {
          node {
            id
            catTitle
            catSlug
          }
        }
      }
    }
  `)

  return (
    <div className={styles.widgetBox}>
    <div className={styles.widgetTitle}>Blog Category</div>
      <ul className={styles.sideUl}>
        {res.allContentfulCategory.edges.map(edge => {
          return (
            <Link to={`/blog/${edge.node.catSlug}`} key={edge.node.id}>
              <li>
                <p className={styles.sideList}>{edge.node.catTitle}</p>
              </li>
            </Link>
          )
        })}
      </ul>
    </div>
  )
}

export default SideBar1
