(
	function() {
		'use-strict'
		
		module.exports = {
			createComplaint: createComplaint
		}

		const ComplaintModel = require('./complaint.module')().ComplaintModel
		function createComplaint(complaint){
			return ComplaintModel.create(complaint)
		}
	}
)()