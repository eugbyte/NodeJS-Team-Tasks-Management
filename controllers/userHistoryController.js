const express = require("express");
const userModel = require("../models/userModel");
const completedTasksModel = require("../models/completedTasksModel");

module.exports.getUserHistory = async (req, res) => {
    const email = req.session.user.email;
    try {
        const user = await userModel.findOne( { email : email } )
            .populate("currentTasks")
            .then()
            .catch(error => console.log(error));
        
        res.render("userHistoryView", {
            currentTasksArr: user.currentTasks,
            username: email,
            completedTasksArr: user.completedTasks,
            isLoggedIn: req.session.isLoggedIn
        });
    } catch(error) {
        console.log(error);
    }
};
