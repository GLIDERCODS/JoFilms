const express = require('express')
const adminRout = express()

const auth = require('../middleWare/auth')
const adminController = require('../Controller/adminController')

/* ===== view set up ===== */

adminRout.set("views","./View/admin")

adminRout.get('/',auth.isLogout,adminController.loadLoginPage)
adminRout.post('/verifyLogin',adminController.verifyLogin)
adminRout.get('/home',auth.isLogin,adminController.loadAdminPage)
adminRout.get('/banner',auth.isLogin,adminController.loadBanner)

adminRout.get("*",function(req,res){
    res.redirect("/admin")
})
 
 
 module.exports = adminRout