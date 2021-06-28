const express = require("express") // express(bibliotec para cirar o servidor)
const server = express()
const routes = require("./routes")
const path = require("path")
//usando template engine
server.set('view engine', 'ejs')
// motor para trabalhar JS direto no html

// Mudar a localização da pasta views
server.set('views', path.join(__dirname, 'views'))


// habilitar arquivos statics
server.use(express.static("public")) //nome n importa, mas oq ele possui
// tudo dentro do public vira rota
//coloca uma funcção expecifica no get

// usar o req.body
server.use(express.urlencoded({extended: true}))

server.use(routes)


server.listen(3000, () => console.log('rodando'))