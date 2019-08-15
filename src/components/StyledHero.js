import React from 'react'
import BackgroundImage from 'gatsby-background-image'
import styles from './styledHero.module.scss'

const StyledHero = ({img,children}) => {
    return (
        <BackgroundImage className={styles.jumbotron} fluid={img} >
            {children}
        </BackgroundImage>
    )
}

export default StyledHero
