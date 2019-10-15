import React from 'react';
import {Helmet} from 'react-helmet'
import {useStaticQuery, graphql} from 'gatsby'

const getData = graphql`
    query{
        site{
        siteMetadata{
            siteTitle:title
            siteDescription:description
            author
            siteUrl
            image
            twitterUsername
        }
        }
    }
`

const SEO = ({title, description}) => {
    const {site} = useStaticQuery(getData);

    const {siteDescription,siteTitle,siteUrl,image,twitterUsername} = site.siteMetadata

    return (
        <Helmet htmlAttributes={{ lang: "en"}} title={`${title} | ${siteTitle} `}>
            <meta name="description" content={ description || siteDescription } />
            <meta name="image" content={image} />
            {/* twitter card */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:creator" content={twitterUsername} />
            <meta name="twitter:title" content={siteTitle} />
            <meta name="twitter:description" content={description} />
            <meta name="twitter:image" content={`${siteUrl}${image}`} />
        </Helmet>
    );
}

export default SEO;
