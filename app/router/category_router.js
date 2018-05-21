module.exports = app => {

    app.router.get('/category/listCategory', app.controller.categoryController.listCategory);

    app.router.post('/category/addCategory', app.controller.categoryController.addCategory);

    app.router.post('/category/updateCategory', app.controller.categoryController.updateCategory);

    app.router.get('/category/deleteCategory', app.controller.categoryController.deleteCategory);

};