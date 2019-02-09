module.exports = {
  getPosts: (req, res) => {
    const db = req.app.get('db')
    db.get_posts()
    .then(posts => res.status(200).send(posts))
    .catch(error => console.log(error))
  },
  createPosts: (req, res) => {
    const db = req.app.get('db')
    console.log(req.body)
    const {id, title, image, content} = req.body
    db.create_post(id, title, image, content)
    .then(posts => res.status(200))
    .catch(error => console.log(error))
  },
  myPosts: (req, res) => {
    const db = req.app.get('db')
    const {id} = req.params
    db.get_myposts(id)
    .then(posts => res.status(200).send(posts))
    .catch(error => console.log(error))
  }
}
