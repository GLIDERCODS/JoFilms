const fs = require('fs');
const path = require('path');
const Banner = require("../Model/bannerModel")

/* LOAD BANNER PAGE */

const loadBanner = async(req,res)=>{
    try {
      const bannerData = await Banner.find()
        res.render("banner",{bannerData:bannerData})
    } catch (error) {
        console.log(error);
    }
}

/* ADD BANNER */

const addBanner = async (req, res) => {
    try {
        console.log("hello");
      const image = req.file ? req.file.filename : undefined;

      if (image === undefined) {
        res.json({ imageIssue: true });
      }else {
          const data = new Banner({
            image: image,
            is_blocked: false,
          });
          await data.save();
          res.json({ success: true });
      }
    } catch (error) {
      console.error(error);
      res.status(500).render("500");
    }
  };

  /* DELETE BANNER */

  const deletBanner = async(req,res)=>{
    try {
      const bannerId = req.body.bannerId;
      const banner = await Banner.findOne({ _id: bannerId });
    if (!banner) {
      return res.status(404)
    }

    const imagePath = path.join(__dirname, '../Public/banner', banner.image);
    if (fs.existsSync(imagePath)) {
      fs.unlinkSync(imagePath);
    }
      await Banner.deleteOne({ _id: bannerId });
      res.json({ success: true });
    } catch (error) {
      console.error(error);
      res.status(500).render("500");
    }
  };

module.exports = { 
    loadBanner,
    addBanner, 
    deletBanner,
};