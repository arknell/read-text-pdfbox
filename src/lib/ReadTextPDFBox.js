/**
 *
 * @author ChanWoo Kwon
 * date : 2018-04-04
 */


class ReadTextPDFBox {
	constructor() {
		let fs = require('fs');
		this.java = require('java');
		var baseDir = __dirname + '/jar';
		var dependencies = fs.readdirSync(baseDir);
		
		dependencies.forEach((dependency) => {
			this.java.classpath.push(baseDir + "/" + dependency);
		});
		this.java.import('java.io.File');
		this.java.import('java.io.StringWriter');
	}
	
	read(path) {
		let file = this.java.newInstanceSync('java.io.File', path);
		let writer = this.java.newInstanceSync('java.io.StringWriter');
		let doc = this.java.callStaticMethodSync("org.apache.pdfbox.pdmodel.PDDocument", "load", file);
		let stripper = this.java.newInstanceSync('org.apache.pdfbox.text.PDFTextStripper');
		stripper.setStartPageSync(1);
		stripper.writeTextSync(doc, writer);
		
		doc.closeSync();
		writer.closeSync();
		
		return writer.toStringSync();
	}
}

module.exports = ReadTextPDFBox;