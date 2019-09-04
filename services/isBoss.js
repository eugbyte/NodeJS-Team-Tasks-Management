const express = require("express");

module.exports = (req, res, next) => {
    const email = req.session.user.email;
    if (email.includes("boss")) {
        //only boss allowed to delete
        next();
    } else {
        console.log("user is not boss");
        req.flash("isNotBoss", true);
        return res.redirect("/");
    }
};