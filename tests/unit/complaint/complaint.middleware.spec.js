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

		

	})
	
})