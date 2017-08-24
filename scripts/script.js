// const article1 = {};

// article1.summary = `We propose a strategy to measure weak static magnetic fields with nitrogen-vacancy color center in diamond. Inspired by avian magnetoreception models, we consider the feasibility of utilizing quantum coherence phenomena to measure weak static magnetic fields. Nitrogen-vacancy (NV) color centers are regarded as the ideal platform to study quantum sciences as a result of its long coherence time up to a millisecond timescale. In high-purity diamond, hyperfine interaction with 13C nuclear spins dominates the decoherence process. In this paper, we numerically simulate the decoherence process between 0 and +1 of the individual NV color center spin in 13C nuclear baths with various of magnitudes of external magnetic fields. By applying Hahn echo into the system, we obtain the coherence of NV color center spin as a function of total evolution time and magnetic field. Furthermore we obtain the high-accuracy relationship between the three decoherence-characteristic timescales, i.e. T_W, T_R, T_2, and magnetic field B. And we draw a conclusion that T_R has the highest sensitivity about magnetic field among the three time-scales. Thus, for a certain NV color center, T_R can be the scale for the magnitude of magnetic field, or rather, the component along the NV electronic spin axis. When measuring an unknown magnetic field, we adjust the NV axis to three mutually orthogonal directions respectively. By this means, we obtain the three components of the magnetic field and thus the magnitude and direction of the actual magnetic field. The accuracy could reach 60 nT/Hz^{1/2},and could be greatly improved by using an ensemble of NV color centers or diamond crystals purified with 12C atoms.`;

// article1.title = `Proton-ring and Electron-linac Collider (PRELC) as a (first)
// TeV-rangeelectron-proton or photon-proton collider`

const xmlConverter = new X2JS();
const listOfArticles = [];

commonWords = commonWordString.split('\n');

	$.ajax({
	url: 'http://export.arxiv.org/api/query?search_query=nitrogen+AND+vacancy',
	dataType: 'xml',
	method:'GET',
	// data: {
	// 	'search_query': "all:electron+AND+all:proton",
	// },
    }).then(function(res) {
		console.log(res);
        
        xmlConverter.xml2json(res).feed.entry.forEach( (article) => {
            listOfArticles.push( new Article(article) );
        });

		console.log(listOfArticles);

		const bins = ArticleAnalyzer.sortToBins(listOfArticles, 4);

		for (let i = 0; i < bins.length; i++) {
			const $bin = App.createDomArticleBin(bins[i]);
			$('body').append($bin);
		}
		
		// console.log( ArticleAnalyzer.sortToBins(listOfArticles, 6) );
		
		// console.log(xmlConverter.xml2json(res).feed.entry);
	});

// console.log(new Article(article1));