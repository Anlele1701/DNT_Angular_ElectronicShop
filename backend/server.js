const express=require('express')
const app= express()
const mongoose=require('mongoose')
const cors=require('cors')
const multer=require('multer')
const route=require('./routes/route')
const path=require('path')
const { urlencoded } = require('body-parser')
const cookieparser=require('cookie-parser')

//
app.use(cors())
//
app.use('/images', express.static(path.join(__dirname,"/assets/ProductImages")))
require('dotenv').config();
app.use(urlencoded({extended:false}))
app.use(cookieparser())
app.use(express.json())


app.listen(3800,()=>{
    mongoose.connect('mongodb+srv://doAnLTWNC:doAnLTWNC@cluster0.tasxwde.mongodb.net/DOAN').then(()=> console.log('Connected to Mongo Successfully'))
    .catch(error=>handleError(error));
})
app.use(express.json())
app.use(route)
