const chai = require('chai')
const expect = chai.expect

const ComplaintModule = require('../../../modules/complaint/complaint.module')

describe('ComplaintModule', function()  {
	it('deve confirmar se a função ComplaintModule existe', function() {
		expect(ComplaintModule).to.be.a('function')
	})
})