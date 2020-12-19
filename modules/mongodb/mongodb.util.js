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

		var connectionString = prepareConnectionString(mongodbConfig, {
			promiseLIb: require('bluebird'),
			useNewUrlParser: true
		})
			.then(result => {
				console.log('MongoDB conectado. DB: ' + connectionString)
			})
			.catch(err => {
				console.log(err.message)
				console.log('Ocorreu um erro ao conectar com o Banco de dados: ' + connectionString)
			})

		mongoose.connect(connectionString, options)
	}
})();