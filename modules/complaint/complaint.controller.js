(
	function() {
		'use-strict'
		const express = require('express')
		const router = express.Router()
		const ComplaintMiddleware = require('./complaint.module')().ComplaintMiddleware
		router.post('/', ComplaintMiddleware.addComplaint, (req, res) => {
			res.status(201).json({});
		})

		module.exports = router
	}
)()