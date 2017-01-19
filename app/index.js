// Dependencias
var config = require('../config'),
	express = require('express'),
	cors = require('cors'),
	favicon = require('serve-favicon'),
	bodyParser = require('body-parser'),
	logger = require('morgan'),
	path = require('path')

// Instancia de nueva aplicación y sus rutas
var app = express(),
	api = require('./routes')(express)

// Vistas
app.set('views', path.join(__dirname, '/views'))
app.set('view engine', 'jade')

// Configuraciones del servidor
app.use(cors())
app.use(express.static(config.raiz+'/app/public'))
app.use(favicon(config.raiz+'/app/public/img/favicon.ico'))
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(logger('dev'))
app.use(api)

// Retornar aplicación.
module.exports = app
