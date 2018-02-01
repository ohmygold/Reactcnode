import React, {Component} from 'react';
import axios from 'axios';
import {Link} from 'react-router';

class Tabs extends Component {
  constructor() {
    super();
    this.state = {
      data: [],
      tabnum:0,
      flag:true,
      tabs: [
        'all', 'good', 'share', 'ask', 'job'
      ],
      ctab: ['全部', '精品', '分享', '提问', '招聘']

    }

  }
  componentWillMount() {
    axios
      .get('https://cnodejs.org/api/v1/topics')
      .then((res) => {
        this.setState({data: res.data.data});
      })
  }

  handleClick(type,index) {
    this.setState({
      tabnum:index
    });
    axios
      .get(`https://cnodejs.org/api/v1/topics/?tab=${type}`)
      .then((res) => this.setState({data: res.data.data}))
      .catch((err) => console.log(err))

  }

  render() {
    
   let  styles={
     
      list:{
        padding:'0',
        marginRight:'305px',
        borderRadius:'3px 3px 0 0',
        background:'#fff'
         
     },
      li:{
        padding:'10px',
        height:'2em',
        background:'#fff',
        fontSize:'14px',
        overflow:'hidden',

      },
      titles:{
        maxWidth:'70%',
        textOverflow:'ellipsis',
        fontSize:"16px",
        lineHeight:'30px',
        color:'#000',
        
      },
      img:{
        width:'30px',
        height:'30px',
        borderRadius:'3px'
      },
      rep:{
        color:'#9e78c0',
      },
      visits:{
        fontSize:'10px',
        color:'#b4b4b4'
      }
    


    }
    return (
      <div style={styles.list}  >
        <div style={{
          background:'#f6f6f6',
          borderRadius:'3px 3px 0 0',
          padding:'10px'
        }}>

        {this
          .state
          .tabs
          .map((item, index) => <span
             style={{
               padding:'3px 4px',

                background:this.state.tabnum===index? '#80bd01':'#f6f6f6',
                color:this.state.tabnum===index? '#fff':'#80bd01',
                cursor:'pointer'

             }}
            key={Math.random()}
            onClick={this
            .handleClick
            .bind(this, item,index)}>{this.state.ctab[index]}</span>)
}
        </div>

        <div>
          {this
            .state
            .data
            .map((item) => <div key={item.id} style={styles.li}>
              <Link to={`user/${item.author.loginname}`} >
              <img style={styles.img} src={item.author.avatar_url} alt="img"/></Link>
              <span style={{
                width:'70px',
                textAlign:'center',
                lineHeight:'2em'
              }}><span  style={styles.rep}>{item.reply_count}</span>/<span style={styles.visits}>{item.visit_count}</span></span>
              <span style={{
                padding:'2px 4px',
                fontSize:'12px',
                background:item.top?'#80bd01':'#e5e5e5',
                color:item.top?'#fff':'#999',
                borderRadius:'3px'
              }}>{item.top
                  ? '置顶'
                  : this.state.ctab[
                    this
                      .state
                      .tabs
                      .findIndex((x) => x === item.tab)
                  ]}</span>
              <Link style={styles.titles} 
                
              activeStyle={{color:'#888'}} to={`topic/${item.id}`}>{item.title}
              </Link>
            </div>)
}

        </div>
      </div>
    );
  }
}

export default Tabs;