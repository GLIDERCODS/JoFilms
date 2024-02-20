const express = require("express")
const app = express()
const path = require('path')
const userRout = require('./Routs/usersRouts')



/* ===== Set Up's ===== */

app.set("view engine","ejs")
app.use(express.static(path.join(__dirname, "Public")))
app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use('/',userRout)

app.listen(9001,()=>{
    console.log("server is run..")
})