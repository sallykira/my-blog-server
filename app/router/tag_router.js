module.exports = app => {

    app.router.get('/tag/listTag', app.controller.tagController.listTag);

    app.router.post('/tag/addTag', app.controller.tagController.addTag);

    app.router.post('/tag/updateTag', app.controller.tagController.updateTag);

    app.router.get('/tag/deleteTag', app.controller.tagController.deleteTag);

};