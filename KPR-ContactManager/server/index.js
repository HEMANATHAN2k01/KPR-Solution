const express = require('express')
const cors = require('cors')
const PORT = process.env.PORT || 8000
const mongoose = require('mongoose')

const app = express()
app.use(cors())
app.use(express.json())

mongoose.connect("mongodb://127.0.0.1:27017/contact")
.then(()=>console.log(`connected to DBs`))
.catch((err)=>console.log(err))

//Schema
const SchemaData = mongoose.Schema({
    name:String,
    email:String,
    address:String,
    moblieNo:Number,
    typeOfCase:String,
    description:String
})

const userModel = mongoose.model("user",SchemaData)

app.get("/",async(req,res)=>{
    const data = await userModel.find({})
    res.json({success : true, data : data}) 
})

app.post("/create", async(req,res)=>{
    console.log(req.body)
    const data = new userModel(req.body)
    await data.save()
    res.send({success : true, message : "data save succcessfully and refresh the to view new contact"})
})

app.listen(`${PORT}`,()=>console.log(`Server is running`))