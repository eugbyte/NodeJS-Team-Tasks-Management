const express = require("express");
const taskModel = require("../models/taskModel");

module.exports.getTasks = async (req, res) => {
    try {
        
        const populatedTasksArr = await taskModel.find()
            .populate("user")
            .then();
        const emailsArr = populatedTasksArr.map(task => task.user.email);
        const tasksArr = await taskModel.find().then();
        
        var currentUserEmail;
        if (req.session.user) {
            currentUserEmail = req.session.user.email;
        } else {
            currentUserEmail = null;
        }
        console.log(currentUserEmail);      
            
        res.render("tasksView", {
                    tasksArr : tasksArr,
                    isLoggedIn: req.session.isLoggedIn,
                    emailsArr : emailsArr,
                    currentUserEmail: currentUserEmail 
        });
    } catch(error) {
        console.log(error);
    }
            
};