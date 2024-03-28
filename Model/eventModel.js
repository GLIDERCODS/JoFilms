const mongoose = require('mongoose')

const eventSchema = mongoose.Schema({
     event: {
          type : String,
          required: true
     },
     image: {
          type: String,
          required: true
     }
})

module.exports = mongoose.model("event", eventSchema);
