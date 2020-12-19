var chai = require('chai')
var expect = chai.expect
var MongoDBUtil = require('../../modules/mongodb/mongodb.module').MongoDBUtil

// usando o mocha
describe('Arquivo mongodb.util', () => {
	it('deve confirmar que MondoDB.module retorna MongoDBUtil', () => {
		expect(MongoDBUtil).to.be.a('object')
	})
})