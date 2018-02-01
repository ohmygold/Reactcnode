import React, { Component } from 'react';
import axios from 'axios';
import Replies from './Replies.js';

import moment from 'moment';
class Topic extends Component {
  constructor() {
    super();
    this.state={
      data:[],
      wait:false,
      tabs:{
          good:'精品',
          share:'分享',
          ask:'问答', 
          job:'招聘'
      }
    }
  }
    componentWillMount() {
     axios.get(`https://cnodejs.org/api/v1/topic/${this.props.params.id}`)
     .then((res) => {
       this.setState({
         data:res.data.data,
          wait:true
       });
     })
     
   }
  render() {
    console.log(this.state.data.author);

    return (
      
      <div style={{
       marginRight:'305px',
       borderRadius:'3px 3px 0 0'
       
      }} >
      <div style={{
        background:'#fff',
        padding:'10px',
        borderBottom:'1px solid #e5e5e5'
        
      }}>
        <p
        style={
         {
            width:'75%',
            margin:'8px 0',
            lineHeight:'130%',
            fontWeight:'700',
            fontSize:'22px',
            
         }
        }
        >{this.state.data.top?<span style={
          {
                padding:'2px 4px',
                background:'#80bd01',
                borderRadius:'3px',
                fontSize:'12px',
                color:'#fff'
          }
        }>置顶</span>:''}
        {this.state.data.title}
        </p>
        {this.state.wait?
         <p>
          ·发布于{moment(this.state.data.create_at).locale('zh-cn').fromNow()}
          ·作者 {this.state.data.author.loginname}
          ·{this.state.data.visit_count}次浏览
          ·来自 {this.state.tabs[this.state.data.tab]}

          <button style={{
            border: 'none',
            padding: '3px 10px',
            fontSize:'14px',
            lineHeight:'2em',
            background:'#6ba44e',
            color:'#fff',
            float:'right',
            borderRadius:'3px'

          }} >收藏</button>
        </p>:''

        }

      </div>
      <div style={{
        backgroundColor:'#fff',
         borderRadius: '3px',
         marginBottom:'13px'
      }} >
        <div style={{padding:'10px'}}
    
        dangerouslySetInnerHTML={{__html:this.state.data.content}} className='container'/>
      </div>

            {
             this.state.wait? <Replies replies={this.state.data.replies} />: ''      
              
            } 
            
      </div>
    );
  }
}

export default Topic;