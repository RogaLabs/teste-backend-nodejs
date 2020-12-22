(
	function () {
		'use-stric'
		module.exports = {
			errorUnknown: require('./error-unknown'),
			error404: require('./error-404'),
		}
	}
)()