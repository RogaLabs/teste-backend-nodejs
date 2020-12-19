/* importar as configurações do servidor */
var app = require('./config/server')

const port = process.env.PORT || 3000

app.listen(port, function(){
	console.log('Servidor online na porta ' + port)
})