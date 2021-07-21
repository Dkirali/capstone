import React, { Component } from 'react';
import axios from "axios"
import { toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import video from '../../assets/videos/register.mp4'
import soldier from '../../assets/images/soldier.png'
import "./RegisterPage.scss"
import WelcomePage from '../WelcomePage/WelcomePage';

import { Route } from "react-router-dom";

const baseUrl = 'http://localhost:8080/api/users';

toast.configure()

class RegisterPage extends React.Component {

  state = {
    isLoggedIn: false,
    errorMessage: "",
    inputValue: ""
  }

  constructor() {
    super();
    this.registerForm = React.createRef()
  }

  componentDidMount() {
    const authToken = sessionStorage.getItem('authToken');
      if (authToken) {
        this.setState({
          isLoggedIn: true
        });
      }
  }

  onSaveEdits = (e) => {
    const { name } = e.target;

    e.preventDefault();
    if (name.includes("phone")) {
      const formattedPhoneNumber = this.formatPhoneNumber(e.target.value);
      this.setState({inputValue:formattedPhoneNumber})
    }
  }

  validateEmail = (e) => {  
    if (!e.target.email.value.includes("@")) {
      toast.error("please use @ in the email section in order to submit")
      return false;
    }
    return true;
  }

  validateInputs = (e) => {
    if(e.target.firstName.value !== "" && e.target.lastName.value !== "" && e.target.email.value !== "" && e.target.password.value !== "" && e.target.gamerTag.value !== "" && e.target.address.value !== "" && e.target.phone.value !== ""  && e.target.gender.value !== "") {
    } else {
      toast.error("All fields must be filled to save")
      return false;
    }
    return true;
  }

  formatPhoneNumber = (value) => {
    const phoneNumber = value.replace(/[^\d]/g, "");
    const phoneNumberLength = phoneNumber.length;
    
    if (!value) {
      return value
    }

    if (phoneNumberLength < 4) {
      return phoneNumber;
    }

    if (phoneNumberLength < 7) {
      return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3)}`;
    }

    return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(
      3,
      6
    )}-${phoneNumber.slice(6, 10)}`;
  }

  register = (e) => {
    e.preventDefault();

    const isValidEmail = this.validateEmail(e);
    const isValidInputs = this.validateInputs(e);

    const {
      firstName,
      lastName,
      email,
      password,
      gamerTag,
      phone,
      address,
      gender
    } = this.registerForm.current;

    if(isValidEmail && isValidInputs) {
      axios.post(`${baseUrl}/register`, {
        firstName: firstName.value,
        lastName: lastName.value,
        email: email.value,
        password: password.value,
        gamerTag: gamerTag.value,
        phone: phone.value,
        address: address.value,
        gender: gender.value
      }).then(res => {
        sessionStorage.setItem('authToken', res.data.authToken);
        this.setState({
          isLoggedIn: true,
          errorMessage: ''
        });
      }).catch((err) => {
        this.setState({
          errorMessage: err.response.data.message
        });
      });
    }
  }
  
  renderRegister() {
    return (
      <div className="register">
        <video className="register__video" autoPlay loop muted >
          <source src={video} type="video/mp4"/>
        </video>
        <div className="register__content">
          <img className="register__content-image" src={soldier} alt="visual of soldier 76"/>
          <div className="register__content-details">
            <span className="register__animation-top"></span>
            <span className="register__animation-right"></span>
            <span className="register__animation-bottom"></span>
            <span className="register__animation-left"></span>
            <h1 className="register__title">Welcome Gamer</h1>
            <form className="register__form" ref={this.registerForm} onSubmit={this.register}>
              <div className="register__form-user">
                <label className="register__form-label" htmlFor="firstName"> First Name </label>
                <input className="register__form-input" type='text' name='firstName'/>
              </div>
              <div className="register__form-user">
                <label className="register__form-label" htmlFor="lastName"> Last Name </label>
                <input className="register__form-input" type='text' name='lastName'/>
              </div>
              <div className="register__form-user">
                <label className="register__form-label" htmlFor="email"> Email </label>
                <input className="register__form-input" type='text' name='email'/>
              </div>
              <div className="register__form-user">
                <label className="register__form-label" htmlFor="password"> Password </label>
                <input className="register__form-input" type='password' name='password'/>
              </div>
              <div className="register__form-user">
                <label className="register__form-label" htmlFor="gamerTag"> Gamertag </label>
                <input className="register__form-input" type='text' name='gamerTag'/>
              </div>
              <div className="register__form-user">
                <label className="register__form-label" htmlFor="address"> Address </label>
                <input className="register__form-input" type='text' name='address'/>
              </div>
              <div className="register__form-user">
                <label className="register__form-label" htmlFor="phone"> Phone </label>
                <input className="register__form-input" type='text' name='phone' onChange={this.onSaveEdits} value={this.state.inputValue}/>
              </div>
              <div className="register__form-user">
                <label className="register__form-label" htmlFor="gender"> Gender </label>
                <input className="register__form-input" type='text' name='gender'/>
              </div>
              <button className="register__button"> Join </button>
            </form>  
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
              {this.renderRegister()}
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
    // Here grab token from localStorage
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
  render() {
    const { isLoading,userInfo } = this.state;

    return (
      isLoading
        ? <h1>Loading...</h1>
        : <>
        <Route exact path="/register" render={(props) => <WelcomePage  {...props} data ={this.state.userInfo}/>} />
        </>
    )
  }
}



export default RegisterPage;
