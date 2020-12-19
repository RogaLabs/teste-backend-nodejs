(
	function () {
		'use-strict'
		module.exports = {
			complaint: require('./complaint.json'),
			newComplaint: require('./new-complaint'),
			createdComplaint: require('./created-complaint'),
			modifiedComplaint: require('./modified-complaint'),
		}
	}
)()