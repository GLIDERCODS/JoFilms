const express = require('express')
const userRout = express()
const userController = require("../Controller/userController")


     //* ===== View Set Up =====


userRout.set("views","./View/user")


     //? ===== Routs Handling =====

userRout.get('/',userController.homePageLoad)
userRout.get("/loadAbout",userController.aboutPageLoad)
userRout.get('/protfolio',userController.loadProtfolio)


module.exports = userRout
