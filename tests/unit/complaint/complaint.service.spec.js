const chai = require('chai')
const expect = chai.expect
const sinon = require('sinon')

const mongoose = require('mongoose')

const ComplaintModule = require('../../../modules/complaint/complaint.module')()
const ComplaintModel = ComplaintModule.ComplaintModel
const ComplaintService = ComplaintModule.ComplaintService

const Fixtures = require('../../fixtures/fixtures')
const ComplaintFixture = Fixtures.ComplaintFixture
const ErrorFixture = Fixtures.ErrorFixture

var ComplaintModelMock

describe('ComplaintService', () => {
	beforeEach(() => {
		ComplaintModelMock = sinon.mock(ComplaintModel)
	})

	afterEach(() => {
		ComplaintModelMock.restore()
		mongoose.models = {}
		mongoose.modelSchemas = {}
		return mongoose.connection.close()
	})

	describe('createComplaint', () => {
		var newComplaint, expectedCreatedComplaint, expectedError

		it('deve criar uma nova denuncia', () => {
			newComplaint = ComplaintFixture.newComplaint
			expectedCreatedComplaint = ComplaintFixture.createdComplaint

			ComplaintModelMock.expects('create')
				.withArgs(newComplaint)
				.resolves(expectedCreatedComplaint)

			return ComplaintService.createComplaint(newComplaint)
				.then(data => {
					ComplaintModelMock.verify()
					expect(data).to.deep.equal(expectedCreatedComplaint)
				})

		})

		it('deve lançar o erro na criação da denúncia', () => {
			expectedError = ErrorFixture.errorUnknown
			newComplaint = ComplaintFixture.newComplaint

			ComplaintModelMock.expects('create')
				.withArgs(newComplaint)
				.rejects(expectedError)

			return ComplaintService.createComplaint(newComplaint)
				.catch(err => {
					ComplaintModelMock.verify()
					expect(err).to.deep.equal(expectedError)
				})

		})

	})

})