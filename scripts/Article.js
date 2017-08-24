/*
REQUIRES:
commonWords.js
Tiny JavaScript tokenizer.js
PorterStemmer2.min.js
levenshtein.min.js
*/
class Article {
    constructor(articleEntry) {
        this.articleEntry = articleEntry;
        
        this.summaryObj = Article.constructWordObjOf(articleEntry.summary);
        this.titleObj = Article.constructWordObjOf(articleEntry.title);
    }

    static constructWordObjOf(string) {
        let words = {};

        string = string.toLowerCase();

        let tokenizedWords = Article.tokenize(string);

        tokenizedWords = Article.filterTokenizedWordsFor('word', tokenizedWords);

        tokenizedWords = Article.stemTokenizedWords(tokenizedWords);

        words = Article.tokenizedWordsToWordObj(tokenizedWords);

        words = Article.removeCommonWordsFromWordsObj(words);

        words = Article.removeWordsWithWordCountLessThan(2, words);

        return words;
    }

    static tokenize(string) {
        return tokenize(string, { word:/\w+/, whitespace:/\s+/, punctuation:/[^\w\s]/}, 'invalid');
    }

    static filterTokenizedWordsFor(type, tokenizedWords) {
        return tokenizedWords.filter( (obj) => obj.type === type );
    }

    static stemTokenizedWords(tokenizedWords) {
        return tokenizedWords.map( (obj) => stemmer(obj.token) );
    }

    static removeCommonWordsFromWordsObj(wordsObj) {
        commonWords.forEach( (word) => {
            if (word in wordsObj) {
                delete wordsObj[word];
            }
        });

        return wordsObj;
    }

    static removeWordsWithWordCountLessThan(count, wordsObj) {
        for(let word in wordsObj) {
            if (wordsObj[word] < count) {
                delete wordsObj[word];
            }
        }

        return wordsObj;
    }

    static totalWordCountOfWordsObj(wordsObj) {
        let sum = 0;
        for ( let word in wordsObj ) {
            sum += wordsObj[word];
        }
    
        return sum;
    }

    static tokenizedWordsToWordObj(tokenizedWords) {
        const words = {};

        for (let word of tokenizedWords) {
            if ( !(word in words) ) {
                words[word] = 1;
            } else {
                words[word]++;
            }
        }

        return words;
    }
}