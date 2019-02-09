import React, {Component} from 'react'
import './Auth.css'
import {connect} from 'react-redux'
import {logIn} from '../../redux/reducer'
import Logo from './assets/logo.png'
import axios from 'axios'
import {Link} from 'react-router-dom'

class Auth extends Component {

  componentDidMount () {
    axios.get('/api/user-data').then(response => {
    const user = response.data;
    this.props.logIn(user);
    })
  }

  login = () => {
    const redirectUri = encodeURIComponent(`${window.location.origin}/auth/callback`)
    const scope= encodeURIComponent('openid profile email')
    window.location= `https://${process.env.REACT_APP_AUTH0_DOMAIN}/authorize?client_id=${process.env.REACT_APP_AUTH0_CLIENT_ID}&scope=${scope}&redirect_uri=${redirectUri}&response_type=code`
  }
  
  render () {

    console.log(this.props)

    const displayDirect = this.props.user ?
    <Link to={`/user/${this.props.user.id}`}><button>View Account</button></Link> :
      <button onClick={this.login}>Login</button>

    return (
      <div className="Auth">
        <div className="AuthLogin">
          <img src={Logo} alt="Logo Icon" />
          <h2>Herro</h2>
          {displayDirect}
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user
  }
}

const mapDispatchToProps = {
  logIn
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth)
