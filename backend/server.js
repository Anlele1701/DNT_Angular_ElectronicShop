const express=require('express')
const app= express()
const mongoose=require('mongoose')
const cors=require('cors')
const multer=require('multer')


app.use(cors())
app.listen(3800,()=>{
    mongoose.connect('mongodb+srv://doAnLTWNC:doAnLTWNC@cluster0.tasxwde.mongodb.net/').then(()=> console.log('Connected to Mongo Successfully'))
    .catch(error=>handleError(error));
})

app.use(express.json)
