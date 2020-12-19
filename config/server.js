/* importar o módulo do framework express */
var express = require('express')
var app = express()
var logger = require('morgan')


app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({extended: false}))

/* middleware que configura páginas de status */
app.use(function(req, res, next){
	res.json({
		message: res.locals.message,
		error: res.locals.error
	})
	next()
})

/* middleware que configura msgs de erro internos */
app.use(function(err, req, res, next){
	 res.json({
			message: res.locals.message,
			error: res.locals.error
		})
	next()
})

/* exportar o objeto app */
module.exports = app