var chai = require('chai')
var expect = chai.expect
var MongoDBModule = require('../../modules/mongodb/mongodb.module')

// usando o mocha
describe('Arquivo mongodb.module', () => {
	it('deve confirmar que o arquivo mongodb.module existe', () => {
		expect(MongoDBModule).to.be.a('object')
	})
})