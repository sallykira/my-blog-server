exports = module.exports = new function () {

    //获取开始地址
    this.getOffset = function (pageNo,pageSize) {
        return (pageNo - 1) * pageSize;
    }

}