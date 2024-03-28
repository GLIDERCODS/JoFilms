const Event = require('../Model/eventModel')

/* LOAD EVENT PAGE */

const loadEvent = async (req, res) => {
     try {
          const eventData = await Event.find()
          res.render("event", { eventData: eventData })
     } catch (error) {
          console.log(error);
     }
}

/* ADD EVENT */

const addEvent = async (req, res) => {
     try {
          const image = req.file ? req.file.filename : undefined;
          const event = req.body.event

          if (image === undefined) {
               res.json({ imageIssue: true });
          } else {
               const data = new Event({
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

const deletEvent = async (req, res) => {
     try {
          const eventId = req.body.eventId;
          await Event.deleteOne({ _id: eventId });
          res.json({ success: true });
     } catch (error) {
          console.error(error);
          res.status(500).render("500");
     }
};

module.exports = {
     loadEvent,
     addEvent,
     deletEvent,
};