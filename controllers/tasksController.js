const express = require("express");
const taskModel = require("../models/taskModel");

module.exports.getTasks = async (req, res) => {
    try {
        
        const populatedTasksArr = await taskModel.find()
            .populate("user")
            .then();
        const emailsArr = populatedTasksArr.map(task => task.user.email);
        const tasksArr = await taskModel.find().then();
            
        res.render("tasksView", {
                    tasksArr : tasksArr,
                    isLoggedIn: req.session.isLoggedIn,
                    emailsArr : emailsArr,
                    isNotBoss: req.flash("isNotBoss")[0]
        });
    } catch(error) {
        console.log(error);
    }
            
};