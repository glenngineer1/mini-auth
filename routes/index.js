'use strict'

const { Router } = require('express')
const router = Router()
const User = require('../models/user')

router.get('/', (req, res) =>
  res.render('index')
)

router.get('/login', (req, res) =>
  res.render('login')
)

router.post('/login', ({ body: { email, password } }, res, err) => {
  User.findOne({ email })
    .then(user => {
      if (user && password === user.password) {
        res.redirect('/')
      } else if (user) {
        res.render('login', { msg: 'Password does not match '})
      } else {
        res.render('login', { msg: 'Email does not exist in our system '})
      }
    })
    .catch(err)
})

router.get('/register', (req, res) =>
  res.render('register')
)

router.post('/register', ({body: { email, password, confirmation } }, res, err) => {
  if (password === confirmation) {
    User.findOne({ email })
      .then(user => {
        if (user) {
          res.render('register', { msg: 'Email is already registered '})
        } else {
          return User.create({ email, password })
        }
      })
      .then(() => res.redirect('/login'), { msg: 'User created '})
      .catch(err)
  } else {
    res.render('register', { msg: 'Password and password confirmation do not match' })
  }
})


router.get('/logout', (req, res) => {
  if (req.session.email) {
    res.render('logout', { page: 'Logout' })
  } else {
    res.redirect('/login')
  }
})

router.post('/logout', (req, res) => {
  req.session.destroy(err => {
    if (err) throw err
      res.redirect('/login')
  })
})

module.exports = router
