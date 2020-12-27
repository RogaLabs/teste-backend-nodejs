/* importar as configurações do servidor */
var app = require('./config/server')
var mongodbUtil = require('./modules/mongodb/mongodb.module').MongoDBUtil
const port = process.env.PORT || 3000
const ComplaintController = require('./modules/complaint/complaint.module')().ComplaintController

mongodbUtil.init()
app.use('/denuncias', ComplaintController)

app.listen(port, function(){
	console.log('Servidor online na porta ' + port)
})

module.exports = app