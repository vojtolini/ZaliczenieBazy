// import bibliotek
const http = require("http")

const app = require("./app")

// stworzę port na którym będzie nasłuchiwał serwer
const port = process.env.PORT || 3000

//stworzę serwer
const server = http.createServer(app)

//odpalę serwer
server.listen(port)