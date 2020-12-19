var chai = require('chai')
var expect = chai.expect
var MongoDBModule = require('../../modules/mongodb/mongodb.module')

// usando o mocha
describe('Arquivo mongodb.util', () => {
	it('deve confirmar que o arquivo mongodb.util existe', () => {
		expect(MongoDBModule.MongoDBUtil).to.be.a('object')
	})
})