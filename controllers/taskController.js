const { response } = require("express");
const taskModel = require("../models/Task");


async function index(req, res) {
    try {
        const tasks = await taskModel.find({});

        return res.status(200).json({
            tasks,
            message: "all items has been fetched",
            success: true,

        });
        process.exit(0);
    } catch (error) {
        return res.status(500).json(
            error.errors
        );
        process.exit(0);

    }

}

async function create(req, res) {
    try {

        const createdTask = await taskModel.create(req.body);
        return res.status(201).json({
            task: createdTask
        });
        process.exit(0);

    } catch (err) {
        return res.status(500).json(err.errors.name);
        process.exit(0);
    }

}


async function update(req, res) {
    const { id } = req.params;
    try {
        const task = await taskModel.findByIdAndUpdate({
            _id: id
        }, req.body, { new : true, runValidators});

        if (!task) {
            return res.status(400).
                json({
                    error: "invalid task id",
                    sucess: false
                });
            process.exit(0);
        }

        return res.json({
            message: "updated successfully",
            success: true,
            task
        });

        process.exit(0);

    } catch (err) {
        return res.status(500).
            json(err);
        process.exit(0);
    }

}


async function show(req, res) {

    const { id } = req.params;
    if (id) {

        try {
            const task = await taskModel.findOne({ _id: id });
            return res.json({
                task,
                message: "show successfully"
            });
        } catch (err) {
            return res.status(500).json(err);
            process.exit(0);
        }

    }

    return res.status(400).json({
        success: false,
        message: "kindly provide an id"
    });
    process.exit(0);

}


async function destroy(req, res) {
    const taskId = req.params.id;
    if (taskId) {
        try {
            const deleted = await taskModel.findOneAndDelete({ _id: taskId });
            return res.status(200).json({
                message: "deleted successfully",
                task: deleted
            });
            process.exit(0);

        } catch (err) {
            return res.status(500).json({
                success: false,
                error: err
            });
            process.exit(0);
        }

    }

    return res.status(400).json({
        success: false,
        message: "kindly provide an id"
    });
    process.exit(0);



}
module.exports = {
    index,
    create,
    update,
    show,
    destroy
}