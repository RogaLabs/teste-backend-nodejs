(
	function () {
		'use-stric'
		module.exports = {
			unknownError: require('./error-unknown')	,
			error404: require('./error-404')	,
		};
	}
)()