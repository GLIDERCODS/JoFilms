const mongoDB = require("./config/mongoAuth");
const express = require("express")
const app = express()
const path = require('path')
const userRout = require('./Routs/usersRouts')
const adminRout = require('./Routs/adminRouts')
const session = require("express-session")
const config = require('./config/config')

mongoDB.conectDB()
app.use(session({secret:config.sessionSecret}))

/* ===== Set Up's ===== */

app.set("view engine","ejs")
app.use(express.static(path.join(__dirname, "Public")))
app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use((req, res, next) => {
  res.header('Cache-Control', 'no-cache, no-store, must-revalidate');
  res.header('Expires', '0');
  next();
});

app.use('/admin',adminRout)
app.use('/',userRout)

app.listen(9001,()=>{
    console.log("server is run..")
})