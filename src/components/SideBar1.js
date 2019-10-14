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
    <div>
      <ul className={styles.sideUl}>
        {res.allContentfulCategory.edges.map(edge => {
          return (
            <Link to={`/blog/${edge.node.catSlug}`} key={edge.node.id}>
              <li>
                <h4 className={styles.sideList}>{edge.node.catTitle}</h4>
              </li>
            </Link>
          )
        })}
      </ul>
    </div>
  )
}

export default SideBar1
