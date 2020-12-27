(
	function() {
		'use-strict'
		const express = require('express')
		const router = express.Router()

		router.post('/', (req, res) => {
			res.status(201).json({});
		})

		module.exports = router
	}
)()