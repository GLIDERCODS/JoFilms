const mongoose = require('mongoose')

const gallerySchema = mongoose.Schema({
     firstName: {
          type : String,
          required: true
     },
     secondName: {
          type : String,
          required: true
     },
     event:{
          ref: 'event',
          required: true
     },
     image: {
          type: String,
          required: true
     }
})

module.exports = mongoose.model("gallery", gallerySchema);
