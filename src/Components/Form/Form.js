import React, {Component} from 'react'
import './Form.css'
import axios from 'axios'
import {connect} from 'react-redux'

class Form extends Component {
  constructor () {
    super()
    this.state = {
      title: '',
      image: '',
      content: ''
    }
  }

  createPost = (id, title, image, content) => {

    const myPost = {
      id: id,
      title: title,
      image: image,
      content: content
    }

    console.log(myPost)

    axios.post('/api/posts', myPost).then(res => {
      console.log(res.data)
    })

  }

  handleTitle = (event) => {
    this.setState({
      title: event.target.value
    })
  }

  handleImage = (event) => {
    this.setState({
      image: event.target.value
    })
  }

  handleContent = (event) => {
    this.setState({
      content: event.target.value
    })
  }

  render () {

    const {title, image, content} = this.state

    return (
      <div className="Dashboard">
        <div className="Form">
          <h1>New Post</h1>
          <h2>Title:</h2><input value={this.state.title} onChange={this.handleTitle}/>
          <h2>Image URL:</h2><input value={this.state.image} onChange={this.handleImage} />
          <h2>Content</h2><input value={this.state.content} onChange={this.handleContent}/>
          <button onClick={() => this.createPost(this.props.user.id, title, image, content)}>Post</button>
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


export default connect(mapStateToProps)(Form)
