const chai = require('chai')
const expect = chai.expect
const sinon = require('sinon')

const mongoose = require('mongoose')

const ComplaintModule = require('../../../modules/complaint/complaint.module')
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
})