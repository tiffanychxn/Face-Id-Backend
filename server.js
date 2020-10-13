const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const knex = require('knex');


const db = knex({
    client: 'pg',
    connection: {
      host : '127.0.0.1',
      user : 'tiff',
      password : '',
      database : 'facial-detection'
    }
  });


const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

const app = express();
const cors = require('cors');
app.use(bodyParser.json());
app.use(cors());

console.log(db.select('*').from('users'));

app.get('/',(req,res)=>{
})

app.get('/profile/:id',(req,res)=>{profile.handleProfile(req,res,db)})
app.post('/signin', (req,res) => {signin.handleSignIn(req,res,db,bcrypt)})
app.post('/register', (req,res) => {register.handleRegister(req,res,db,bcrypt)})
app.put('/image', (req,res) => {image.handleImage(req,res,db)})
app.post('/imageurl', (req,res) => {image.handleApiCall(req,res)})




app.listen(3000, ()=>{
    console.log('app is running on port 3000');
})


