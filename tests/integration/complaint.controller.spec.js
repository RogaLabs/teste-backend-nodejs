const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);

const expect = chai.expect;
const request = chai.request;

const app = require('../../app');
const Fixtures = require('../fixtures/fixtures')
const ComplaintFixture = Fixtures.ComplaintFixture

const baseUri = '/complaints'


describe('ComplaintController', () => {
	
})