"use strict";var pdfbox=require("./lib/ReadTextPDFBox"),fs=require("fs");module.exports=function(r){var e=r||require("java"),a=__dirname+"/lib/jar";return fs.readdirSync(a).forEach(function(r){e.classpath.push(a+"/"+r)}),new pdfbox(r)};