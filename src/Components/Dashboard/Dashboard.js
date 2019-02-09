import React, {Component} from 'react'
import './Dashboard.css'
import axios from 'axios'
import Post from '../Post/Post'

class Dashboard extends Component {
  constructor () {
    super()
    this.state = {
      posts: [],
      toggle: false,
      myPosts: []
    }
  }

  componentDidMount () {
    this.getAllPosts()
    this.getMyPosts(this.props.match.params.id)
  }

  getAllPosts = () => {
    axios.get('/api/posts').then(res => {
      this.setState({
        posts: res.data
      })
    })
  }

  getMyPosts = (id) => {
    axios.get(`/api/posts/${id}`).then(res => {
      this.setState({
        myPosts: res.data
      })
    })
  }

  toggleView = () => {
    this.setState({
      toggle: !this.state.toggle
    })
  }

  render () {

    const displayButton = this.state.toggle ?
    <button onClick={this.toggleView}>My Posts</button> :
    <button onClick={this.toggleView}>All Posts</button>

    const displayAllPosts = this.state.posts.map(post => {
      return (
        <Post key={post.id} {...post} />
      )
    })

    const displayMyPosts = this.state.myPosts.map(post => {
      return (
        <Post key={post.id} {...post} />
      )
    })

    const displayPosts = this.state.toggle ? displayAllPosts : displayMyPosts

    return (
      <div className="Dashboard">
        <div className="DashboardFilter">
          <input placeholder="Search by Title"/>
          {displayButton}
        </div>
        <div className="DashboardDisplay">
          {displayPosts}
        </div>
      </div>
    )
  }
}

export default Dashboard
