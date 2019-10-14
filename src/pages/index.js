import React from "react"
import { Link } from 'gatsby'
import Image from 'gatsby-image'
import {graphql} from "gatsby"

import Head from '../components/Head'
import Header from '../components/Header'
import StyledHero from '../components/StyledHero'
import SideBar1 from '../components/SideBar1'

import styles from "./index.module.scss"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faWordpress,faReact,faVuejs,faJsSquare,faTwitter,faGithub } from "@fortawesome/free-brands-svg-icons"
import { faDesktop,faFileCode,faArrowCircleRight } from '@fortawesome/free-solid-svg-icons'


export const query = graphql`

  {  
    allContentfulBlogPost(
      sort:{
        fields:publishedDate,
        order:DESC
      },
      filter: {featured: {eq: true}}
    ){
      edges{
        node{
          title
          slug
          publishedDate(formatString:"MMMM Do, YYYY")
          catetory{
            catTitle
          }
          body {
            json
          }
          excerpt
          thumbnail{
            fluid(maxWidth: 100, quality: 10){
                ...GatsbyContentfulFluid
            }
          }   
        }
      }
    }

    defaultBcg:file(relativePath:{eq:"images/heroImage.jpg"}){
      childImageSharp{
        fluid(quality:90,maxWidth:4600){
          ...GatsbyImageSharpFluid_withWebp
        }
      }
    }

    fluid:file(relativePath:{eq:"images/pic1.jpg"}){
      childImageSharp{
        fluid{
            ...GatsbyImageSharpFluid
        }
      }
    }
     
  }
`

const IndexPage = ({data}) => {
    return (
    <div>

    <Head title="My Programing Steps"/>
    <Header />


    <StyledHero img={data.defaultBcg.childImageSharp.fluid}>
      <div className={styles.jumboContainer}>
        <h1 className={styles.jumboText}>My Programing</h1>
        </div>
    </StyledHero>



    <div className={styles.container}>
  
    <div className="row">

        <div className="col-lg-9">
        
        <div className="pickUp">
        
        <div className="panelHeading">
        <h3 className={styles.panelTitle}>PickUp Article</h3>
        </div>  

        <article> 
        
         <ul>
         {data.allContentfulBlogPost.edges.map((edge) => {
             return (

                 <li key={edge.node.title} className={styles.pickList} >
                  <Link to={`/blog/${edge.node.slug}`} className={styles.pickItem}>
      　            <Image fluid={edge.node.thumbnail.fluid} className={styles.pickItemImage}/>
                    <div className={styles.pickItemDesc}>
                      <h4 className={styles.pickItemDescTitle}>{edge.node.title}</h4> 
                      <p className={styles.pickItemDescText}>{edge.node.excerpt.substr(0,100)}...</p>
                    </div>
                  </Link>                 
                 </li>

             )
         })}                   
         </ul>
         </article>
        
        </div>

        </div>

    <div className="col-lg-3">
    <div className="row">
    <div className="col-md-4 col-lg-12">
    <div className={styles.widgetBox}>
     Blog Category
     <SideBar1 />
     </div>
    </div>

    <div className="col-md-8 col-lg-12">
      <div className={styles.twitterWidgetBox}>
        <a class="twitter-timeline" href="https://twitter.com/DengenT?ref_src=twsrc%5Etfw" data-width="100%" data-height="380">Twitter</a>
      </div>
    
    </div>
    </div>
    
    </div>
  
    </div>


    <div className={styles.contentRegion1}>

      <section className="row">
            <div className="col-md-12">
              <h2>Programing Tutorials</h2>
              <p>Youtube,Udemy etc..</p>
            </div>
        </section>
      </div>

    <div className={styles.blockWrapper}>
      <section className="row">

      <div className="col-sm-6 col-lg-4">
      <div className={styles.block}>
      <Link to="/tuts/reaGatsby">
      <FontAwesomeIcon icon={faReact}  style={{color:"#0FAF97",fontSize:"3rem"}} />
        <h3 className={styles.blockTitle}>React<br />Gatsby</h3>
      </Link>
        <p className={styles.blockText}>React&Gatsby Tutorial Information</p>
      </div>

      <Link to="/tuts/reaGatsby">
        <div className={styles.blockMask}>
          <div className={styles.blockCaption}>
            <FontAwesomeIcon icon={faArrowCircleRight}   />
          </div>
        </div>
      </Link>

      </div>
    
      <div className="col-sm-6 col-lg-4">
        <div className={styles.block}>
        <Link to="/tuts/vuejs">
        <FontAwesomeIcon icon={faVuejs}  style={{color:"#0FAF97",fontSize:"3rem"}}/>
          <h3>Vue.js<br />Gridsome</h3>
          </Link>
          <p>VueJs&Gridsome Tutorial Information</p>
        </div>

        <Link to="/tuts/vuejs">
          <div className={styles.blockMask}>
            <div className={styles.blockCaption}>
              <FontAwesomeIcon icon={faArrowCircleRight}   />
            </div>
          </div>
        </Link>

      </div>

      <div className="col-sm-6 col-lg-4">
        <div className={styles.block}>
        <Link to="/tuts/wordpress">
        <FontAwesomeIcon icon={faWordpress}  style={{color:"#0FAF97",fontSize:"3rem"}} />
          <h3>Wordpress</h3>
        </Link>
          <p>Opensource ContentsManagementSystem(CMS).Initial Version Released in Jul2003.</p>
        </div>

        <Link to="/tuts/wordpress">
          <div className={styles.blockMask}>
            <div className={styles.blockCaption}>
              <FontAwesomeIcon icon={faArrowCircleRight}   />
            </div>
          </div>
        </Link>

      </div>

      <div className="col-sm-6 col-lg-4">
        <div className={styles.block}>
        <Link to="/tuts/javascript">
        <FontAwesomeIcon icon={faJsSquare}  style={{color:"#0FAF97",fontSize:"3rem"}} />
          <h3>JavaScript/jQuery</h3>
        </Link>
          <p>JavaScript&jQuery Tutorial Information</p>
        </div>

        <Link to="/tuts/javascript">
          <div className={styles.blockMask}>
            <div className={styles.blockCaption}>
              <FontAwesomeIcon icon={faArrowCircleRight}   />
            </div>
          </div>
        </Link>

      </div>

      <div className="col-sm-6 col-lg-4">
          <div className={styles.block}>
          <Link to="/tuts/htmlCss">
          <FontAwesomeIcon icon={faFileCode}  style={{color:"#0FAF97",fontSize:"3rem"}} />
            <h3>HTML/CSS</h3>
          </Link>
            <p>HTML&CSS Tutorial Information</p>
          </div>

          <Link to="/tuts/htmlCss">
            <div className={styles.blockMask}>
              <div className={styles.blockCaption}>
                <FontAwesomeIcon icon={faArrowCircleRight}   />
              </div>
            </div>
          </Link>

        </div>

        <div className="col-sm-6 col-lg-4">
          <div className={styles.block}>
          <Link to="/tuts/techNews">
          <FontAwesomeIcon icon={faDesktop}  style={{color:"#0FAF97",fontSize:"3rem"}} />
            <h3>TechNews</h3>
          </Link>
            <p>TechNews（To be Created）</p>
          </div>

          <Link to="/tuts/techNews">
          <div className={styles.blockMask}>
            <div className={styles.blockCaption}>
              <FontAwesomeIcon icon={faArrowCircleRight}   />
            </div>
          </div>
          </Link>
          
        </div>

      </section>
     </div>

     

    <section className={styles.contentRegion2}>
    <div className="row" >

        <div className="col-md-5">
        <Image className={styles.region2Img} fluid={data.fluid.childImageSharp.fluid} />
        </div>
        
      <div className="col-md-7">
        <h3>Fearute of this Gatsby theme</h3>
        <ul >
          <li className={styles.listGroupItem}>Convert from WordPress theme to Gatsby theme </li>
          <li className={styles.listGroupItem}>The Logo is created with <a href="https://www.designevo.com/jp/" title="free logo maker">DesignEvo</a></li>
          <li className={styles.listGroupItem}>Using Bootstrap and Material-UI for grid system</li>
          <li className={styles.listGroupItem}>CreatePage with GraphQL and Airtable </li>
        </ul>
      </div>

    </div>
  </section>



    </div>

    <footer className={styles.footer}>


    <div className={styles.footerRow}>

    <div className="row p-20">
    
        <div className="col-sm-4">
            <h4>Social</h4>
            <ul>
                <li>Twiter: <a href="https://twitter.com/DengenT?lang=ja"><FontAwesomeIcon icon={faTwitter}  style={{color:"#0FAF97",fontSize:"1rem"}} /></a></li>
                <li>GitHub: <a href="https://github.com/IoT-Arduino"><FontAwesomeIcon icon={faGithub}  style={{color:"#0FAF97",fontSize:"1rem"}} /></a></li>
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
              <li><a href="/">Sitemap</a></li>
              <li><a href="/">Sitemap</a></li>
            </ul>
        </div>
    
    </div>

    </div>


    <div className={"text-center"}><p>Created by Maruo ,(c)copy 2019</p></div>


    </footer>

    </div>
    )


}

export default IndexPage


