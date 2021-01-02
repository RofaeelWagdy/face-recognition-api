const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const express = require('express');
const cors = require('cors');
const knex = require('knex')


const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const score = require('./controllers/score');


const db = knex({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    user : 'Host\'s name',
    password : 'password of the user',
    database : 'the name of the database'
  }
});

const app = express();

app.use(bodyParser.json());
app.use(cors())

app.get('/', (req, res) => {
	res.send(database.users);
});

//signin
app.post('/signin', (req, res) => {signin.handleSignin(req, res, db, bcrypt)})
//register
app.post('/register', (req, res) => {register.handleRegister(req, res, db, bcrypt)})
 // profile 
app.get('/profile/:id', (req, res) => {profile.handleProfile(req, res, db)})
// score
app.put('/image', (req, res) => {score.handleScore(req, res, db)})
// score api
app.post('/imageurl', (req, res) => {score.handleApiCall(req, res)})
// gat status that app is working
app.listen(3000, () => {
	console.log('app is running on port 3000');
})
