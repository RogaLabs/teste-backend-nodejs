(
	function() {
		'use-strict'
		module.exports = init

		function init() {
			return {
				ComplaintController: require('./complaint.controller')
			}
		}
	}
)()