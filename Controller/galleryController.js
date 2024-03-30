const Gallery = require('../Model/galleryModel')
const Event = require('../Model/eventModel')

/* LOAD GALLERY PAGE USER*/

const loadGalleryUser = async (req, res) => {
     try {
          const event = req.body.event
          if (event === undefined) {
               res.json({ eventIssue: true });
          } else {
               const galleryData = await Gallery.find({ event: event })
               if (galleryData.length > 0) {
                    res.render("gallery", { galleryData: galleryData })
               } else {
                    res.json({ galleryIssue: true, message: "No images found on this event" });
               }
          }
     } catch (error) {
          console.log(error);
     }
}

/* LOAD GALLERY PAGE */

const loadGallery = async (req, res) => {
     try {
          const eventsData = await Event.find()
          const galleryData = await Gallery.find()
          res.render("gallery", {eventsData:eventsData, galleryData: galleryData })
     } catch (error) {
          console.log(error)
     }
}

/* ADD GALLERY */

const addGallery = async (req, res) => {
     try {
          const image = req.file ? req.file.filename : undefined;
          const { firstName, lastName, event } = req.body
         
               const data = new Gallery({
                    firstName: firstName,
                    secondName: lastName,
                    event: event,
                    image: image
               });
               await data.save();
               res.json({ success: true });
          
     } catch (error) {
          console.error(error);
          res.status(500).render("500");
     }
};

/* DELETE GALLERY */

const deleteGallery = async (req, res) => {
     try {
          const imageId = req.body.imageId;
          await Gallery.deleteOne({ _id: imageId });
          res.json({ success: true });
     } catch (error) {
          console.error(error);
          res.status(500).render("500");
     }
};

module.exports = {
     loadGallery,
     loadGalleryUser,
     addGallery,
     deleteGallery,
}