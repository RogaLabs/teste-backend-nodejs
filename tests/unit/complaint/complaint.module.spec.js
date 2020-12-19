const chai = require('chai')
const expect = chai.expect

const ComplaintModule = require('../../../modules/complaint/complaint.module')

describe('ComplaintModule', () => {
	it('deve confirmar se a função ComplaintModule existe', () => {
		expect(ComplaintModule).to.be.a('function')
	})

	it('deve confirmar se a função ComplaintModule retorna um objeto', () => {
		expect(ComplaintModule()).to.be.a('object')
	})

	it('deve confirmar se a função ComplaintController xiste', () => {
		expect(ComplaintModule().ComplaintController).to.be.a('function')
	})
	it('deve confirmar se o objeto ComplaintMiddleware existe', () => {
		expect(ComplaintModule().ComplaintMiddleware).to.be.a('object')
	})
	it('deve confirmar se o objeto ComplaintService existe', () => {
		expect(ComplaintModule().ComplaintService).to.be.a('object')
	})
	it('deve confirmar se o objeto ComplaintModel existe', () => {
		expect(ComplaintModule().ComplaintModel).to.be.a('function')
	})
})