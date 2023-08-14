class errorResolver extends Error {
    constructor(error, statusCode ) {
        super(error);
        this.statusCode=statusCode;
       
    }
}

module.exports = errorResolver;