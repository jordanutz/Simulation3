import React, {Component} from 'react'
import './Navigation.css'
import {connect} from 'react-redux'
import {logIn, logOut} from '../../redux/reducer'
import axios from 'axios'
import {Link} from 'react-router-dom'

import Home from './assets/home.png'
import Logout from './assets/logout.png'
import New from './assets/new.png'

class Navigation extends Component {

  componentDidMount () {
    axios.get('/api/user-data').then(response => {
    const user = response.data;
    this.props.logIn(user);
    })
  }

  logout = () => {
   axios.post('/api/logout').then(res => {
     this.props.history.goBack()
   })
   .catch(error => console.log(error))
 }

  render () {

    const displayNavigation = this.props.user ?
    <nav>
      <div className="UserIcons">
        <img id="ProfileIcon" src={this.props.user.photo} />
        <h2>{this.props.user.username}</h2>
        <Link to={`/user/${this.props.user.id}`}><img src={Home} alt="Home Icon"/></Link>
        <Link to='/new'><img src={New} alt="New Post Icon" /></Link>
      </div>

      <div className="Logout">
        <img onClick={this.logOut} src={Logout} alt="Logout Icon" />
      </div>
    </nav>: null

    return (
      <div>
        {displayNavigation}
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
  logIn,
  logOut
}


export default connect(mapStateToProps, mapDispatchToProps)(Navigation);
