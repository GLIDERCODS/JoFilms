const mongoose = require('mongoose')

const gallerySchema = mongoose.Schema({
     firstName: {
          type : String
     },
     secondName: {
          type : String
     },
     event:{
          type: String,
          required: true
     },
     image: {
          type: String,
          required: true
     }
})

module.exports = mongoose.model("gallery", gallerySchema);
