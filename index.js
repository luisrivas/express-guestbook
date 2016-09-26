'use strict'
//Dependencias
const path = require('path');
const express = require('express')
const logger = require('morgan')
const bodyParser = require('body-parser')

const app = express()
const port = process.env.PORT || 3000

//Sets
app.set('views', path.resolve(__dirname, 'views'))
app.set('view engine', 'ejs')

// "Base de datos"
var entradas = []
app.locals.entradas = entradas;

//Middlewares
app.use(logger('dev'))

app.use(bodyParser.urlencoded({ extended: false}))

//Rutas
app.get('/', (req, res) => {
  res.render('index')
})

app.get('/nueva-entrada', (req, res) => {
  res.render('nueva-entrada')
})

app.post('/nueva-entrada', (req, res) => {
  if (!req.body.titulo || !req.body.cuerpo) {
    res.status(400).send('Las entradas deberían tener título y cuerpo.')
  }
  entradas.unshift({
    "titulo": req.body.titulo,
    "cuerpo": req.body.cuerpo,
    "publicado": new Date(),
  })
  res.redirect('/')
})

//Definiendo error 404
app.use( (req, res) => {
  res.status(404).render('404')
})

//Arrancando el servidor
app.listen(port,() => {
  console.log(`Aplicación corriendo en http://localhost:${port}`);
})
