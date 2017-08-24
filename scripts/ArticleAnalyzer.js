class ArticleAnalyzer {
    constructor() {

    }


    /*************** Sorting-related Functions ******************/
    static sortToBins(articleArray, distanceThreshold) {
        const bins = [];

        bins.push([articleArray[0]]);

        //i counter: loop through each article
        article_loop:
        for ( let i = 1; i < articleArray.length; i++ ) {

            //j counter: loop through each bin
            bins_loop:
            for( let j = 0; j < bins.length; j++ ) {
                    //compare distance of current article with the first
                    //article in a bin.
                    const distance = ArticleAnalyzer.distance(bins[j][0], articleArray[i]);

                    console.log(distance);

                    //if article meets distanceThreshold, push into bin
                    //and move on to next article
                    if (distance < distanceThreshold) {
                        // console.log('within bin threshold');
                        bins[j].push(articleArray[i]);
                        continue article_loop;
                    }
            }

            //if the article hasn't been pushed into a bin,
            // a new bin is created.
            bins.push( [ articleArray[i] ] );


        }
        
        return bins;
    }




    /*************** Distance-related functions ******************/

    static distance(a, b) {
        let titleDistance = ArticleAnalyzer.distanceBetweenWordsObj(a.titleObj, b.titleObj);

        // let titleDistance = 0;

        let summaryDistance = ArticleAnalyzer.distanceBetweenWordsObj(a.summaryObj, b.summaryObj);

        if (isNaN(titleDistance) || !isFinite(titleDistance)) {
            titleDistance = 0;
        }

        return summaryDistance - 0.1 * titleDistance;

    }

    static distanceBetweenWordsObj(a, b) {

        let aKeys = Object.keys(a);
        let bKeys = Object.keys(b);
        let tempKeys;
        let tempObj;


        //a should be the bigger of the 2.
        if (aKeys.length < bKeys.length) {
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
                if (currDistance < minDistance) {
                    minDistance = currDistance;
                    minDistanceWordCount = a[tempKey] + b[bKeys[j]];
                }
            }

            sumDistance += minDistance * (minDistanceWordCount / sumWordCount);
        }

        let score = 100 * (sumDistance / aKeys.length);

        if (score === NaN) {
            score = Infinity;
        }

        return score;
    }


}