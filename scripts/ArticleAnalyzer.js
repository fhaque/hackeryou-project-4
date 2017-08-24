class ArticleAnalyzer {
    constructor () {

    }


/*************** Sorting-related Functions ******************/
    static sortToBins(articleArray) {
        

        return bins;
    }




/*************** Distance-related functions ******************/

    static distance(a,b) {
        let titleDistance = ArticleAnalyzer.distanceBetweenWordsObj(a.titleObj, b.titleObj);

        let summaryDistance = ArticleAnalyzer.distanceBetweenWordsObj(a.summaryObj, b.summaryObj);

        if ( isNaN(titleDistance) || !isFinite(titleDistance) ) {
            titleDistance = 0;
        }

        return summaryDistance - titleDistance;

    }

    static distanceBetweenWordsObj(a,b) {

        let aKeys = Object.keys(a);
        let bKeys = Object.keys(b);
        let tempKeys;
        let tempObj;
        
    
        //a should be the smaller of the 2.
        if ( aKeys.length > bKeys.length ) {
            tempKeys = bKeys;
            bKeys = aKeys;
            aKeys = tempKeys;
    
            tempObj = b;
            b = a;
            a = tempObj;
        }
    
        const sumWordCount = Article.totalWordCountOfWordsObj(a) + Article.totalWordCountOfWordsObj(b);
    
        let tempKey;
        let sumDistance = 0;
        for (let i = 0; i < aKeys.length; i++) {
            tempKey = aKeys[i];
            let minDistance = Infinity;
            let minDistanceWordCount = 0;
            let currDistance;
    
            //find minimum word similarity distance
            for (let j = 0; j < bKeys.length; j++) {
                currDistance = Levenshtein.get(tempKey, bKeys[j]);
                if ( currDistance < minDistance ) {
                    minDistance = currDistance;
                    minDistanceWordCount = a[tempKey] + b[ bKeys[j] ];
                }
            }
    
            sumDistance += minDistance * (minDistanceWordCount / sumWordCount);
        }
    
        let score = 100 * (sumDistance / aKeys.length);
    
        if ( score === NaN ) {
            score = Infinity;
        }
    
        return score;
    }


}