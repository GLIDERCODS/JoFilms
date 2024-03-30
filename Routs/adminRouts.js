const express = require('express')
const adminRout = express()

const auth = require('../middleWare/auth')
const adminController = require('../Controller/adminController')
const bannerController = require("../Controller/bannerController")
const portfolioController = require('../Controller/portfolioController')
const eventController = require('../Controller/eventController')
const galleryController = require('../Controller/galleryController')

const multer = require('../middleWare/multer')
/* ===== view set up ===== */

adminRout.set("views","./View/admin")

adminRout.get('/',auth.isLogout,adminController.loadLoginPage)
adminRout.post('/verifyLogin',adminController.verifyLogin)
adminRout.get('/home',auth.isLogin,adminController.loadAdminPage)

adminRout.get('/banner',auth.isLogin,bannerController.loadBanner)
adminRout.post('/addBanner',auth.isLogin,multer.bannerMulter,bannerController.addBanner);
adminRout.post('/deleteBanner',auth.isLogin,bannerController.deletBanner)

adminRout.get('/Portfolio',auth.isLogin,portfolioController.loadPortfolio)
adminRout.post('/editPortfolio',auth.isLogin,multer.portfolioMulter,portfolioController.editPortfolio)

adminRout.get('/event',auth.isLogin,eventController.loadEvent)
adminRout.post('/addEvent',auth.isLogin,multer.eventMulter,eventController.addEvent)
adminRout.post('/deleteEvent',auth.isLogin,eventController.deleteEvent)

adminRout.get('/gallery',auth.isLogin,galleryController.loadGallery)
adminRout.post('/addGallery',auth.isLogin,multer.galleryMulter,galleryController.addGallery)
adminRout.post('/deleteGallery',auth.isLogin,galleryController.deleteGallery)

adminRout.post('/logout')

adminRout.get("*",function(req,res){
    res.redirect("/admin")
})
 
 module.exports = adminRout