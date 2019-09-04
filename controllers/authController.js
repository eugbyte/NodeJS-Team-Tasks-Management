const userModel = require("../models/userModel");

//get -> login
module.exports.getLogin = (req, res) => {
    res.render("loginView", {
        isLoggedIn: req.session.isLoggedIn,
        loginErrorMessage: req.flash('loginErrorMessage')[0]
    })
};


//post -> login
module.exports.postLogin = async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    try {
        var user = await userModel.findOne( { email: email } ).then();
        if (!user) {
            req.flash('loginErrorMessage', 'User does not exists');
            return res.redirect("/login");
        } else if (user.password != password) {
            req.flash('loginErrorMessage', 'Wrong Password');
            return res.redirect("/login");
        } 
        
        if (user.password == password) {
            req.session.isLoggedIn = true;
            req.session.user = user;
            res.redirect("/");
        } else {
            res.redirect("/login");
        }
        
    } catch(error) {
        console.log(error);
    }
};

//get -> logout
module.exports.getLogout = async (req, res) => {
    try {
        await req.session.destroy();
        res.redirect("/");
    } catch(error) {
        console.log(error);
    }
};


//get -> signup
module.exports.getSignup = (req, res) => {
    res.render("signupView", {
        isLoggedIn: req.session.isLoggedIn
    });
};

//post -> signup
module.exports.postSignup = async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    var user = new userModel({
        email: email,
        password: password
    });
    await user.save()
        .then()
        .catch(err => console.log(err));
    res.redirect("/login");
}
