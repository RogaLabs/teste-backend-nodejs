(
	function() {
		
		const mongoose = require('mongoose')

		const Schema = mongoose.Schema
		const ComplaintSchema = new Schema({
			latitude: {
				type: Number,
				required: true
			},
			longitude: {
				type: Number,
				required: true
			},
			denunciante: {
				nome: String,
				cpf: String
			},
			denuncia: {
				titulo: String,
				descricao: String
			}
		})
		
		module.exports = mongoose.model('complaints', ComplaintSchema)
	}
)()