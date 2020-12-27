const chai = require('chai')
const expect = chai.expect
const sinon = require('sinon')

const httpMocks = require('node-mocks-http')

const Promisse = require('bluebird').Promise

const ComplaintModule = require('../../../modules/complaint/complaint.module')()
const ComplaintMiddleware = ComplaintModule.ComplaintMiddleware
const ComplaintService = ComplaintModule.ComplaintService

const Fixtures = require('../../fixtures/fixtures')
const ComplaintFixture = Fixtures.ComplaintFixture
const ErrorFixture = Fixtures.ErrorFixture

var req, res, next

describe('ComplaintMiddleware', () => {
	beforeEach(() => {
		req = httpMocks.createRequest()
		res = httpMocks.createResponse()
		next = sinon.spy()
	})

	describe('addComplaint', () => {
		var createComplaint, createComplaintPromisse, expectedCreatedComplaint, expectedError

		beforeEach(() => {
			createComplaint = sinon.stub(ComplaintService, 'createComplaint')
			req.body = ComplaintFixture.newComplaint
		})

		afterEach(() => {
			createComplaint.restore()
		})

		it('deve criar uma nova denuncia', () => {
			expectedCreatedComplaint = ComplaintFixture.createdComplaint
			
			createComplaintPromisse = Promisse.resolve(expectedCreatedComplaint)
			createComplaint.withArgs(req.body).returns(createComplaintPromisse)

			ComplaintMiddleware.addComplaint(req, res, next)

			sinon.assert.calledOnce(createComplaint)

			return createComplaintPromisse
				.then(() => {
					expect(req.body).to.be.a('object')
					expect(req.body).to.deep.equal(expectedCreatedComplaint)
					sinon.assert.calledOnce(next)
				})

		})

		it('deve lançar um erro enquanto cria uma nova denuncia', () => {
			expectedError = ErrorFixture.errorUnknown

			createComplaintPromisse = Promisse.reject(expectedError)
			createComplaint.withArgs(req.body).returns(createComplaintPromisse)

			ComplaintMiddleware.addComplaint(req, res, next)

			sinon.assert.calledOnce(createComplaint)

			return createComplaintPromisse.catch(err => {
				expect(err).to.be.a('object')
				expect(err).to.deep.equal(expectedError)
				
			})
		})

	})
	
})