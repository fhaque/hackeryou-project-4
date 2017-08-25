class App {
    constructor() {

    }


    static createDomArticleBin(articleArray) {
        const $articleBin = $('<div>').addClass('articleBin');

        for (let i = 0; i < articleArray.length; i++) {
            $articleBin.append( App.createDomArticle(articleArray[i]) );
        }

        return $articleBin;
    }

    static createDomArticle(article) {
        const $article = $('<div>').addClass('article');
        const $title = $('<h1>').addClass('article__title').text(article.articleEntry.title);
        const $summary = $('<p>').addClass('article__summary').text(article.articleEntry.summary);
        
        const $summaryObj = $('<p>').addClass('article__summaryObj').text(JSON.stringify(article.summaryObj));

        const $titleObj = $('<p>').addClass('article__titleObj').text(JSON.stringify(article.titleObj));

        const $categories = $('<p>').addClass('article__categories').text(article.categories);

        return $article.append($title, $summary, $summaryObj, $titleObj, $categories);
    }


}