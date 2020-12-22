(
	function () {
		'use-strict'
		module.exports = {
			newComplaint: require('./new-complaint'),
			createdComplaint: require('./created-complaint'),
			modifiedComplaint: require('./modified-complaint'),
		}
	}
)()