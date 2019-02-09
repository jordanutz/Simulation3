import React, { Component } from 'react'
import './Reset.css'
import routes from './routes'
import Navigation from './Components/Navigation/Navigation'
import { withRouter } from 'react-router-dom'

class App extends Component {

  render() {
    const displayNavigation = this.props.location.pathname === '/' ? null : <Navigation />
    return (
      <div className="App">
        {displayNavigation}
        {routes}
      </div>
    );
  }
}

export default withRouter(App);
