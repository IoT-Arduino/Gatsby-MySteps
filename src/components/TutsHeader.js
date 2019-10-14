import React from "react"
import { Link } from "gatsby"
import styles from "./styles/TutsHeader.module.scss"

const TutsHeader = () => {
  return (
    <div className={styles.container}>
      <h4>Tutorial Selection</h4>
      <br />
      <nav>
        <ul className={styles.navList}>
          <li>
            <Link
              className={styles.navItem}
              activeClassName={styles.activeNavItem}
              partiallyActive={true}
              to="/tuts/reaGatsby"
            >
              React&Gatsby
            </Link>
          </li>
          <li>
            <Link
              className={styles.navItem}
              activeClassName={styles.activeNavItem}
              partiallyActive={true}
              to="/tuts/vuejs"
            >
              VueJS&Gridsome
            </Link>
          </li>
          <li>
            <Link
              className={styles.navItem}
              activeClassName={styles.activeNavItem}
              partiallyActive={true}
              to="/tuts/wordpress"
            >
              WordPress
            </Link>
          </li>
          <li>
            <Link
              className={styles.navItem}
              activeClassName={styles.activeNavItem}
              partiallyActive={true}
              to="/tuts/javascript"
            >
              JavaScript
            </Link>
          </li>
          <li>
            <Link
              className={styles.navItem}
              activeClassName={styles.activeNavItem}
              partiallyActive={true}
              to="/tuts/htmlCss"
            >
              CSS
            </Link>
          </li>
          <li>
            <Link
              className={styles.navItem}
              activeClassName={styles.activeNavItem}
              partiallyActive={true}
              to="/tuts/techNews"
            >
              TechNews
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  )
}

export default TutsHeader
