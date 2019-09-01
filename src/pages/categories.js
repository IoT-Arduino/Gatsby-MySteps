import React from 'react'
import { Link,graphql,useStaticQuery } from 'gatsby'

import Head from '../components/Head'


const categories = () => {
    
    const res = useStaticQuery(graphql`
     
    query{
        allContentfulCategory{
         totalCount
          edges{
          node{
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
        <Head />
        <ul>
        {res.allContentfulCategory.edges.map((edge) => {
            return (
                <Link to={`/categories/${edge.node.catSlug}`}>
                <li key={edge.node.id}>
                  <h2>{edge.node.catTitle}</h2> 
                </li>                
                </Link>
            )
        })}                   
        </ul>    
        </div>
    )
}

export default categories
