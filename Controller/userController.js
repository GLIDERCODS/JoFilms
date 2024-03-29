const Banner = require('../Model/bannerModel')
const Event = require('../Model/eventModel')
const Gallery = require('../Model/galleryModel')
const Portfolio = require('../Model/portfolioModel')

/* HOME PAGE */

const homePageLoad = async (req, res) => {
    try {
        const bannerData = await Banner.find()
        const events = await Event.find()
        const gallery = await Gallery.find().limit(6)
        res.render("home", { bannerData: bannerData, events: events, gallery: gallery })
    } catch (error) {
        console.log(error)
    }
}

/* ABOUT PAGE */

const aboutPageLoad = async (req, res) => {
    try {
        res.render("about")
    } catch (error) {
        console.log(error);
    }
}   

/* PROTFOLIO */

const loadProtfolio = async (req, res) => {
    try {
        const PortfolioData = await Portfolio.findOne()
        res.render("protfolio",{PortfolioData:PortfolioData})
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    homePageLoad,
    aboutPageLoad,
    loadProtfolio
}