const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const completedTasksSchema = require("../models/completedTasksModel").completedTasksSchema;


const userSchema = new Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    currentTasks: [
        {
            type: Schema.Types.ObjectId,
            ref: "tasks"
        }
    ],
    completedTasks: [completedTasksSchema]
});

userSchema.methods.updateCurrentTasks = function(task) {
    var tasksArr = this.currentTasks;
    tasksArr.push(task._id);
    return this.save();
}

userSchema.methods.removeCurrentTask = function(task) {
    var taskArr = this.currentTasks;
    var filteredArr = taskArr.filter(id => id != task._id);
    this.currentTasks = filteredArr;
    return this.save();
}

const userModel = mongoose.model("users", userSchema);



module.exports = userModel;
