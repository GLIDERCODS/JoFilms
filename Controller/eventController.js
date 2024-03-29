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
         const event = req.body.event.toUpperCase()

         const eventExisting = await Event.findOne({ event: { $regex: new RegExp('^' + event + '$', 'i') } });
         if (eventExisting) {
             return res.json({ eventExist: true });
         }
         const data = new Event({
             event: event,
             image: image
         });
         await data.save();
         return res.json({ success: true });
     } catch (error) {
         console.error(error);
     //     return res.status(500).json({ error: true });
     }
 };
 

/* DELETE EVENT */

const deleteEvent = async (req, res) => {
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
     deleteEvent,
};