module.exports = app => {

    app.router.get('/article/getArticleDetail', app.controller.articleController.getArticleDetail);

    app.router.post('/article/listArticle', app.controller.articleController.listArticle);

};