/* importar as configurações do servidor */
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var app = express()

var mongodbUtil = require('./modules/mongodb/mongodb.module').MongoDBUtil
const port = process.env.PORT || 3000
const ComplaintController = require('./modules/complaint/complaint.module')().ComplaintController

mongodbUtil.init()

app.use('/denuncias', ComplaintController)

app.use(logger('dev'));
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({extended: false}))


app.get('/', function (req, res) {
	var pkg = require(path.join(__dirname, 'package.json'));
	res.json({
		name: pkg.name,
		version: pkg.version,
		status: 'up'
	});
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
	next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get('env') === 'development' ? err : {};

	// render the error page
	res.status(err.status || 500);

	res.json({
		message: res.locals.message,
		error: res.locals.error
	});
});

app.listen(port, function(){
	console.log('Servidor online na porta ' + port)
})

module.exports = app