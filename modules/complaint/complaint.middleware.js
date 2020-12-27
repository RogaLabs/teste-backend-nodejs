(
	function() {
		'use-strict'
		
		module.exports = {
			addComplaint: addComplaint
		}

		const ComplaintService = require('./complaint.module')().ComplaintService
		const GeocodingService = require('../geocoding/geocoding.module')().GeocodingService
		function addComplaint(req, res, next){
			ComplaintService.createComplaint(req.body)
				.then(data => {					
					req.response = data
					next()
				})
				.catch(err => {
					next(err)
				})
		}

	}
)()