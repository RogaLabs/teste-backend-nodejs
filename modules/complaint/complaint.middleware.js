(
	function() {
		'use-strict'
		
		module.exports = {
			addComplaint: addComplaint
		}

		const ComplaintService = require('./complaint.module')().ComplaintService
		const GeocodingService = require('../geocoding/geocoding.module')().GeocodingService

		async function addComplaint(req, res, next){
			ComplaintService.createComplaint(req.body).then(data => {
				GeocodingService.getAddress(data.latitude, data.longitude)
					.then(addr => {
						req.response = data
						req.addressInfo = addr
						next()
					})
			}).catch(error => {
				next(error)
			})
		}
	}
)()