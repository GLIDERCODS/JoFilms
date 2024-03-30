const Banner = require('../Model/bannerModel')
const Event = require('../Model/eventModel')
const Gallery = require('../Model/galleryModel')
const Portfolio = require('../Model/portfolioModel')

/* HOME PAGE */

const homePageLoad = async (req, res) => {
    try {
        const bannerData = await Banner.find();
        
        const events = await Event.find().limit(3);

        const eventNames = events.map(event => event.event);

        const gallery = await Gallery.aggregate([
            { $match: { event: { $in: eventNames } } }, 
            { $group: { 
                _id: "$event", 
                images: { $push: { firstName: "$firstName", secondName: "$secondName", image: "$image" } } 
            } }, 
            { $project: { _id: 0, event: "$_id", images: { $slice: ["$images", 2] } } } // Take 2 images for each event
        ]);

        res.render("home", { events: events, gallery: gallery, bannerData: bannerData });
    } catch (error) {
        console.log(error);
    }
};

 

/* ABOUT PAGE */

const aboutPageLoad = async (req, res) => {
    try {
        const bannerData = await Banner.find();
        
        const events = await Event.find().limit(3);

        const eventNames = events.map(event => event.event);

        const gallery = await Gallery.aggregate([
            { $match: { event: { $in: eventNames } } }, 
            { $group: { 
                _id: "$event", 
                images: { $push: { firstName: "$firstName", secondName: "$secondName", image: "$image" } } 
            } }, 
            { $project: { _id: 0, event: "$_id", images: { $slice: ["$images", 2] } } } 
        ]);

        res.render("about", { events: events, gallery: gallery, bannerData: bannerData });
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