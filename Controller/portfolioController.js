const Portfolio = require('../Model/portfolioModel')

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

        const existingPortfolio = await Portfolio.findOne();
        const updateObj = {};
        if (req.file && req.file.filename) {
            updateObj.images = req.file.filename;
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
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: "Internal server error." });
    }
};

module.exports = {
    loadPortfolio,
    editPortfolio,
}