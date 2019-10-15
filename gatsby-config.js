require("dotenv").config({
  path: `.env`,
})

module.exports = {
  siteMetadata: {
    title: "My Programing",
    description: `React,Vue,JavaScript,CSS`,
    author: "Maruo",
    twitterUsername:"@DengenT",
    image:'/SiteTop.jpg',
    siteUrl:'https://mysteps.netlify.com',
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-contentful`,
      options: {
        spaceId: process.env.CONTENTFUL_SPACE_ID,
        accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
      },
    },
    "gatsby-plugin-sass",
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "src",
        path: `${__dirname}/src/`,
      },
    },
    `gatsby-transformer-sharp`,
    "gatsby-plugin-sharp",
    // {
    //   resolve: "gatsby-transformer-remark",
    //   options: {
    //     plugins: [
    //       "gatsby-remark-relative-images",
    //       {
    //         resolve: "gatsby-remark-images",
    //         options: {
    //           maxWidth: 750,
    //           linkImagesToOriginal: false,
    //         },
    //       },
    //     ],
    //   },
    // },
    {
      resolve: `gatsby-source-airtable`,
      options: {
        apiKey: process.env.AIRTABLE_APIKEY,
        tables: [
          {
            baseId: process.env.AIRTABLE_BASEID,
            tableName: `01_React&Gatsby`,
          },
          {
            baseId: process.env.AIRTABLE_BASEID,
            tableName: `02_VueJs`,
          },
          {
            baseId: process.env.AIRTABLE_BASEID,
            tableName: `03_JavaScript&API`,
          },
          {
            baseId: process.env.AIRTABLE_BASEID,
            tableName: `04_WordPress`,
          },
          {
            baseId: process.env.AIRTABLE_BASEID,
            tableName: `05_CSS-jQuery`,
          },
          {
            baseId: process.env.AIRTABLE_BASEID,
            tableName: `06_TechNews`,
          },
          {
            baseId: process.env.AIRTABLE_BASEID,
            tableName: `00_ChargeCategory`,
          },
          {
            baseId: process.env.AIRTABLE_BASEID,
            tableName: `Programing`,
          },
          {
            baseId: process.env.AIRTABLE_BASEID,
            tableName: `Programing-Category`,
          },
        ],
      },
    },
    `gatsby-plugin-styled-components`,
    {
      resolve: "gatsby-plugin-prefetch-google-fonts",
      options: {
        fonts: [
          {
            family: "Open Sans",
            variants: ["200", "400", "500", "600", "700"],
          },
        ],
      },
    },
    {
      resolve: "gatsby-plugin-google-analytics",
      options: {
        trackingId: process.env.googleAnalyticsID,
      },
    },
    "gatsby-plugin-twitter",
  ],
}
