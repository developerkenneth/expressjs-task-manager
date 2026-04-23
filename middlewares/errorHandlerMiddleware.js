// come back to this later
const { CustomErrors } = require("../classes/CustomErrors");
const errorHandlerMiddleware = (err, req, res, next) => {
    // If it's a Mongoose validation error
    if (err.name === 'ValidationError') {
        const msg = Object.values(err.errors).map(item => item.message).join(', ');
        return res.status(400).json({ msg });
    }

    if (err instanceof CustomErrors) {
        // Default error
        return res.status(err.statusCode || 500).json({ msg: err.msg });
    }

    return res.status(500).json({
        msg : "oops something went wrong on our end"
    });


};

module.exports = errorHandlerMiddleware;