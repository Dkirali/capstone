const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const { knex } = require('../bookshelf');
const axios = require("axios")


require('dotenv').config();


const SALT_ROUNDS = 8;
const JWT_SECRET = process.env.JWT_SECRET;

router.get('/', (req, res) => {
  res.status(200).json({ 'message': 'Success '});
});

const signJWTToken = user => {

  const token = jwt.sign(
    {
      id: user.id,
      sub: user.attributes.email
    },
    JWT_SECRET,
    { expiresIn: '8h' }
  );

  return token;
}

router.post('/register', (req, res) => {
  const { password } = req.body;

  bcrypt.hash(password, SALT_ROUNDS, (err, hashedPassword) => {
    if (err) return res.status(500).json({ message: "Couldn't encrypt the password"});

    new User({
      ...req.body,
      password: hashedPassword
    })
      .save()
      .then(newUser => {
        const token = signJWTToken(newUser);
        return res.status(201).json({ authToken: token });
      })
      .catch(() => {
        return res.status(400).json({ message: "Couldn't create a new user. Please check your inputs." })
      });
  });
});

router.put("/answers/:id", (req,res) => {
  const userInfo = req.body

  User.where({ id: req.params.id })
    .fetch()
    .then((user) => {
      user.save(
        req.body
      )
      .then ((updatedUser) => {
        res.status(200).json(userInfo)
      });
    })
    .catch (() => {
      res.status(400).json("error")
    })
})

router.get("/homepage", (req,res) => {
  User.fetchAll()
    .then((users) => {
      res.setMaxListeners(200).json(users);
    })
    .catch(() => res.status(400).json("error"))
})


router.post('/login', (req, res) => {
  const { email, password } = req.body;

  User
    .where({ email })
    .fetch()
    .then(user => {
      bcrypt.compare(password, user.attributes.password, (_, success) => {
        if (success) {
          const token = signJWTToken(user);
          return res.status(200).json({ authToken: token });
        } else {
          return res.status(403).json({ message: 'Username/password combination is wrong' });
        }
      })
    })
    .catch(() => {
      return res.status(400).json({ message: "User is not found" });
    })
});


 router.get('/profile', (req, res) => {
    if (!req.headers.authorization) return res.status(401).json({ message: 'This route requires authentication token' });
  
    const token = req.headers.authorization.split(' ')[1];
    
    jwt.verify(token, JWT_SECRET, (err, decoded) => {
      if (err) return res.status(401).json({ message: 'The token is invalid' });
      const userId = decoded.id;
  
      User
        .where({ id: userId })
        .fetch()
        .then(user => {
          delete user.attributes.password;
          res.status(200).json(user);
        })
        .catch(() => {
          res.status(500).json({ message: "Can't fetch the user profile" })
        });
    })
  });

  router.get("/userprofile", (req,res) => {
    axios.get(`https://best-overwatch-api.herokuapp.com/player/psn/us/xAeonzov`)
    .then(user => {
    res.json(user.data)
    })
    .catch(err => {
      console.log("error", err)
    })
  })

module.exports = router;