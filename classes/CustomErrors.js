
class CustomErrors extends Error {
    constructor(msg, statusCode){
        super(msg);
        this.statusCode=statusCode;
    }
}


const addError = (msg, statusCode)=>{
    return new CustomErrors(msg, statusCode);
}

module.exports = {addError, CustomErrors};