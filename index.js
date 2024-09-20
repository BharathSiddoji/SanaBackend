const express = require('express')
const mongoose = require('mongoose')
const app = express()
const employees = require('./Routes/EmployeeRoute')
const cookieParser = require('cookie-parser')
const { default: helmet } = require('helmet')
const cors = require('cors')


require('dotenv').config();


const dbURI = process.env.MONGODB_URI;


// app.use(cors())

app.use(cors({
    origin: ['http://localhost:5173',"*"], // Your frontend URL
    credentials: true, // Allow credentials (cookies, authorization headers, etc.)
}));


app.use(helmet())
app.use(cookieParser())
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) 
// app.use(cors())
app.use('/', employees)
app.use('/admin', require('./Routes/admin'))

app.all("*", (req, res) => {
    res.status(404).send("<h1>404! Page not found</h1>");
  });

app.listen(3000, () => {

    mongoose.connect(dbURI).then(() => {
         console.log("Database connected")
     }).catch((err) => {
         console.log(err,err.message)
     })
    console.log('Server started on port 3000')
})