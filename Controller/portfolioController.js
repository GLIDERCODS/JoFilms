const Portfolio = require('../Model/portfolioModel')
const fs = require('fs')
/* LOAD PORTFOLIO PAGE */

const loadPortfolio = async (req, res) => {
    try {
        const portfolioData = await Portfolio.findOne()
        res.render("portfolio", { portfolioData: portfolioData })
    } catch (error) {
        console.log(error);
    }
}

/* EDIT PROFILE */

const editPortfolio = async (req, res) => {
    try {
        // console.log(req.file.filename,req.body);
        const existingPortfolio = await Portfolio.findOne();
        const updateObj = {};
        
        if(!existingPortfolio){
            const data = new Portfolio({
                images: req.file.filename,
                name:req.body.name,
                about:req.body.about
              });
              await data.save();
              return res.json({ success: true });
        }else{

            if (req.file && req.file.filename) {
                updateObj.images = req.file.filename;
                console.log("looo");
                if (existingPortfolio && existingPortfolio.images) {
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
                console.log("dddd");
            }
            if (req.body.about) {
                console.log("llll");
                updateObj.about = req.body.about;
            }
            const result = await Portfolio.updateOne({}, { $set: updateObj });
            console.log(result);
            if (result.modifiedCount > 0) {
                console.log(result);
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