const Admin = require("../Model/adminModel")


const isLogin = async (req, res, next) => {
  try {
    if (req.session.admin_Id) {
      next()
    } else {
      
      res.redirect("/admin");
    }
  } catch (error) {
    console.error(error.message);
    res.redirect("/admin");
  }
};

const isLogout = async (req, res, next) => {
  try {
    if (req.session.admin_Id) {
      res.redirect("/admin/home");
    } else {
      next();
    }
  } catch (error) {
    console.error(error.message);
  }
};

module.exports = {
  isLogin,
  isLogout,
};

