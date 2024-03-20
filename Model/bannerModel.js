const mongoose = require("mongoose");

const bannerSchema = mongoose.Schema({

    image:{
        type:String,
    },
    is_blocked:{
        type:Boolean,
        required:true
    },
})
 module.exports = mongoose.model("Banner",bannerSchema)