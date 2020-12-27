(
	function() {
		'use-strict'
		const express = require('express')
		const router = express.Router()
		const ComplaintMiddleware = require('./complaint.module')().ComplaintMiddleware
		router.post('/', ComplaintMiddleware.addComplaint, (req, res) => {
			
			var newComplaint = {}
			newComplaint = {...req.response}['_doc']
			newComplaint['endereco'] = req.addressInfo
			res.status(201).json(newComplaint);
		})

		module.exports = router
	}
)()