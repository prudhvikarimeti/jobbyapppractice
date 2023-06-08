import {Component} from 'react'

import {Redirect} from 'react-router-dom'

import Cookies from 'js-cookie'

import './index.css'

class Login extends Component {
  state = {
    userName: '',
    passWord: '',
    showError: false,
    errorMsg: '',
  }

  onChangeUserName = event => {
    this.setState({userName: event.target.value})
  }

  onChangePassword = event => {
    this.setState({passWord: event.target.value})
  }

  submitForm = async event => {
    event.preventDefault()

    const {userName, passWord} = this.state
    const bodyDetails = {
      username: userName,
      password: passWord,
    }
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(bodyDetails),
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok) {
      const jwtToken = data.jwt_token
      const {history} = this.props
      Cookies.set('jwt_token', jwtToken, {expires: 30})
      history.replace('/')
    } else {
      const message = data.error_msg
      this.setState({showError: true, errorMsg: message})
    }
  }

  render() {
    const {userName, passWord, showError, errorMsg} = this.state
    if (Cookies.get('jwt_token') !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="main-login-container">
        <div className="login-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
            className="website-logo"
          />
          <form className="login-form" onSubmit={this.submitForm}>
            <label htmlFor="input1" className="label">
              USERNAME
            </label>
            <input
              type="text"
              id="input1"
              onChange={this.onChangeUserName}
              className="input-element"
              value={userName}
              placeholder="Username"
            />
            <label htmlFor="input2" className="label">
              PASSWORD
            </label>
            <input
              type="password"
              id="input2"
              onChange={this.onChangePassword}
              className="input-element"
              value={passWord}
              placeholder="Password"
            />
            <button className="login-button" type="submit">
              Login
            </button>
            {showError && <p className="error-display">*{errorMsg}</p>}
          </form>
        </div>
      </div>
    )
  }
}
export default Login
