const Portfolio = require('../Model/portfolioModel')
const fs = require('fs')
/* LOAD PORTFOLIO PAGE */

const loadPortfolio = async (req, res) => {
    try {
        const portfolioData = await Portfolio.findOne()
        console.log(portfolioData);
        if(portfolioData){
            res.render("portfolio", { portfolioData: portfolioData })
        }else{
            res.render("portfolio", { portfolioData: null })
        }
    } catch (error) {
        console.log(error);
    }
}

/* EDIT PROFILE */

const editPortfolio = async (req, res) => {
    try {
        const existingPortfolio = await Portfolio.findOne();
        const updateObj = {};

        // If no existing portfolio found, create a new one
        if (!existingPortfolio) {
            const newPortfolio = new Portfolio({
                images: req.file.filename ? req.file.filename : 'default.png',
                name: req.body.name ? req.body.name : 'Not added',
                about: req.body.about ? req.body.about : 'Not added'
            });
            await newPortfolio.save();
            return res.json({ success: true });
        } else {
            // Update existing portfolio
            if (req.file && req.file.filename) {
                updateObj.images = req.file.filename;
                // Delete previous image if not default
                if (existingPortfolio.images !== 'default.png') {
                    fs.unlink(`Public/profile/${existingPortfolio.images}`, (err) => {
                        if (err) {
                            console.error("Error deleting previous image:", err);
                        } else {
                            console.log("Previous image deleted successfully");
                        }
                    });
                }
            }
            if (req.body.name) {
                updateObj.name = req.body.name;
            }
            if (req.body.about) {
                updateObj.about = req.body.about;
            }
            const result = await Portfolio.updateOne({}, { $set: updateObj });
            if (result.modifiedCount > 0) {
                return res.json({ success: true });
            } else {
                return res.json({ success: false });
            }
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: "Internal server error." });
    }
};


module.exports = {
    loadPortfolio,
    editPortfolio,
}