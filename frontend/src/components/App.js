import React, { Component } from 'react';
import Axios from 'axios';
import decode from 'jwt-decode'
import {BrowserRouter, Route} from 'react-router-dom'

import Home from './home'
import Login from './login'

class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      BASELOGURL: 'http://localhost:3030/api/users', 
      user: null
    }
  }


  loginUser = (user) => {
    let email = user.email
    let password =  user.password
    const headers = {
      "Content-type": "application/json"
    }
    fetch(`${this.state.BASELOGURL}/signin`, {
      method: 'POST',
      headers,
      body: JSON.stringify({
            email,
            password
        })
      })
      .then((result) => result.json())
      .then(res => {
        this.setToken(res.token)

        if(this.loggedIn()) {
          headers['Authorization'] = `Bearer ${this.getToken()}`
        }
      })
      .catch((err) => {
        console.log(err)
      })
 
  }

  loggedIn = () => {
    let token = this.getToken()

    if(token && !this.isTokenExpired(token)) {
      this.getProfile();
    }
  }

  getToken = () => {
    return localStorage.getItem('id_token');
  }

  setToken = (IDtoken) => {
    localStorage.setItem('id_token', IDtoken)
  }

  isTokenExpired = (token) => {
    try {
      const decoded = decode(token)

      if(decoded.exp < Date.now / 1000){
        return true
      }else{
        return false
      }
    } catch (error) {
      console.log(error)
      return false
    }
  }



  getProfile = () => {
    const user = decode(this.getToken()) 
    if(user){ 
      this.setState({
        user:user
      })
    }
  }



  render() {
    // console.log(this.state.user)
    if(this.state.user === null){
      return (
        <div className="app">
          <Login loginUser={this.loginUser} />
        </div>
      )
    }else{
      return(
        <div className="app">
          <Home user={this.state.user}/>
        </div>
      )
    }
  }
}

export default App;
