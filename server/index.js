const express = require('express')
const bodyParser = require('body-parser')
const massive = require('massive')
require('dotenv').config()
const session = require('express-session')
const axios = require('axios')
const app = express()

// Controllers
const auth_controller = require('./controllers/auth_controller')
const posts = require('./controllers/posts_controller')


app.use(bodyParser.json())
app.use( express.static( `${__dirname}/../build` ) )

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 * 14
  }
}))

massive(process.env.CONNECTION_STRING).then(database => {
    app.set('db', database);
    console.log('Database is kickin')
}).catch(error => console.log(error, 'Unexpected error connecting to database'))

// Auth0

app.get('/auth/callback', (req, res) => {
  // console.log('herro from auth callback')
  const payload = {
    client_id: process.env.REACT_APP_AUTH0_CLIENT_ID,
    client_secret: process.env.AUTH0_CLIENT_SECRET,
    code: req.query.code,
    grant_type: "authorization_code",
    redirect_uri: `http://${req.headers.host}/auth/callback`
  };

  function tradeCodeForAccessToken() {
    // console.log('trade code for access token')
    return axios.post(`https://${process.env.REACT_APP_AUTH0_DOMAIN}/oauth/token`, payload);
    }

  function tradeAccessTokenForUserInfo(accessTokenResponse) {
    // console.log('trade access token for admin')
    const accessToken = accessTokenResponse.data.access_token;
    return axios.get(`https://${process.env.REACT_APP_AUTH0_DOMAIN}/userinfo?access_token=${accessToken}`);
    }

  function storeUserInfoDatabase (response) {
    // console.log('store user info db')
    const auth0Id = response.data.sub;
    // console.log(response.data);

  const db = req.app.get('db');
    return db.get_user(auth0Id).then(users => {
      if(users.length) {
        const user = users[0];
        req.session.user = user;
        res.redirect('/');
      } else {
        const userArray = [
          auth0Id,
          response.data.name,
          response.data.email,
          response.data.picture
        ];
        return db.create_user(userArray).then(newUser => {
          req.session.user = newUser[0];
          res.redirect('/');
        }).catch(error => {
          console.log('error in db.get_user', error);
          res.status(500).send('Unexpected error');
        })
      }
    }).catch(error => {
      console.log('error in db.get_user', error);
      res.status(500).send('Unexpected error');
    })
  }

  tradeCodeForAccessToken()
      .then(tradeAccessTokenForUserInfo)
      .then(storeUserInfoDatabase)
      .catch(error => {
        console.log('Server error', error)
        res.status(500).send('An error occurred on the server. Check terminal')
      });
  });

app.get('/api/user-data', (req, res) => {
  // console.log(req.session.user)
  res.json(req.session.user);
});

app.post('/api/logout', (req, res) => {
  req.session.destroy();
  res.send();
});

app.get('/api/posts', posts.getPosts)
app.post('/api/posts', posts.createPosts)
app.get('/api/posts/:id', posts.myPosts)

const PORT = 1994;
app.listen (PORT, () => {
  console.log('Soarin on Port 1994 🚀 ')
})
