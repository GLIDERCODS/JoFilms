const Banner = require('../Model/bannerModel')
const Event = require('../Model/eventModel')
const Gallery = require('../Model/galleryModel')
const Portfolio = require('../Model/portfolioModel')
const nodemailer = require('nodemailer')
let dotenv = require("dotenv")
dotenv.config()

/* HOME PAGE */

const homePageLoad = async (req, res) => {
    try {
        const bannerData = await Banner.find();

        const events = await Event.find().limit(3);

        const eventNames = events.map(event => event.event);

        const gallery = await Gallery.aggregate([
            { $match: { event: { $in: eventNames } } },
            {
                $group: {
                    _id: "$event",
                    images: { $push: { firstName: "$firstName", secondName: "$secondName", image: "$image" } }
                }
            },
            { $project: { _id: 0, event: "$_id", images: { $slice: ["$images", 2] } } } // Take 2 images for each event
        ]);

        res.render("home", { events: events, gallery: gallery, bannerData: bannerData });
    } catch (error) {
        console.log(error);
    }
};



/* ABOUT PAGE */

const aboutPageLoad = async (req, res) => {
    try {
        const bannerData = await Banner.find();

        const events = await Event.find().limit(3);

        const eventNames = events.map(event => event.event);

        const gallery = await Gallery.aggregate([
            { $match: { event: { $in: eventNames } } },
            {
                $group: {
                    _id: "$event",
                    images: { $push: { firstName: "$firstName", secondName: "$secondName", image: "$image" } }
                }
            },
            { $project: { _id: 0, event: "$_id", images: { $slice: ["$images", 2] } } }
        ]);

        res.render("about", { events: events, gallery: gallery, bannerData: bannerData });
    } catch (error) {
        console.log(error);
    }
}

/* PROTFOLIO */

const loadProtfolio = async (req, res) => {
    try {
        const PortfolioData = await Portfolio.findOne()
        res.render("protfolio", { PortfolioData: PortfolioData })
    } catch (error) {
        console.log(error);
    }
}

const loadContact = async (req, res) => {
    try {
        res.render('contact')
    } catch (error) {
        console.log(error);
    }
}

const sendMail = async (req, res) => {
    try {
        const { name, email, message } = req.body;

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL,
                pass: process.env.PASS
            }
        });

        // HTML template for the email
        const htmlTemplate = `
        <head></head>

        <body marginheight="0" topmargin="0" marginwidth="0" style="margin: 0px; background-color: #f2f3f8;" leftmargin="0">
            <!-- 100% body table -->
            <table cellspacing="0" border="0" cellpadding="0" width="100%" bgcolor="#f2f3f8"
                style="@import url(https://fonts.googleapis.com/css?family=Rubik:300,400,500,700|Open+Sans:300,400,600,700); font-family: 'Open Sans', sans-serif;">
                <tr>
                    <td>
                            <table style="background-color: #f2f3f8; max-width:670px; margin:0 auto;" width="100%" border="0"
                                align="center" cellpadding="0" cellspacing="0">
                                <tr>
                                    <td style="height:80px;">&nbsp;</td>
                                </tr>
                                <tr>
                                    <td style="text-align:center;">
                                        <a title="logo" target="_blank">
                                                <img width="20%" >
                                        </a>
                                    </td>
                                </tr>
                                <tr>
                                    <td style="height:20px;">&nbsp;</td>
                                </tr>
                                <tr>
                                    <td>
                                        <table width="95%" border="0" align="center" cellpadding="0" cellspacing="0"
                                                style="max-width:670px; background:#fff; border-radius:3px; text-align:center;-webkit-box-shadow:0 6px 18px 0 rgba(0,0,0,.06);-moz-box-shadow:0 6px 18px 0 rgba(0,0,0,.06);box-shadow:0 6px 18px 0 rgba(0,0,0,.06);">
                                                <tr>
                                                    <td style="height:40px;">&nbsp;</td>
                                                </tr>
                                                <tr>
                                                    <td style="padding:0 35px;">
                                                        <h1
                                                            style="color:#1e1e2d; font-weight:500; margin:0;font-size:32px;font-family:'Rubik',sans-serif;">
                                                            JOFILMS
                                                        </h1>
                                                        <p style="font-size:15px; color:#455056; margin:8px 0 0; line-height:24px;"><strong>ENQUIRY : </strong>${message}</p>
                                                        <span
                                                            style="display:inline-block; vertical-align:middle; margin:29px 0 26px; border-bottom:1px solid #cecece; width:100px;"></span>
                                                        <p
                                                            style="color:#455056; font-size:18px;line-height:20px; margin:0; font-weight: 500;">
                                                            <strong
                                                                    style="display: block;font-size: 13px; margin: 0 0 4px; color:rgba(0,0,0,.64); font-weight:normal;">Username</strong>${name}
                                                            <strong
                                                                    style="display: block; font-size: 13px; margin: 24px 0 4px 0; font-weight:normal; color:rgba(0,0,0,.64);">Password</strong>${email}
                                                        </p>

                                                        
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td style="height:40px;">&nbsp;</td>
                                                </tr>
                                        </table>
                                    </td>
                                </tr>
                                <tr>
                                    <td style="height:20px;">&nbsp;</td>
                                </tr>
                                
                                <tr>
                                    <td style="height:80px;">&nbsp;</td>
                                </tr>
                            </table>
                    </td>
                </tr>
            </table>
        </body>
        
        </html>`;

        const mailOptions = {
            from: email,
            to: process.env.EMAIL,
            subject: `New Message from ${name}`,
            // Set HTML as the email content
            html: htmlTemplate
        };

        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
                res.status(500).send('Error sending email');
            } else {
                console.log('Email sent: ' + info.response);
                res.status(200).send('Email sent successfully');
            }
        });
    } catch (error) {
        console.log(error);
    }
}


module.exports = {
    homePageLoad,
    aboutPageLoad,
    loadProtfolio,
    sendMail,
    loadContact
}