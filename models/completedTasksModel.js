const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const completedTasksSchema = new Schema({
    name: {
        required: "true",
        type: String
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "users"
    }
});

const completedTasksModel = mongoose.model("completedtasks", completedTasksSchema);

module.exports = {
    completedTasksModel: completedTasksModel,
    completedTasksSchema: completedTasksSchema
}