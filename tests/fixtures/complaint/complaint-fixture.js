(
	function () {
		'use-strict'
		module.exports = {
			newComplaint: require('./new-complaint'),
			createdComplaint: require('./created-complaint'),
			complaintJSONReturned: require('./complaint-json-return')
		}
	}
)()