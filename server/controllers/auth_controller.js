module.exports = {
  postUser: (req, res) => {
    const db = req.app.get('db');
    db.create_user().then(user => res.status(200).send(user))
    .catch(error => console.log(error));
  },

  postLogin: (req, res) => {
    console.log('hit')
    const db = req.app.get('db');
    db.create_user()
    .then(user => res.status(200).send(user))
    .catch(error => console.log(error))
  }
}
