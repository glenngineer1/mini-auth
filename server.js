'use strict'

const express = require('express')

const app = express()

const port = process.env.PORT || 3000
app.set('port', port)

app.set('view engine', 'pug')

if (process.env.NODE_ENV !== 'production') {
  app.locals.pretty = true
}

// middlewares
app.use(express.static('public'))

app.get('/', (req, res) =>
  res.render('index')
)

app.listen(port, () =>
  console.log(`Listening on port: ${port}`)
)
