/**
 *
 * @author ChanWoo Kwon
 * date : 2018-04-04
 */

let analyzer = require("node-twitter-korean-text");
let java = require('../node_modules/node-twitter-korean-text/node_modules/java');
let rr = require('../src')(java);

analyzer.tokenize("반가워요")
.then((tokens) => {
	return analyzer.tokensToJsonArray(tokens, false);
})
.then((result) => {
	let co_occurrence = [];
	for (let index in result) {
		let token = result[index];

		if (token.koreanPos == "Noun" || token.koreanPos == "Adjective" || token.koreanPos == "ProperNoun") {
			if (co_occurrence.hasOwnProperty(token.text)) {
				co_occurrence[token.text].count++;
			} else {
				co_occurrence[token.text] = {
					count: 1
				}
			}
		}
	}

	let send_message = "";

	for (let text in co_occurrence) {
		send_message += text + ":" + (co_occurrence[text].count * 10) + " ";
	}
	console.log(result);
	
	rr.read('z://Earlgae2014/01/78/017801/quizdata/2018/03/30/DF0B2F3A7BAA4B5BBA2A636E19A9D346/_205-Economist.pdf')
	.then((res) => {
		console.log(res);
	});
})
.catch((err) => {
	console.log(err);
});