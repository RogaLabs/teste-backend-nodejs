const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);

const expect = chai.expect;
const request = chai.request;

const app = require('../../app');

const ComplaintFixture = require('../fixtures/fixtures').ComplaintFixture

const baseUri = '/v1/denuncias'


describe('ComplaintController', () => {
	describe('POST' + baseUri, () => {
		it('deve adicionar uma nova denuncia', done => {
			request(app)
				.post(baseUri)
				.send(ComplaintFixture.newComplaint)
				.end((err, res) => {
					expect(res.status).to.equal(201)
					expect(res.body).to.not.equal({})
					expect(res.body).to.not.equal('')
					expect(res.body._id).to.not.equal(undefined)
					expect(res.body.endereco).to.deep.equal(ComplaintFixture.complaintJSONReturned.endereco)
					done()
				})
		})
	})
})