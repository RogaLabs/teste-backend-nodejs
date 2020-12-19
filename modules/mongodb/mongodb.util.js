(function () {
	'use strict';

	module.exports = {
		init: init
	};
	// Conexão mongodb
	const mongoose = require('mongoose')
	const mongodbConfig = require('../../config/mongodb/mongodb-config.json').mongodb

	function prepareConnectionString(config) {
		var connectionString = 'mongodb://';

		if (config.user) {
				connectionString += config.user + ':' + config.password + '@';
		}

		connectionString += config.server + '/' + config.database;

		return connectionString;
	}


	function init(){
		const options = {
			promiseLibrary: require('bluebird'),
			useNewUrlParser: true,
			useUnifiedTopology: true
		}
		var connectionString = prepareConnectionString(mongodbConfig, options)
		mongoose.connect(connectionString, options)
			.then(result => {
				console.log('MongoDB conectado.' + connectionString)
			})
			.catch(err => {
				console.log(err.message)
				console.log('Ocorreu um erro ao conectar com o banco de dados: ' + connectionString)
			})

		
	}
})();