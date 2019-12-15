import React from "react"
import { graphql, useStaticQuery } from "gatsby"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faTwitter, faGithub } from "@fortawesome/free-brands-svg-icons"
import footerStyles from "./styles/footer.module.scss"

const Footer = () => {
  const data = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          author
        }
      }
    }
  `)
  return (
    <footer className={footerStyles.footer}>
      <div className={footerStyles.footerRow}>
        <div className="row">
          <div className="col-sm-4 text-center">
            <h4>Social</h4>
            <ul>
              <li>
                Twiter:{" "}
                <a href="https://twitter.com/DengenT?lang=ja">
                  <FontAwesomeIcon
                    icon={faTwitter}
                    style={{ color: "#777", fontSize: "1rem" }}
                  />
                </a>
              </li>
              <li>
                GitHub:{" "}
                <a href="https://github.com/IoT-Arduino?tab=repositories">
                  <FontAwesomeIcon
                    icon={faGithub}
                    style={{ color: "#777", fontSize: "1rem" }}
                  />
                </a>
              </li>
            </ul>
          </div>

          <div className="col-sm-4 text-center">
            <h4>Portfolio</h4>
            <ul>
              <li>
                <a href="/">Learning Note</a>
              </li>
              <li>
                <a href="/">To be created</a>
              </li>
            </ul>
          </div>

          <div className="col-sm-4 text-center">
            <h4>About</h4>
            <ul>
              <li>
                <a href="/">Contact</a>
              </li>
              <li>
                <a href="/" target="_blank" rel="noopener noreferrer">
                  Sitemap
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="text-center">
        <p>Created by {data.site.siteMetadata.author}  (c)copy 2019</p>
      </div>
    </footer>
  )
}

export default Footer
