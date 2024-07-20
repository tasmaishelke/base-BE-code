require('dotenv').config()
const express = require('express')
const app = express()
const asyncHandler = require('express-async-handler')
const connectDB = require('./config/connectDB')

const authRoutes = require('./routes/authRoutes')
const userRoutes = require('./routes/userRoutes')

const cookieParser = require('cookie-parser')

//middlewares
app.use(express.json())
app.use(cookieParser())


//routes
// app.use('/', (req, res)=>
//     {
//         res.send("hello")
//     })

// app.use('/users', userRoutes)
app.use('/auth', authRoutes)
app.use('/users', userRoutes)


const start = asyncHandler(async () =>
{

    await connectDB(process.env.MONGO_URI)
    console.log("Connected to Database");
    app.listen(process.env.PORT, console.log(`Server is listening on port ${process.env.PORT}`))
    
})

start()
