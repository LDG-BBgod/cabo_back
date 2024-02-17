const express = require('express')
const cors = require('cors')
const http = require('http')
const socketIo = require('socket.io')
const { shutDwon } = require('./routersFunc/insure')

const app = express()
const PORT = 5000
const corsOptions = {
  origin: '*',
}

// HTTP 서버
app.use(express.json())
app.use(cors(corsOptions))

const insureRouter = require('./routers/insure')

app.use('/insure', insureRouter)

app.use((err, req, res, next) => {
  res.statusCode = err.statusCode || 500
  res.send(err.message)
})

const server = http.createServer(app)

// WSS 서버
const io = socketIo(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
})
io.on('connection', (socket) => {
  const userId = socket.handshake.query.TTID
  console.log(`웹소켓연결 : ${userId}`)

  socket.on('disconnect', () => {
    shutDwon(userId)
    console.log(`웹소켓해제 : ${userId}`)
  })
})

server.listen(PORT, () => {
  console.log(`PORT = ${PORT}`)
})
