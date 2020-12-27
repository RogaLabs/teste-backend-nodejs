(
	function() {
		'use-strict'
		module.exports = init

		function init() {
			return {
				GeocodingService: require('./geocoding.service'),
			}
		}
	}
)()