(
	function () {
		'use-stric'
		module.exports = {
			invalidRequest: require('./error-invalid-request'),
			addressNotFound: require('./error-address-not-found'),
			error404: require('./error-404'),
		}
	}
)()