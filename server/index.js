const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const cors = require('cors')
const bodyParser = require('body-parser')
const userRoutes = require('./routes/route')


const app = express()

dotenv.config()

mongoose.connect(`mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.eocneex.mongodb.net/${process.env.DB_NAME}`, {
    useUnifiedTopology: true
})
.then(() => console.log('Database Connected Successfully'))
.catch((err) => console.log(err))

app.use(cors())
app.use(bodyParser.json({extended: true}))
app.use(bodyParser.urlencoded({extended: true}))
app.use('/', userRoutes)

app.listen(8000, (req, res) => {
    console.log('Server is running on port 8000')
})