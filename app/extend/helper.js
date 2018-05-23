const moment = require('moment');

exports = module.exports = {

    YYYYMMDD_HHmmss : "YYYY-MM-DD HH:mm:ss",

    //时间格式化
    formatDateTime(date,pattern) {
        return moment(date).format(pattern)
    },

    formatDefaultDateTime(date) {
        return moment(date).format(this.YYYYMMDD_HHmmss)
    },

    //db工具
    getOffset(pageNo,pageSize) {
        return Number(pageNo - 1 | 0) * Number(pageSize | 0);
    }
};