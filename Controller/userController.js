

/* HOME PAGE */

const homePageLoad = async(req,res)=>{
    try {
        console.log("in home page");
        res.render("home")
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