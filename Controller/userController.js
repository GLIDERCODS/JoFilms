



const homePageLoad = async(req,res)=>{
    try {
        console.log("in home page");
        res.render("home")
    } catch (error) {
        console.log(error)
    }
}



module.exports={
    homePageLoad,
}