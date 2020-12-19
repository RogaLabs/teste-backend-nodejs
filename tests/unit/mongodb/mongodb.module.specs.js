const chai = require('chai')
const expect = chai.expect
const MongoDBModule = require('../../../modules/mongodb/mongodb.module')
const MongoDBUtil = require('../../../modules/mongodb/mongodb.util')

// usando o mocha
describe('Arquivo mongodb.module', () => {
	it('deve confirmar que o arquivo mongodb.module existe', () => {
		expect(MongoDBModule).to.be.a('object')
	})
	it('deve confirmar que o arquivo mongodb.util existe', () => {
		expect(MongoDBUtil).to.be.a('object')
	})
})