const mongoose = require("mongoose");
const TaskSchema = new mongoose.Schema({
        name: {
                type: String,
                required: [true, "please enter name"],
                trim: true,
                maxLength: [255, "name should not be more than 255 characters"],
                minLength: [3, "name should not be less than 3 characters"]
        },
        completed: {
                type: Boolean, 
                default: false,
        }
});

module.exports = mongoose.model("Task", TaskSchema);