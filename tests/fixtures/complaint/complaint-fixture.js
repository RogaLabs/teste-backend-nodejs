(
	function () {
		'use-strict'
		module.exports = {
			complaint: require('./complaint'),
			newComplaint: require('./new-complaint'),
			createdComplaint: require('./created-complaint'),
			modifiedComplaint: require('./modified-complaint'),
		}
	}
)()