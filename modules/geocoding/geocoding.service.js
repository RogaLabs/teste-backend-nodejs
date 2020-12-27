(
	function() {
		'use-strict'
		
		module.exports = {
			getAddress: getAddress
		}
		const axios = require('axios')
		const geocodingConfig = require('../../config/geocoding/geocoding-config.json').geocoding
		async function getAddress(latitude, longitude){
			var key = geocodingConfig.KEY
			var baseUrl = geocodingConfig.BASE_URL
			var url = `${baseUrl}/reverse?key=${key}&location=${latitude},${longitude}`

			var apiResponse = axios.get(url).then(res => {
				var addressInfo = res.data.results[0].locations[0]
				return {
					logradouro: addressInfo.street,
					bairro: "",
					cidade: addressInfo.adminArea5,
					estado: addressInfo.adminArea3,
					pais: addressInfo.adminArea1,
					cep: addressInfo.postalCode,
				}

			})

			return apiResponse
		}
	}
)()