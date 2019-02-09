import React from 'react'
import './Post.css'

const Post = (props) => {
  console.log(props)
  return (
    <div className="Post">
      <h2>{props.title}</h2>
      <div className="UserPost">
        <img id="ProfileIcon" src={props.photo} />
        <h2>{props.username}</h2>
        </div>
    </div>
  )
}

export default Post
