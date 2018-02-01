import React, { Component } from 'react';
import { Link } from 'react-router';
import axios from 'axios';

class User extends Component {
 constructor() {
   super();
   this.state={
     data:[],
     wait:true
   }
 }
 componentWillMount() {
   axios.get(`https://cnodejs.org/api/v1/user/${this.props.params.loginname}`)
   .then((res) => {
     console.log(res);
      this.setState({
        wait:false,
        data:res.data.data
      });
   })
 }
  render() {
  console.log(this.state.data);
    return (
      <div>
      
          {
          this.state.wait? '':
          <div>
          <img src={this.state.data.avatar_url} alt="img"/>
          <span>{this.state.data.loginname}</span>
          <p>{this.state.data.score}积分</p>
          <Link></Link>
          
          <a href='baidu.com'>@{this.state.data.githubUsername}</a>
          <a href=''>
          http://{this.state.data.githubUsername}.github.io</a>
          </div>
          }
    
      </div>
    );
  }
}

export default User;