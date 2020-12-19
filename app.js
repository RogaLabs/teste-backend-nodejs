/* importar as configurações do servidor */
var app = require('./config/server')
var mongodbUtil = require('./modules/mongodb/mongodb.module').MongoDBUtil
const port = process.env.PORT || 3000

mongodbUtil.init()

app.listen(port, function(){
	console.log('Servidor online na porta ' + port)
})