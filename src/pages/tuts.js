


import React,{Component} from "react"
import { Bar } from 'react-chartjs-2';
import { graphql } from 'gatsby'
import styles from "./tuts.module.scss"
import Layout from "../components/Layout"
import SEO from "../components/SEO"
import TutsBlock from "../components/TutsBlock"


class tuts extends Component  {
  
  constructor(props){
    super(props)
    this.state = {
        chartData:{
          labels: [],
          datasets:[
              {
                  label:'Population',
                    data:[],
                    backgroundColor:[ ]
              }
          ]
        },
        chartData2:{
          labels: [],
          datasets:[
              {
                  label:'Population',
                    data:[],
                    backgroundColor:[ ]
              }
          ]
        }
    }
  }

  getChartData = () => {

    const { data } = this.props
    const salary = data.Salary.edges
    const demand = data.Demand.edges

    let name = []
    let SanJose = []
    let SanFrancisco = []
    let WashingtonDC = []
    let Seattle = []
    let Tokyo = []
    let Osaka = []
    let London = []

    let demandName = []
    let demandSanJose = []
    let demandSanFrancisco = []
    let demandWashingtonDC = []
    let demandSeattle = []
    let demandTokyo = []
    let demandOsaka = []
    let demandLondon = []

    for (let row in salary) {
      name.push(salary[row].node.data.Name)
      SanJose.push(parseInt(salary[row].node.data.SanJose))
      SanFrancisco.push(parseInt(salary[row].node.data.SanFrancisco))
      WashingtonDC.push(parseInt(salary[row].node.data.WashingtonDC))
      Seattle.push(parseInt(salary[row].node.data.Seattle))
      Tokyo.push(parseInt(salary[row].node.data.Tokyo))
      Osaka.push(parseInt(salary[row].node.data.Osaka))
      London.push(parseInt(salary[row].node.data.London))
    };

    for (let row2 in demand) {
      demandName.push(demand[row2].node.data.Name)
      demandSanJose.push(parseInt(demand[row2].node.data.SanJose))
      demandSanFrancisco.push(parseInt(demand[row2].node.data.SanFrancisco))
      demandWashingtonDC.push(parseInt(demand[row2].node.data.WashingtonDC))
      demandSeattle.push(parseInt(demand[row2].node.data.Seattle))
      demandTokyo.push(parseInt(demand[row2].node.data.Tokyo))
      demandOsaka.push(parseInt(demand[row2].node.data.Osaka))
      demandLondon.push(parseInt(demand[row2].node.data.London))
    };

    this.setState({
      chartData:{
        labels: name,
        datasets:[
            {
                  type:'bar',
                  label:'SanJose',
                  data:SanJose,
                  backgroundColor:"blue",
            },
            {
                type:'bar',
                label:'SanFrancisco',
                data:SanFrancisco,
                backgroundColor:"blue",
            },
            {
                type:'bar',
                label:'WashingtonDC',
                data:WashingtonDC,
                backgroundColor:"blue",
            },
            {
              type:'bar',
              label:'Seattle',
              data:Seattle,
              backgroundColor:"blue",
            },
            {
                type:'bar',
                label:'Tokyo',
                data:Tokyo,
                backgroundColor:"red",
            },
            {
                type:'bar',
                label:'Osaka',
                data:Osaka,
                backgroundColor:"red",
            },
            {
              type:'bar',
              label:'London',
              data:London,
              backgroundColor:"green",
            }
        ]
      },
      chartData2:{
        labels: demandName,
        datasets:[
            {
                  type:'bar',
                  label:'SanJose',
                  data:demandSanJose,
                  backgroundColor:"blue",
            },
            {
                type:'bar',
                label:'SanFrancisco',
                data:demandSanFrancisco,
                backgroundColor:"blue",
            },
            {
                type:'bar',
                label:'WashingtonDC',
                data:demandWashingtonDC,
                backgroundColor:"blue",
            },
            {
              type:'bar',
              label:'Seattle',
              data:demandSeattle,
              backgroundColor:"blue",
            },
            {
                type:'bar',
                label:'Tokyo',
                data:demandTokyo,
                backgroundColor:"red",
            },
            {
                type:'bar',
                label:'Osaka',
                data:demandOsaka,
                backgroundColor:"red",
            },
            {
              type:'bar',
              label:'London',
              data:demandLondon,
              backgroundColor:"green",
            }
        ]
      },

    })
  }
  


  componentDidMount(){
    this.getChartData()
  }


// const tuts = () => {
//   return (
//     <Layout>
//       <SEO title="Tutorial Index" />
//       <div className={styles.wrapper}>
//         <TutsBlock />
//       </div>
//     </Layout>
//   )
// }


  render(){

    const { chartData,chartData2 } = this.state

    return (
      <Layout>
      <SEO title="Tutorial Index" />
    <div className={styles.wrapper}>
       <TutsBlock />

        <Bar 
            style={{ margin:'20px'}}
            data={chartData}
            options={{
                title:{
                  display:true,
                  text:'FrontEnd Engeneer Salary (USD)',
                  fontSize:25
                },
                legend:{
                  display:true,
                  position:'top'
                },
                responsive:true,
                scales: {
                  yAxes: [{
                      id: "y-axis-1",   // Y軸のID
                      type: "linear",   // linear固定 
                      position: "left", // どちら側に表示される軸か？
                      ticks: {          // スケール
                          max: 150000,
                          min: 0,
                          stepSize: 50000
                      },
                  }],
               }
              }}
        />

        <Bar
            style={{ margin:`40px`}}
            data={chartData2}
            options={{
                title:{
                  display:true,
                  text:'FrontEnd Engeneer Job offer',
                  fontSize:25
                },
                legend:{
                  display:true,
                  position:'top'
                },
                responsive:true,
                scales: {
                  yAxes: [{
                      id: "y-axis-1",   // Y軸のID
                      type: "linear",   // linear固定 
                      position: "left", // どちら側に表示される軸か？
                      ticks: {          // スケール
                          max: 4000,
                          min: 0,
                          stepSize: 500
                      },
                  }],
              }
              }}
        />

        </div>
      </Layout>
    );
   }

}

export default tuts



export const pageQuery = graphql`

query MyQuery3 {
  Salary: allAirtable(filter: {table: {eq: "PG-Salary"}, data: {Name: {ne: ""}}},, sort: {fields: data___sortId}) {
    edges {
      node {
        data {
          sortId
          Name
          SanJose
          SanFrancisco
          WashingtonDC
          Seattle
          Tokyo
          Osaka
          London
          Salary
          NumOfRec
        }
      }
    }
  }
  Demand: allAirtable(filter: {table: {eq: "PG-Demand"}, data: {Name: {ne: ""}}},, sort: {fields: data___sortId}) {
    edges {
      node {
        data {
          sortId
          Name
          SanJose
          SanFrancisco
          WashingtonDC
          Seattle
          Tokyo
          Osaka
          London
          Salary
          NumOfRec
        }
      }
    }
  }
}

  

`