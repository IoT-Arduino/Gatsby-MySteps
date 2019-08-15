import React from 'react'
import { Link,graphql } from 'gatsby'
import Select from 'react-select';
import Layout from '../../components/Layout'
import { FaYoutube } from 'react-icons/fa';
import Head from '../../components/Head'


  class test extends React.Component {

    constructor(){
      super()
      this.state ={
      selectedOption: null,
      checkbox:[],
      isLoading:true,
      button:[]
      }
      this.handleCheckbox = this.handleCheckbox.bind(this)
      this.button = this.button.bind(this)
    }

    // state = {
    //   selectedOption: null,
    //   checkbox:false,
    //   isLoading:true,
    //   button:null
    // };


    handleChange = selectedOption => {
      this.setState({ selectedOption });
      // console.log(`Option selected:`, selectedOption);
    };


    //　Initialized selected option
    handleReset = () => {
      this.setState({ selectedOption:this.state.selectedOption = null});
      // console.log(`Set state Null:`, this.state);
    };

    handleCheckbox = (e) => {
      // this.setState({ checkbox:this.state.checkbox = !this.state.checkbox});
      console.log(e.currentTarget.label)
      console.log(e.currentTarget.value)
    }

    button = (e) => {
      this.setState( { button:this.state.button = "button" })
      console.log(e.currentTarget.textContent)
    }


    // youtube api から、descriptionテキストデータを取得する
    // console.logまではデータが取れた。これをretrunしたいがうまくいかない。
    // apiの回数制限注意。
    //　apiキーの取り扱い注意。定数化して、.envに取り込む。


    fetchDescription(root){

      fetch(root, { method:"GET"})
      .then(response => response.json())
      // .then(json => console.log(json.items[0].snippet.description))
      .then(json => {return json.items[0].snippet.description})
    }

    //以下のコードを改良して、LocalStorageデータをとりだしたい。
    //　JSON.parse

    // componentWillMount(){
    //   localStorage.getItem('contacts') && this.setState({
    //     contacts: JSON.parse(localStorage.getItem('contacts')),
    //     isLoading:false
    //   })
    // }


    // conponentWillUpdate() {
    //   localStorage.setItem('contacts',"bbb")
    // }


    //リストのチェックボックスの値を、リスト毎に取りたい。
    // 例）setItem( JSON.stringify(edges.node.id), JSON.stringify(input.value))
    //     key がchecked　で　valueに　idと　チェックしたかどうかの値を入れる。
    //　またinput.value を反転させる処理も必要。

    //チェックされているかどうかをチェックする、$("[name=checkbox1]").prop("checked")??
 

    // componentDidMount(){
    //   const notes = JSON.parse(localStorage.getItem('selectedOption'))
    //   setTimeout(() => {
    //     this.setState({
    //       isLoading:false
    //     })
    //   },500)
    // }

    render() {
      const { data } = this.props
      const { selectedOption } = this.state;

      //以下のコードはBuildエラーになるのでコメントアウト。
      // localStorage.setItem('selectedOption',JSON.stringify(this.state.selectedOption))

      //　get select option from airtable master and make it array(object)
      const selectValue =     
      data.master.edges.map((edge) => {
        return (
          { 
            value: edge.node.data.Name,label: edge.node.data.Name
          }
        )})


        console.log(data.master.edges[1].node.data.Name)
        console.log(selectedOption)

        const tags = JSON.stringify(data.allAirtable.edges[1].node.data.tag)
        console.log(tags) 

         
      return (
            <Layout>
            <Head title="AirTable" />
            <h1>AirTable</h1><br />

            <button onClick={this.handleReset}>Reset</button>
            <Select
              value={selectedOption}
              onChange={this.handleChange}
              options={selectValue}
            />
            <ol>
            {data.allAirtable.edges
                //学び：複数のgraphql(pagequery）、classコンストラクタとgraphqlの書き方
                //以下にfilterのコードを書いてみる。selectedOprion.valueの値をもらえるようにする。
                //'Python'　に　selectedOprion.value　とすると、TypeError: Cannot read property 'value' of null となる
                // selectにデフォルト値を設定するか、以下のfilterのロジックを変える。ブランクの時はフィルタをかけず全件表示。
                //　これでも結局、categoryとtagの2重管理がairtableで必要になる。=> airtable でsingole設定で対応、category廃止
                //ソート順どうなっているか、フィルタ解除ボタンも作る。
                .filter((edges)=> !selectedOption  ?  edges.node.data.tag:           
                   edges.node.data.tag === selectedOption.value)
                .map((edges) => {
                return (
                    <li key={edges.node.id}>
                       <h2><FaYoutube />{edges.node.data.Title}</h2> 
                       <p>{edges.node.data.Channel}</p>
                       <p>{edges.node.data.tag}</p>
                       <p>{edges.node.data.description}</p>
                   {/*   <p>{this.fetchDescription(edges.node.data.description)}</p>  */}              
                       <a href={edges.node.data.VideoUrl}>{edges.node.data.VideoUrl}</a>
                       <button onClick={this.button}>{edges.node.id}</button>
                       <p><input type="checkbox" name="mita" value="Unchecked" onChange={this.handleCheckbox}　id={edges.node.id} />Checked</p>
                    </li>
                )
            })}                   
            </ol>


            
            <Link to="/">Home</Link>

            </Layout>





      );
    }
  }

export default test



export const pageQuery = graphql`
    
query {
  allAirtable
  (filter: {table: {eq: "Programing"}}, 
  limit: 30, sort: {order: ASC, fields: data___Title})
    {
      edges{
        node{
        table
          id
          data{
            Title
            Channel
            VideoUrl
            Category
            tag
            description
          }
        }
      }
    } 

        master:allAirtable
        (filter: {table: {eq: "Programing-Category"}}) 
        {
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


