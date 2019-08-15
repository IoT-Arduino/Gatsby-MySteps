import React from 'react'

import Header from './Header'
import Footer from './Footer'
import '../styles/index.scss'
import layoutStyles from './layout.module.scss'

import 'bootstrap/dist/css/bootstrap.css'


const Layout = (props) => {
    return (

    <div className={layoutStyles.wrapper}>
        <div className={layoutStyles.content}>
            <Header className={layoutStyles.container}/>
           <div className={layoutStyles.childContent}>{props.children}</div> 
        </div>
        
        <Footer />
    </div>

    )
}

export default Layout
