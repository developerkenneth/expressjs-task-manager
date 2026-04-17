

function index(req, res) {
    return res.json({
        message: "all items has been fetched",
        success: true,
    });
}

function create(req, res) {

    return res.json({
        message: "created successfully"
    })
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