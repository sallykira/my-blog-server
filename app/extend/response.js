class BizResponse {

    constructor(respCode, respMsg, data) {
        this.respCode = respCode,
            this.respMsg = respMsg,
            this.data = data
    }

    static isSuccess(data) {
        return new BizResponse(0, 'success', data)
    }

    static isError(errorCode, errorMsg) {
        return new BizResponse(errorCode, errorMsg)
    }
}

module.exports = {
    BizResponse
}

