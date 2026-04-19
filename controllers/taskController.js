const taskModel = require("../models/Task");


function index(req, res) {
    return res.json({
        message: "all items has been fetched",
        success: true,
    });
}

async function create(req, res) {
    const createdTask = await taskModel.create(req.body);
    return res.status(201).json({
        task: createdTask
    });
}


function update(req, res) {

    return res.json({
        message: "updated successfully"
    })
}


function show(req, res) {

    return res.json({
        message: "show successfully"
    })
}


function destroy(req, res) {

    return res.json({
        message: "deleted successfully"
    })
}
module.exports = {
    index,
    create,
    update,
    show,
    destroy
}