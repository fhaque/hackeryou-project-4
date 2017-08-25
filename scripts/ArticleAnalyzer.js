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

    //TODO: Don't know why adding 3rd for loop below (uncomment)
    //breaks entire app.
    static sortToBinsKNN(articleArray, iterationLimit) {
        
        //assignment step
        let minError = Infinity;
        let bestBins = [];
        for (let k = 1; k <= 10; k++ ) {
            let currError = 0;

            let bins = [];
            for (let i = 0; i < k; i++) {
                bins.push([]);
            }

            //articles in random bins
            for(let i = 0; i < articleArray.length; i++) {
                bins[Math.floor(Math.random() * k)].push(articleArray[i]);
            }

            // console.log(bins);

            for (let i = 0; i < iterationLimit; i++) {
                currError = 0;
                let newBins = [];
                for (let j = 0; j < k; j++) {
                    newBins.push([]);
                }

                
                for(let j=0; j < articleArray.length; j++) {
                    let minDistance = Infinity;
                    let minIndex = 0;
                    // for (let h = 0; h < k; i++) {
                        // console.log(articleArray[j]);
                        // let currDistance = ArticleAnalyzer.clusterDistance(articleArray[j], bins[h]);

    //                     if (currDistance < minDistance) {
    //                         minIndex = h;
    //                         minDistance = currDistance;

    //                     }
                    // }
                    
    //                 newBins[minIndex].push(articleArray[j]);
    //                 currError += minDistance;
                }

    //             bins = newBins;

    //             console.log(bins);
                
            }

            
    //         if (currError < minError) {
    //             bestBins = bins;
    //             minError = currError;
    //         }
            
        }
    //     console.log(bestBins);
    //     return bestBins;

    }

    static clusterDistance(article, articleArray) {
        let sum = 0;
        for (let i=0; i < articleArray.length; i++) {
            sum += ArticleAnalyzer.distance(article, articleArray[i]);
        }

        return sum;
    }


    /*************** Distance-related functions ******************/

    static distance(a, b) {
        let titleDistance = ArticleAnalyzer.distanceBetweenWordsObj(a.titleObj, b.titleObj);

        // let titleDistance = 0;

        let summaryDistance = ArticleAnalyzer.distanceBetweenWordsObj(a.summaryObj, b.summaryObj);

        if (isNaN(titleDistance) || !isFinite(titleDistance)) {
            titleDistance = 0;
        }

        let categoryScore = ArticleAnalyzer.scoreBetweenCategories(a.categories, b.categories);

        return summaryDistance + 0.2 * titleDistance - 80 * categoryScore;

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
        //TODO: similar string check
        // for (let i = 0; i < aKeys.length; i++) {
        //     tempKey = aKeys[i];
        //     let minDistance = Infinity;
        //     let minDistanceWordCount = 0;
        //     let currDistance;

        //     //find minimum word similarity distance
        //     for (let j = 0; j < bKeys.length; j++) {
        //         currDistance = Levenshtein.get(tempKey, bKeys[j]);
        //         if (currDistance < minDistance) {
        //             minDistance = currDistance;
        //             minDistanceWordCount = a[tempKey] + b[bKeys[j]];
        //         }
        //     }

        //     sumDistance += minDistance * (minDistanceWordCount / sumWordCount);
        // }

        // let score = 100 * (sumDistance / aKeys.length);
        
        // if (score === NaN) {
        //     score = Infinity;
        // }

        for (let i = 0; i < aKeys.length; i++) {
            if ( !(aKeys[i] in b) ) {
                sumDistance += 1;
            }
        }

        let score = 100 * (sumDistance / aKeys.length);
        
        if (score === NaN) {
            score = Infinity;
        }

        return score;
    }

    static scoreBetweenCategories(a, b) {
        let temp;

        //make sure a is the smallest
        if (a.length > b.length) {
            temp = b;
            b = a;
            a = temp;
        }

        let score = 0;

        for (let i=0; i < a.length; i++) {
            if ( b.includes(a[i]) ) {
                score += 1;
            }
        }

        return score;

    }


}
