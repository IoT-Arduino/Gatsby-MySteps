import React from 'react'
import { graphql} from 'gatsby'
import Select from 'react-select';

import Head from '../../components/Head'
import Layout from '../../components/Layout'
import TutsHeader from '../../components/TutsHeader'
import styles from './styles/tutorial.module.scss'

import Grid from '@material-ui/core/Grid'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'


class htmlCss extends React.Component {

    constructor(){
      super()
      this.state ={
      selectedOption: null,
      }
    }


    handleChange = selectedOption => {
      this.setState({ selectedOption });
      // console.log(`Option selected:`, selectedOption);
    };


    //　Initialized selected option
    handleReset = () => {
      this.setState({ selectedOption:this.state.selectedOption = null});
      // console.log(`Set state Null:`, this.state);
    };

    render() {
      const { data } = this.props
      const { selectedOption } = this.state;


      //　get select option from airtable master and make it array(object)
      const selectValue =     
      data.master.edges.map((edge) => {
        return (
          { 
            value: edge.node.data.Name,label: edge.node.data.Name
          }
        )})


      return (
            <Layout>
            <Head title="CSS&jQuery Tutorial Selection" />
            
            <div className={styles.container}>

            <TutsHeader />

            <div className={styles.selectBlock}>
            <Select
            value={selectedOption}
            onChange={this.handleChange}
            options={selectValue}
            className={styles.selector}
            />
            <button onClick={this.handleReset}
            className={styles.resetBtn}>Reset</button>
        </div>

        <Grid container>
        {data.allAirtable.edges
            .filter((edges)=> !selectedOption  ?  edges.node.data.category:           
               edges.node.data.category === selectedOption.value)
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
            
            </div>
            </Layout>
       );
    }
  }

export const pageQuery = graphql`
    
query{
  allAirtable(
    filter: {
      table: {eq: "05_CSS-jQuery"}, 
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
`

export default htmlCss
