const Portfolio = require('../Model/portfolioModel')


/* LOAD PORTFOLIO PAGE */

const loadPortfolio = async(req,res)=>{
    try {
        const portfolioData = await Portfolio.findOne()
        console.log(portfolioData);
        res.render("portfolio",{portfolioData:portfolioData})
    } catch (error) {
        console.log(error);
    }
}

/* EDIT PROFILE */

const editPortfolio = async(req,res)=>{
    try {
          // Check if all required fields are provided
          if (!req.file || !req.body.name || !req.body.about) {
            return res.status(400).json({ error: "Please provide all required fields." });
        }
    
        // Save the portfolio details to the database
        const portfolio = new Portfolio({
            images: req.file.filename,
            name: req.body.name,
            about: req.body.about
        });
        await portfolio.save();

        // Return success response
        return res.status(200).json({ success: true, message: "Portfolio updated successfully." });
    } catch (error) {
        console.log(error);
    }
}

module.exports={
    loadPortfolio,
    editPortfolio,
}