import React from "react"
import Image from "gatsby-image"
import { Link } from "gatsby"
import styles from "./styles/blogSingle.module.scss"

const blogSingle = ({ blog }) => {
  const mainImage = blog.thumbnail.fluid

  return (
    <div className={styles.postsList}>
      <Image fluid={mainImage} className={styles.postImage} />

      <div className={styles.postText}>
        <Link to={`/blog/${blog.slug}`} className={styles.postTitle}>
          {blog.title}
        </Link>

        <p>
          <Link
            to={`/blog/${blog.catetory.catSlug}/`}
            className={styles.catLink}
          >
            {blog.catetory.catTitle}
          </Link>
          {blog.publishedDate}
        </p>
        <p>{blog.excerpt.substr(0, 150)}</p>
      </div>
    </div>
  )
}

export default blogSingle
