module.exports = class BizResponse {

    constructor(respCode, respMsg, data) {
        this.respCode = respCode,
            this.respMsg = respMsg,
            this.data = data
    }

    static isSuccess(data){
        return new Response(0,'success',data)
    }

    static isError(errorCode,errorMsg){
        return new Response(errorCode,errorMsg)
    }
};