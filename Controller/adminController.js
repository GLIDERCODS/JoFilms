const { json } = require('express');
const Admin = require('../Model/adminModel');
const { render } = require('../Routs/adminRouts');

/* LOGIN PAGE */

const loadLoginPage = async(req,res)=>{
    try {
        res.render("loginPage")
    } catch (error) {
        console.log(error);
    }
}

/* LOGIN VERIFICATION */

const verifyLogin = async(req,res)=>{
    try {
        const email = req.body.email
        const password =  req.body.password
        const adminData = await Admin.findOne({email:email})
        if(adminData){
            if(adminData.email===email && adminData.is_admin == 1){
                if(adminData.password===password){
                    req.session.admin_Id = email
                    res.json({wrongPass:false})
                }else{
                    res.json({wrongPass:true})
                }
            }else{
                res.json({blocked:true})
            }
        }else{
            res.json({blocked:true})
        }

    } catch (error) {
        console.log(error);
    }
}

/* LOAD HOME PAGE */

const loadAdminPage = async(req,res)=>{
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
    logout
    
}