import React from 'react'
import Layout from '../components/Layout'
import Image from 'gatsby-image'
import { Link } from 'gatsby'
import { graphql } from 'gatsby'

import Head from '../components/Head'
import SideBar1 from '../components/SideBar1'
import Pagination from '../components/BlogPagination';

import styles from './postList.module.scss'

const postList = ({
  data: { file, allContentfulBlogPost },
  pageContext: {
    catId,
    catName,
    catSlug,
    categories,
    humanPageNumber,
    numberOfPages,
  },
}) =>(


  <Layout>
  <Head title="Head" />

  <h1 className={styles.h1}>
  <div className={styles.h1Wrapper}>Blog</div>
  </h1>

  <div className={styles.wrapper}>
  <div className={styles.mainContents}>

  {console.log(allContentfulBlogPost.edges[0])}

    <div>
          {allContentfulBlogPost.edges.map(post => (
            <article key={post.node.id}  
             className={styles.postsList}>

            <Image fluid={post.node.thumbnail.fluid} 
            className={styles.postImage} />

            <div className={styles.postText}>
              <Link 
              to={`/blog/${post.node.slug}/`}
              className={styles.postTitle}>
                {post.node.title}
              </Link>
              <p>
               <Link 
                   to={`/blog/${post.node.catetory.catSlug}/`}
                   className={styles.catLink}
                   >
                   {post.node.catetory.catTitle}</Link>
                   {post.node.publishedDate}
              </p>
             
              <p>{post.node.excerpt.substr(0,150)}</p>
            </div>

            <div className="dot_divider">
            </div>

            </article>
          ))}
    </div>

        <Pagination
          page={humanPageNumber}
          totalPages={numberOfPages}
        />

      </div>

      <div className={styles.sideWidget}>
      <SideBar1 />
      </div>


    </div>
  </Layout>

)



export default postList


export const postListQuery = graphql`

query postListQuery($skip:Int! , $limit:Int!){
    allContentfulBlogPost(
        sort:{
          fields:publishedDate,
          order:DESC
        },
        limit:$limit
        skip:$skip    
      ){
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