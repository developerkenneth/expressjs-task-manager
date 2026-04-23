const { response } = require("express");
const taskModel = require("../models/Task");
const handleAsync = require("../middlewares/handleAsync");

// getting errors class 
const { addError, CustomErrors } = require("../classes/CustomErrors");

const index = handleAsync(async (req, res) => {

    const tasks = await taskModel.find({});
    return res.status(200).json({
        tasks,
        message: "all items has been fetched",
        success: true,

    });
    

});

const create = handleAsync(async (req, res) => {
    const createdTask = await taskModel.create(req.body);
    return res.status(201).json({
        task: createdTask
    });
    
});


const update = handleAsync(async (req, res) => {
    const { id } = req.params;
    const task = await taskModel.findByIdAndUpdate({
        _id: id
    }, req.body, { new: true, runValidators: true });

    if (!task) {
        return next(addError('invalid task id', 404));
        
    }

    return res.json({
        message: "updated successfully",
        success: true,
        task
    });

    

});


const show = async (req, res) => {

    const { id } = req.params;
    if (id) {

        const task = await taskModel.findOne({ _id: id });
        return res.json({
            task,
            message: "show successfully"
        });

    }

    return next(addError('invalid task id', 404));
    

}


const destroy = handleAsync(async (req, res) => {
    const taskId = req.params.id;
    if (taskId) {

        const deleted = await taskModel.findOneAndDelete({ _id: taskId });
        return res.status(200).json({
            message: "deleted successfully",
            task: deleted
        });
        

    }

    return next(addError('invalid task id', 404));
    

});
module.exports = {
    index,
    create,
    update,
    show,
    destroy
}