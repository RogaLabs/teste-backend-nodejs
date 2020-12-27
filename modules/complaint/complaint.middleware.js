(
	function() {
		'use-strict'
		
		module.exports = {
			addComplaint: addComplaint
		}

		const ComplaintService = require('./complaint.module')().ComplaintService
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