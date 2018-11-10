import { Server } from "./Server";
import { RegisterRoutes } from './routes'

import "./controller/DebuggerController"

const server = new Server()
// make it configurable
const port = 9090
RegisterRoutes(server.express)

const runServer = () => {

  server
    .setLogConfig('info' as any, false)
    // .withErrorHandlers()
    .startOn(port)
}

server.express.get('/', function(request, response) {
  response.sendFile(__dirname + '/src/index.html')
})

server.express.get('/bundle.js', function(request, response) {
  response.sendFile(__dirname + '/bundle.js')
})

runServer()
