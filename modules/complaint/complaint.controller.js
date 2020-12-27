(
	function() {
		'use-strict'
		const express = require('express')
		const router = express.Router()
		const ComplaintMiddleware = require('./complaint.module')().ComplaintMiddleware
		router.post('/', ComplaintMiddleware.addComplaint, (req, res) => {
			console.log(req.response)
			res.status(201).json(req.response);
		})

		module.exports = router
	}
)()