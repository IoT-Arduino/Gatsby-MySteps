import React from "react"
import { Link,graphql } from "gatsby"
import { documentToReactComponents } from "@contentful/rich-text-react-renderer"
import Image from 'gatsby-image'

import styles from './blog.module.scss'
import Layout from "../components/Layout"
import Head from '../components/Head'

export const query = graphql`

query($slug: String!,$catSlug:String) {

  contentfulBlogPost(slug: { eq: $slug }) {
    title
    publishedDate(formatString: "MMMM Do, YYYY")
    catetory {
      catTitle
      catSlug
    }    
    body {
      json
    }
  }
  
  allContentfulBlogPost(
  sort:{
    fields:publishedDate,
    order:DESC
  },
  filter: {catetory: {catSlug: {eq: $catSlug}}}
  ){
  edges{
    node{
      id
      title
      slug
      publishedDate(fromNow:true)
      catetory{
        catTitle
      }            
    featured
    excerpt
    thumbnail{
      fluid(maxWidth: 100, quality: 10){
        ...GatsbyContentfulFluid_withWebp
      }
    }
    }
  }
}  


}
`



const Blog = props => {

  const thisPageCat = JSON.stringify(props.data.contentfulBlogPost.catetory.catTitle)

  // JSON.stringify is required to prevent error
  
  const relatedArticles = props.data.allContentfulBlogPost.edges.filter(edge=> JSON.stringify(edge.node.catetory.catTitle) === thisPageCat)

  // filter items under 3
  const newRelatedArticles = relatedArticles.slice(0,3)


  const options = {
    renderNode: {
      "embedded-asset-block": (node) => {
        const alt = node.data.target.fields.title['en-US']
        const url = node.data.target.fields.file['en-US'].url
        return <img alt={alt} src={url} />
      }
    }
  }


  return (
    <Layout>
      <Head title={props.data.contentfulBlogPost.title} />
      <div className={styles.titleBar}></div>
      
      <div className={styles.wrapper}>

      <h1 className={styles.h1}>{props.data.contentfulBlogPost.title}</h1>
      <p>{props.data.contentfulBlogPost.catetory.catTitle}</p>
      <p>{props.data.contentfulBlogPost.publishedDate}</p>

      <div className={styles.contents}>
      {documentToReactComponents(props.data.contentfulBlogPost.body.json, options)}
      </div>

      <div>
        <div className={styles.relatedTitle}>
        <h4>
         Related Articles
        </h4>
         </div>

         {console.log(newRelatedArticles[0])}


        <div className={styles.relatedArticles}>     
        {newRelatedArticles.map(({node}) =>  
        <div key={node.id} className={styles.relatedItems}>
          <Image fluid={node.thumbnail.fluid} 
             className={styles.relatedImage}/>
          <div className={styles.relatedTexts}>   
          <Link to={`/blog/${node.slug}`}
           className={styles.relatedLink}>
          {node.title}<br />
          </Link>
          <p className={styles.relatedDesc}>{node.excerpt}</p>
          </div>
        </div>
        )}
        { newRelatedArticles.length <1  ? <p>no posts</p> : ""}
      
        </div>
      </div> 
      </div>
      
    </Layout>

  )
}



export default Blog


