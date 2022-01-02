const express = require('express')
const cors = require('cors')
const baseRouter = require('./routers/baseRouter')


const app = express()

// middleware
app.use(cors())

app.use(express.json())

app.use(express.urlencoded({ extended: true }))


// routers
app.use('/', baseRouter)

//port

const PORT = process.env.PORT || 8080

//server

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})