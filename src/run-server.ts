import { Server } from './Server'
import { RegisterRoutes } from './routes'

import './api/service/controller/DebuggerController'
import './api/service/controller/TransactionController'
import './api/service/controller/FileController'
import './api/service/controller/DisassembleController'
import './api/service/controller/ControlFlowGraphController'

const server = new Server()
// make it configurable
const port = 9090
RegisterRoutes(server.express)

const clientErrorHandler = (err, req, res, next) => {
  if ((err.hasOwnProperty('thrown') && err.thrown) || (err.name && err.name === 'ValidateError')) {
    return res.status(err.status).send(err.response || { message: err.message, fields: err.fields })
  } else {
    return next(err)
  }
}

server.express.use(clientErrorHandler)

const runServer = () => {
  server
    .setLogConfig('info' as any, false)
    // .withErrorHandlers()
    .startOn(port)
}

server.express.get('/', function(request, response) {
  response.sendFile(__dirname + '/index.html')
})

server.express.get('/bundle.js', function(request, response) {
  response.sendFile(__dirname + '/bundle.js')
})

runServer()
