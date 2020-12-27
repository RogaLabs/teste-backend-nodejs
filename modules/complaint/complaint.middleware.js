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
				.then(sucess)
				.catch(err => {
					next(err)
				})

			async function sucess(data) {
				var address = GeocodingService.getAddress(data.latitude, data.longitude)
				data.address = address
				req.response = data
				next()
			}
		}
	}
)()