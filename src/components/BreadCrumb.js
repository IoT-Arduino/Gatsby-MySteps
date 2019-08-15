import React from 'react'
import { Link } from 'gatsby';
import { PropTypes } from 'prop-types';

import styles from './BreadCrumb.module.scss'

const BreadCrumb = ({parent}) => {
    return (
        <div>
            <div className="container">
            <div className="row">
            <div className="col-lg-9">
            <div className={styles.breadCrumbWrapper}>
            <Link to="/">
             <span>MySteps</span>
            </Link>
            <span className="divider">/</span>
            {parent ? (
                <div>
                <Link to={parent.link}>
                 <span>parent.title</span>
                </Link>      
                <span className="divider">/</span>          
                </div>
            ): null}
            </div>
            </div>
            </div>
            </div>
        </div>
    )
}

BreadCrumb.prototype = {
    parent:PropTypes.object,
}

export default BreadCrumb

//使う局面が現状ない。コードだけ仮置き　20190719
