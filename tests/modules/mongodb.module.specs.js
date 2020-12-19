var chai = require('chai')
var expect = chai.expect
var MongoDBModule = require('../../modules/mongodb/mongodb.module')
var MongoDBUtil = require('../../modules/mongodb/mongodb.util')

// usando o mocha
describe('Arquivo mongodb.module', () => {
	it('deve confirmar que o arquivo mongodb.module existe', () => {
		expect(MongoDBModule).to.be.a('object')
	})
	it('deve confirmar que o arquivo mongodb.util existe', () => {
		expect(MongoDBUtil).to.be.a('object')
	})
})