const { json } = require('express');
const Admin = require('../Model/adminModel');
const { render } = require('../Routs/adminRouts');
const nodemailer = require('nodemailer')
const bcrypt = require('bcrypt')

/* LOGIN PAGE */
function generateOTP(length) {
    const min = 100000; // Minimum value (inclusive)
    const max = 999999; // Maximum value (inclusive)
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

const loadLoginPage = async (req, res) => {
    try {
        res.render("loginPage")
    } catch (error) {
        console.log(error);
    }
}

const sendForgetOtp = async (req, res) => {
    try {
        console.log("loooo");
        const adminEmail = await Admin.findOne({}, { email: 1, _id: 0 })
        const otp = generateOTP()
        console.log(otp);
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL,
                pass: process.env.PASS
            }
        });

        // HTML template for the email
        const htmlTemplate = `
        <!doctype html>
<html lang="en-US">

<head>
    <meta content="text/html; charset=utf-8" http-equiv="Content-Type" />
    <title>New Account Email Template</title>
    <meta name="description" content="New Account Email Template.">
    <style type="text/css">
        a:hover {text-decoration: underline !important;}
    </style>
</head>

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
                            <img width="120" src="https://res.cloudinary.com/dw2cscitl/jofilms/fze8sebgfpetz6qayx7n" title="logo" alt="logo">
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
                                        <h1 style="color:#1e1e2d; font-weight:500; margin:0;font-size:32px;font-family:'Rubik',sans-serif;">CHANGE PASSWORD
                                        </h1>
                                        <p style="font-size:15px; color:#455056; margin:8px 0 0; line-height:24px;">
                                            OTP for changing the password.</b></strong>.</p>
                                        <span
                                            style="display:inline-block; vertical-align:middle; margin:29px 0 26px; border-bottom:1px solid #cecece; width:100px;"></span>
                                        <p
                                            style="color:#455056; font-size:18px;line-height:20px; margin:0; font-weight: 500;">
                                            <strong
                                                style="display: block;font-size: 13px; margin: 0 0 4px; color:rgba(0,0,0,.64); font-weight:normal;">OTP</strong>${otp}
                                            <strong
                                                style="display: block; font-size: 13px; margin: 24px 0 4px 0; font-weight:normal; color:rgba(0,0,0,.64);">Verify your OTP</strong>
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
    <!--/100% body table-->
</body>

</html>`;

        const mailOptions = {
            from: process.env.EMAIL,
            to: adminEmail,
            subject: `New Message from JoFilims`,
            // Set HTML as the email content
            html: htmlTemplate
        };

        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
                res.status(500).send('Error sending email');
            } else {
                console.log('Email sent: ' + info.response);
                res.json({ success: true })
                res.status(200).send('Email sent successfully');
            }
        });
    } catch (error) {
        console.log(error);
    }
}



/* LOGIN VERIFICATION */

const verifyLogin = async (req, res) => {
    try {
        const email = req.body.email
        const password = req.body.password
        const adminData = await Admin.findOne({ email: email })
        if (adminData) {
            if (adminData.email === email && adminData.is_admin == 1) {
                if (await bcrypt.compare(password,adminData.password)) {
                    req.session.admin_Id = email
                    res.json({ wrongPass: true })
                } else {
                    res.json({ wrongPass: true })
                }
            } else {
                res.json({ blocked: true })
            }
        } else {
            res.json({ blocked: true })
        }

    } catch (error) {
        console.log(error);
    }
}


const changePassword = async(req, res) => {
    try {
        const { password } = req.body
        bcryptedPassword = await bcrypt.hash(password,10)
        console.log(bcryptedPassword);
        const a = await Admin.updateOne({ $set: { password: bcryptedPassword } })
        res.json({success:true})
    } catch (error) {
        console.log(error);
    }
}
/* LOAD HOME PAGE */

const loadAdminPage = async (req, res) => {
    try {
        res.render("dashBord")
    } catch (error) {
        console.log(error);
    }
}

const logout = async (req, res) => {
    try {
        req.session.destroy((err) => {
            if (err) {
                console.log(err);
                res.status(500).send('Error logging out');
            } else {
                res.redirect('loginPage');
            }
        });
    } catch (error) {
        console.log(error);
        res.status(500).send('Error logging out');
    }
}



module.exports = {
    loadLoginPage,
    loadAdminPage,
    verifyLogin,
    logout,
    sendForgetOtp,
    changePassword
}