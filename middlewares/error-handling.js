// come back to this later

const errorHandlerMiddleware = (err, req, res, next) => {
    // If it's a Mongoose validation error
    if (err.name === 'ValidationError') {
        const msg = Object.values(err.errors).map(item => item.message).join(', ');
        return res.status(400).json({ msg });
    }
    
    // Default error
    return res.status(500).json({ msg: 'Something went wrong, please try again' });
};

module.exports = errorHandlerMiddleware;