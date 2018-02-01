import React, { Component } from 'react';
import { Link } from 'react-router';
import moment from 'moment';

class Replise extends Component {
  render() {
    console.log(this.props.replies.length);
    
    return (
      <div style={{
        backgroundColor:'#fff',
        borderRadius:'3px',

      }}>

        <div style={{
          padding:'10px',
          background:'#f6f6f6',
          borderRadius:'3px 3px 0 0'
        }}
         >{this.props.replies.length} 回复</div>
      {
      this.props.replies.map(
        (item,index) =><div key={item.id} style={{
          padding:'10px',
          borderTop:'1px solid #f0f0f0',
          fontSize:'14px',
          overflow:'hidden'
        }}>
          <Link to={`user/${item.author.loginname}`} style={{
            float:'left'
          }}>
          <img style={{
            width:'30px',
            height:'30px'

          }}
          src={item.author.avatar_url} alt="img"/>
          </Link>
           <Link style={{
             lineHight:'20px',
             margin: '10px'
           }} to={`user/${item.author.loginname}`}>
           <span>{item.author.loginname}</span>
          </Link>
          <span
          style={{
             color:'#005580',
             
          }
          }

          >
            {index+1}楼
            ·
            {moment(item.create_at).locale('zh-cn').fromNow()}
          </span>
          <div style={{
            marginLeft:'40px',
           
          }}
           dangerouslySetInnerHTML={{__html:item.content}}></div>

          </div>
      
      )
      }
      </div>
    );
  }
}

export default Replise;