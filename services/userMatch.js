const express = require("express");

module.exports = async (req, res, next) => {
    const sessionEmail = await req.session.user.email;
    const arrIndexEmail = req.body.arrIndexEmail || req.query.arrIndexEmail;

    if (sessionEmail != arrIndexEmail) {
        return res.redirect("/");;
    } else {
        next();
    }
};