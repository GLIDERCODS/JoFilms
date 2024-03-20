const Banner = require("../Model/bannerModel")

/* LOAD BANNER PAGE */

const loadBanner = async(req,res)=>{
    try {
        res.render("banner")
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

module.exports = { 
    loadBanner,
    addBanner, 
};