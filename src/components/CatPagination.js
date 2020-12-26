import React from "react"
import { Link } from "gatsby"

import styles from "./styles/catPagination.module.scss"

const CatPagination = ({ catSlug, page, totalPages }) => (
  <div className={styles.paginationWrapper}>
    <p className={styles.paginationNumber}>
      Page {page} / {totalPages}
    </p>
    <div>
      {page > 1 ? (
        <Link
          to={`/blog/${catSlug}/${page === 2 ? "" : page - 1}/`}
          className={styles.paginationBtn}
        >
          Previous
        </Link>
      ) : (
        <div />
      )}
      {page < totalPages ? (
        <Link
          to={`/blog/${catSlug}/${page + 1}/`}
          className={styles.paginationBtn}
        >
          Next
        </Link>
      ) : (
        <div />
      )}
    </div>
  </div>
)

export default CatPagination
