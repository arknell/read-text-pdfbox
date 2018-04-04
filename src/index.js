/**
 *
 * @author ChanWoo Kwon
 * date : 2018-04-04
 */

let pdfbox = require('./lib/ReadTextPDFBox');
let fs = require('fs');

module.exports = (existJava) => {
	let java = existJava || require('java');
	var baseDir = __dirname + '/lib/jar';
	var dependencies = fs.readdirSync(baseDir);
	
	dependencies.forEach((dependency) => {
		java.classpath.push(baseDir + "/" + dependency);
	});
	
	return new pdfbox(existJava);
};