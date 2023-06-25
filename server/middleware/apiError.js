const mongoose = require('mongoose');
const httpStatus = require('http-status');

class ApiError extends Error {
    constructor(statuscode, message){
        super();
        this.statuscode = statuscode;
        this.message = message;
    }
}

const handleError = (err, res) => {
    const {statuscode, message} = err;
    res.status(statuscode).json({
        status: 'error',
        statuscode,
        message
    });
}

const convertToApiError = (err, req, res, next) => {
    let error = err;
    if(!(error instanceof ApiError)){
        const statuscode = error.statuscode || error instanceof mongoose.Error ? httpStatus.BAD_REQUEST : httpStatus.INTERNAL_SERVER_ERROR;
        const message = error.message || httpStatus[statuscode];
        error = new ApiError(statuscode, message);
    }

    next(error)
}

module.exports = {
    ApiError,
    handleError,
    convertToApiError
}