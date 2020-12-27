(
	function() {
		'use-strict'
		
		module.exports = {
			createComplaint: createComplaint
		}

		const ComplaintModel = require('./complaint.module')().ComplaintModel
		async function createComplaint(complaint){
			return await ComplaintModel.create(complaint)
		}
	}
)()