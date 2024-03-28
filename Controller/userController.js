const Banner = require('../Model/bannerModel')

/* HOME PAGE */

const homePageLoad = async(req,res)=>{
    try {
        const bannerData = await Banner.find()
        res.render("home",{bannerData:bannerData})
    } catch (error) {
        console.log(error)
    }
}

/* ABOUT PAGE */

const aboutPageLoad = async(req,res)=>{
    try {
        res.render("about")
    } catch (error) {
        console.log(error);
    }
}

/* PROTFOLIO */

const loadProtfolio = async(req,res)=>{
    try {
        res.render("protfolio")
    } catch (error) {
        console.log(error);
    }
}

module.exports={
    homePageLoad,
    aboutPageLoad,
    loadProtfolio
}