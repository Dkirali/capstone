import React, { Component } from 'react';
import axios from "axios"
import { Link } from 'react-router-dom'
import video from "../../assets/videos/login.mp4"
import Rein from "../../assets/images/rein.png"
import "./LoginPage.scss"
import { Redirect } from "react-router-dom";
import HomePage from '../HomePage/HomePage';

const baseUrl = 'http://localhost:8080/api/users';

class LoginPage extends Component {
  state = {
    isLoggedIn: false,
    userNotFound: false,
    errorMessage: ''
  }

  constructor() {
    super();
    this.loginForm = React.createRef();
  }

  componentDidMount() {
    const authToken = sessionStorage.getItem('authToken');

    if (authToken) {
      this.setState({
        isLoggedIn: true
      });
    }
  }

  login = (e) => {
    e.preventDefault();

    const { email, password } = this.loginForm.current;

    axios.post(`${baseUrl}/login`, {
      email: email.value,
      password: password.value
    }).then(res => {
      sessionStorage.setItem('authToken', res.data.authToken);
      this.setState({
        isLoggedIn: true,
        errorMessage: ''
      });
    }).catch((err) => {
      this.setState({
        userNotFound: true
      })
    });
  }

  renderLogin() {
      return (
        <div className="login">
          <video className="login__video" autoPlay loop muted >
            <source src={video} type="video/mp4"/>
          </video>
          <div className="login__content">
            <img src={Rein} alt="visual of rein" className="login__content-image"/>
            <div className="login__content-details">
              <span className="login__animation-top"></span>
              <span className="login__animation-right"></span>
              <span className="login__animation-bottom"></span>
              <span className="login__animation-left"></span>
              <h1 className="login__title">Login</h1>
              <div className="login__top">
                <form className="login__form" ref={this.loginForm} onSubmit={this.login}>
                  <div className="login__form-user">
                    <label className="login__form-label" htmlFor="email"> Email </label>
                    <input className="login__form-input" type="text" name="email"/>
                  </div>
                  <div className="login__form-user">
                    <label className="login__form-label" htmlFor="passsword"> Password </label>
                    <input className="login__form-input" type="password" name="password"/>
                    <div className={`login__form-find ${!!this.state.userNotFound ? "login__form-find-error": " "}`}> *User not found* </div>
                  </div>
                  <button className='login__form-button'> Submit </button>
                </form>
            </div>
            <Link to="/register" style={{textDecoration: 'none'}}>
              <div className='login__signup'> New User </div>
            </Link>
            </div>
          </div>
        </div>
      )
  }

  handleAuthFail = () => {
      sessionStorage.removeItem('authToken');
      this.setState({
        isLoggedIn: false
      });
    }
  
    render () {
      const { isLoggedIn, errorMessage } = this.state;
      
      return (
        <>
          <div className='App'>
            {!isLoggedIn &&
              <div className="auth-container">
                {this.renderLogin()}
              </div>}
            {isLoggedIn && <Profile onAuthFail={this.handleAuthFail} />}
          </div>
          {errorMessage && <label className="error-message">{errorMessage}</label>}
        </>
      )
    }
  }
  
  class Profile extends Component {
    state = {
      isLoading: true,
      userInfo: {}
    }
    componentWillMount() {
      const authToken = sessionStorage.getItem('authToken');
  
      axios.get(`${baseUrl}/profile`, {
        headers: {
          authorization: `Bearer ${authToken}`
        }
      }).then(res => {
        this.setState({
          isLoading: false,
          userInfo: res.data
        });
      }).catch(() => this.props.onAuthFail());
    }

    handleLogout = () => {
      localStorage.clear()
      this.setState({
        isLoading: false,
        userInfo: {},
      })
    }

    render() {
      const { isLoading, userInfo } = this.state;
  
      return (
        isLoading
          ? <h1>Loading...</h1>
          : <>
            <Redirect to={`/homepage/:${userInfo.id}`} render={(props) => <HomePage  {...props} data={this.handleLogout}/>} />
          </>
      )
    }
  }

export default LoginPage
