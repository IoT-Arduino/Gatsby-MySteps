import React from 'react'
import { Link,graphql,useStaticQuery } from 'gatsby'

import footerStyles from './footer.module.scss'

const Footer = () => {

    const data = useStaticQuery(graphql`
    
    query{
        site{
            siteMetadata{
                author
            }
        }
    }    
    
    `)
    return (

        <footer className={footerStyles.footer}>

        <div className={footerStyles.footerRow}>
        <div className="row">
        
            <div className="col-sm-4">
                <h4>Social</h4>
            <ul>
                <li>Twiter:<a href="/">Twitter</a></li>
                <li>GitHub:<a href="/">GitHub</a></li>
            </ul>
            </div>

            <div className="col-sm-4">
                <h4>Portfolio</h4>
                <ul>
                    <li><a href="/">Learning Note</a></li>
                    <li><a href="/">To be created</a></li>
                </ul>
            </div>

            <div className="col-sm-4">
                <h4>About</h4>
                <ul>
                    <li><Link to="/contact">Contact</Link></li>
                    <li><a href="/">Sitemap</a></li>
                </ul>
            </div>
        
        </div>
        </div>

        <div className="text-center">
        <p>Created by {data.site.siteMetadata.author},(c)copy 2019</p></div>

        </footer>
    
    
    
        )
}

export default Footer
