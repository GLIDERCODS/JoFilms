const Gallery = require('../Model/eventModel')

/* LOAD EVENT PAGE */

const loadGallery = async (req, res) => {
     try {
          const eventData = await Gallery.find()
          res.render("event", { eventData: eventData })
     } catch (error) {
          console.log(error);
     }
}

/* ADD EVENT */

const addGallery = async (req, res) => {
     try {
          const image = req.file ? req.file.filename : undefined;
          const event = req.body.event

          if (image === undefined) {
               res.json({ imageIssue: true });
          } else {
               const data = new Gallery({
                    event: event,
                    image: image
               });
               await data.save();
               res.json({ success: true });
          }
     } catch (error) {
          console.error(error);
          res.status(500).render("500");
     }
};

/* DELETE EVENT */

const deleteGallery = async (req, res) => {
     try {
          const eventId = req.body.eventId;
          await Gallery.deleteOne({ _id: eventId });
          res.json({ success: true });
     } catch (error) {
          console.error(error);
          res.status(500).render("500");
     }
};

module.exports = {
     loadGallery,
     addGallery,
     deleteGallery,
};