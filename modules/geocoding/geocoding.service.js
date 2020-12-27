(
	function() {
		'use-strict'
		
		module.exports = {
			getAddress: getAddress
		}
		const axios = require('axios')
		const KEY = 'q1MGNhYBA22ILo2waAFn9jjrFfGeeBv2'
		async function getAddress(latitude, longitude){
			var url = `http://www.mapquestapi.com/geocoding/v1/reverse?key=${KEY}&location=${latitude},${longitude}`

			var apiResponse = await axios.get(url)
			var addressInfo = apiResponse.data.results[0].locations[0]
			return {
				logradouro: addressInfo.street,
				bairro: "",
				cidade: addressInfo.adminArea5,
				estado: addressInfo.adminArea3,
				pais: addressInfo.adminArea1,
				cep: addressInfo.postalCode,
			}
		}
	}
)()