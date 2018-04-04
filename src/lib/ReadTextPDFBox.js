/**
 *
 * @author ChanWoo Kwon
 * date : 2018-04-04
 */


class ReadTextPDFBox {
	constructor(java) {
		let fs = require('fs');
		this.java = java || require('java');
		var baseDir = __dirname + '/jar';
		var dependencies = fs.readdirSync(baseDir);
		
		dependencies.forEach((dependency) => {
			this.java.classpath.push(baseDir + "/" + dependency);
		});
	}
	
	readAsync(path) {
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
	
	read(path) {
		let file = this.java.newInstanceSync('java.io.File', path);
		let writer = this.java.newInstanceSync('java.io.StringWriter');
		let doc = this.java.callStaticMethodSync("org.apache.pdfbox.pdmodel.PDDocument", "load", file);
		let stripper = this.java.newInstanceSync('org.apache.pdfbox.text.PDFTextStripper');
		return new Promise((resolve, reject) => {
			return stripper.setStartPage(1, (err) => {
				if (err)
					return reject(err);
				
				return stripper.writeText(doc, writer, (err) => {
					doc.closeSync();
					writer.closeSync();
					resolve(writer.toStringSync());
				})
			});
		});
	}
}

module.exports = ReadTextPDFBox;