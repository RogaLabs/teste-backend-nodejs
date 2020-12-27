(
	function() {
		'use-strict'
		
		module.exports = {
			addComplaint: addComplaint
		}

		const ComplaintService = require('./complaint.module')().ComplaintService
		const GeocodingService = require('../geocoding/geocoding.module')().GeocodingService

		async function addComplaint(req, res, next){
			try {
				var data = await ComplaintService.createComplaint(req.body)
				req.addressInfo = await GeocodingService.getAddress(data.latitude, data.longitude)
				req.response = data

				next()
				
			} catch (error) {
				next(error)
			}
		}
	}
)()