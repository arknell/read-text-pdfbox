/**
 *
 * @author ChanWoo Kwon
 * date : 2018-04-04
 */

let fs = require('fs');
let java = require('java');
var baseDir = __dirname + '/jar';
var dependencies = fs.readdirSync(baseDir);

dependencies.forEach(function(dependency){
	java.classpath.push(baseDir + "/" + dependency);
});

class ReadTextPDFBox {
	constructor() {
		java.import('java.io.File');
		java.import('java.io.StringWriter');
	}
	
	read(path) {
		let file = java.newInstanceSync('java.io.File', path);
		let writer = java.newInstanceSync('java.io.StringWriter');
		let doc = java.callStaticMethodSync("org.apache.pdfbox.pdmodel.PDDocument", "load", file);
		let stripper = java.newInstanceSync('org.apache.pdfbox.text.PDFTextStripper');
		stripper.setStartPageSync(1);
		stripper.writeTextSync(doc, writer);
		
		return writer.toStringSync();
	}
}

module.exports = ReadTextPDFBox;