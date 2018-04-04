/**
 *
 * @author ChanWoo Kwon
 * date : 2018-04-04
 */

let cb = (txt) => {
	
	console.log(txt);
	
};

let rr = require('../dist');

let tt = new rr();

let res = tt.read('z://Earlgae2014/01/78/017801/quizdata/2018/03/30/DF0B2F3A7BAA4B5BBA2A636E19A9D346/_205-Economist.pdf');
return cb(res);