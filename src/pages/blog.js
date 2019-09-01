import React from 'react'
import Layout from '../components/Layout'

import { Link,graphql } from 'gatsby'

import styles from './blog.module.scss'
import Head from '../components/Head'
import SideBar1 from '../components/SideBar1'
import Blogs from '../components/Blogs'


const BlogPage = ({data}) => {

    return(
        <Layout>

        <Head title="Blog" />

        <h1 className={styles.h1}>
        <div className={styles.h1Wrapper}>Blog</div>
        </h1>

        <div className={styles.wrapper}>
        <div className={styles.mainContents}>
             
        <Blogs blogs={data.allContentfulBlogPost.edges}/>
        
        <Link to="/blog/page/2" className={styles.pagination}>Next</Link>
 
        </div>
        
        <div className={styles.sideWidget}>
        <SideBar1 />
        </div>


        </div>
        </Layout>

    )
}

export const getBlogData = graphql`

{
  allContentfulBlogPost(
    sort:{
      fields:publishedDate,
      order:DESC
    }
    limit:5

  ){
    totalCount
    edges{
      node{
        id
        title
        slug
        publishedDate(fromNow:true)
        catetory{
          catTitle
          catSlug
        }            
        body{
          json
        }
        excerpt
      featured
      thumbnail{
        fluid(maxWidth: 100, quality: 10){
            ...GatsbyContentfulFluid
        }
      }
      }
    }
  }
}

`

export default BlogPage