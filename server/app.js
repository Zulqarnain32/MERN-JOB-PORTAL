const express = require('express')
const mongoose = require('mongoose')
const app = express();
const cors = require('cors')
const cookieParser = require('cookie-parser')
const userRouter = require('./Routes/auth')
const jobRouter = require('./Routes/job')

const port = 5000;
app.use(cors({
    // origin: ['http://localhost:5173'],
    origin: ['https://mern-job-portal-frontend-url.vercel.app'],
    method: ['GET','POST','DELETE','PUT'],
    credentials:true
}))
app.use(express.json())
app.use(cookieParser())
app.use('/auth',userRouter)
app.use('/job',jobRouter)

// mongoose.connect('mongodb://127.0.0.1:27017/MernJobPortal')
mongoose.connect("mongodb+srv://zulqarnainc67:nquv3dHnkMe7RXJQ@cluster0.brcxedi.mongodb.net/")
.then(() => {
    console.log("connected successfully");
}).catch(err => console.log(err))


app.listen(port, () => {
    console.log("server is listening at port no 5000");
})