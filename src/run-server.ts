import { Server } from "./Server";
import { RegisterRoutes } from './routes'

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

runServer()
