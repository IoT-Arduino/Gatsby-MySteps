import React, { useState } from 'react'
import { graphql,useStaticQuery } from 'gatsby'

import Head from '../../components/Head'
import Layout from '../../components/Layout'

import Grid from '@material-ui/core/Grid'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'

const airtable = () => {

    const data = useStaticQuery(graphql`
    
    query{
      allAirtable(
        filter: {
          table: {eq: "03_JavaScript&API"}, 
          data: {Title: {ne: null}}
        }, 
        sort: {fields: data___PublishedDate, order: DESC}
      ) {
        edges {
          node {
            id
            data {
              Title
              Channel
              Description
              PublishedDate
              VideoURL
              Tag
              category
              Thumbnail
            }
          }
        }
      }
      master: allAirtable(filter: {table: {eq: "00_ChargeCategory"}},
      sort: {fields:id , order: DESC}
      ) {
        edges {
          node {
            table
            data {
              Name
            }
          }
        }
      }

    }     
    `)
    
   
    const [text, setText] = useState('')
       
    return (
        
        <Layout>
        <Head title="AirTable InputSearch" />
            <h1>AirTable Input Search</h1>
            <div>
              <input onChange={event => setText(event.target.value)} value={text} />
            </div>
                
            <Grid container>
            {data.allAirtable.edges
                //item.node.id.includes(text) は動く、　
                // item.node.data.Title.includes(text) は動かない　nullがある。なぜ？
                // error msg : TypeError: Cannot read property 'includes' of null
                //　GraphQLを修正したら、エラーが消えた。(AirTableでブランク行があるとまずい)
                // 今後　Titleだけではなくて、Title+Descriptionのデータから検索したい。
                // case sensitive をなくしたい。　2019/8/14　>> 8/19 ok : 検索は単語ベース、フレーズNG

              .filter(item => item.node.data.Title.toLowerCase().includes(text.toLowerCase()))
              .map((edges) => {
                return (
                  <Grid item xs={12} sm={6} md={4} style={{padding:24}}
                  key={edges.node.id}>
                  <Card >
                  
                  <CardMedia style={{height:0, paddingTop:'56.25%'}}
                  image={edges.node.data.Thumbnail}
                  title={edges.node.data.Title}
                  />
    
                  <CardContent>
                    <Typography gutterBottom variant="inherit" component="h3" 
                        style={{height:40,overflow:'hidden',fontSize:'18px'}}>
                        {edges.node.data.Title}
                    </Typography>
                    <Typography component="p" style={{marginBottom:'10px'}} >
                    {edges.node.data.Description.substr(0,100)}...
                    </Typography>
                    <Typography component="p">
                    {edges.node.data.Channel}
                    </Typography>
                    <Typography component="p">
                    {edges.node.data.category}
                    </Typography>
                    <Typography component="p">
                    {edges.node.id}
                    </Typography>
                    <Typography component="p">
                    {edges.node.data.PublishedDate}
                    </Typography>
                  </CardContent>
    
                  <CardActions>
                  <Button size="small" color="primary" href={edges.node.data.VideoURL}
                   target="_blank">
                    Go to Course
                   </Button>
                  </CardActions>
    
                  </Card>
                  </Grid>
                )
            })}                   
            </Grid>


        </Layout>
    )
}

export default airtable
