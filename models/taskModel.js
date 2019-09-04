const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const taskSchema = new Schema({
    name: {
        required: "true",
        type: String
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "users"
    }
});

const taskModel = mongoose.model("tasks", taskSchema);

module.exports = taskModel;
