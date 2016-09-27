'use strict'

const express = require('express')

const app = express()

const port = process.env.PORT || 3000
app.set('port', port)

// middlewares
app.use(express.static('public'))

app.get('/', (req, res) =>
  res.send('Welcome To My Mini Auth App!')
)

app.listen(port, () =>
  console.log(`Listening on port: ${port}`)
)
