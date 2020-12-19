(
	function() {
		
		const mongoose = require('mongoose')

		const Schema = mongoose.Schema
		const denuncianteSchema = new Schema({
			nome: String,
			cpf: String
		})
		
		const denunciaSchema = new Schema({
			titulo: String,
			descricao: String
		})
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
				type: denuncianteSchema,
				required: true
			},
			denuncia: {
				type: denunciaSchema,
				required: true
			}
		})
		
		module.exports = mongoose.model('complaints', ComplaintSchema)
	}
)()