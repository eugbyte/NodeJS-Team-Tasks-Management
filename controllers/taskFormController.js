const express = require("express");
const taskModel = require("../models/taskModel");
const completedTasksModel = require("../models/completedTasksModel").completedTasksModel;
const userModel = require("../models/userModel");


//GET -> Create
module.exports.getCreate = (req, res) => {
    res.render("taskFormView", {
        task: {},
        update: false,
        isLoggedIn: req.session.isLoggedIn
    });
};

//GET -> Update
module.exports.getUpdate = async (req, res) => {
    const id = req.params.taskId;
    
    try {
        const task = await taskModel.findById(id).then();
        res.render("taskFormView", {
            task: task,
            update: true,
            isLoggedIn: req.session.isLoggedIn
        });
    } catch(error) {
        console.log(error);
    }
};
        
//POST -> Create
module.exports.postCreate = async (req, res) => {
    const name = req.body.name;
    const email = req.session.user.email;
    const user = await userModel.findOne( { email: email } ).then();
    const task = new taskModel( { 
            name: name,
            user: user
        } );
    
    try {
        var insertedTask = await task.save().then();
        await user.updateCurrentTasks(insertedTask)
            .then();
        res.redirect("/");
    } catch(error) {
        console.log(error);
    }
};

//POST -> Update
module.exports.postUpdate = async (req, res) => {
    const name = req.body.name;
    const id = req.body._id;

    try {
        const task = await taskModel.findById(id).then();
        task.name = name;
        await task.save().then();
        res.redirect("/");
    } catch(error) {
        console.log(error);
    }
};

//POST -> Delete
module.exports.postDelete =  async (req, res) => {
    const id = req.body._id;
    const email = req.session.user.email;
    const user = await userModel.findOne( { email: email } ).then();

    try {
        const removedTask = await taskModel.findByIdAndRemove(id)
            .then();
        await user.removeCurrentTask(removedTask)
            .then()
            .catch(error => console.log(error));
        
        res.redirect("/");
    } catch(error) {
        console.log(error);
    }
};

//POST -> Complete
module.exports.postComplete = async (req, res) => {
    const id = req.body._id;
    const email = req.session.user.email;
    const user = await userModel.findOne( { email: email } ).then();
    try {
        const removedTask = await taskModel.findByIdAndRemove(id).then();
        const completedTask = new completedTasksModel({
            name: removedTask.name,
            user: removedTask.user
        });
        await user.completedTasks.push(completedTask);
        user.save().then();
        
        res.redirect("/");
    } catch(error) {
        console.log(error);
    }
};
