//similer to Navigation.js - add functions and variables similer to original!

var utilities = new Utilities();
function Utilities() {

	this.x2js = new X2JS();
	this.loadXMLDoc = loadXMLDoc;
	this.isPasswordApp = false;
	this.inputNumber2Time = inputNumber2Time;
	this.emailValidation = emailValidation; //public, function: 
	this.inputNumber2numberWithCommas = inputNumber2numberWithCommas; //public, function: number2numberWithCommas.
	this.number2numberWithComma = number2numberWithComma;
	this.numberWithCommas2number = numberWithCommas2number;
	this.isInt = isInt; //public, function: isInt
	this.isEmpty = isEmpty; //public, function: isEmpty
	this.strToNumberStr = strToNumberStr;
	this.parseDateStrToDDMMYYYY = parseDateStrToDDMMYYYY;
	this.validateId = validateId;
	this.isMobile = isMobile;
	this.isAndroid = isAndroid;
	this.isIphone = isIphone;
	this.isIpad = isIpad;
	this.dateToyyyymmdd = dateToyyyymmdd;
	this.isAndroidTablet = isAndroidTablet;    
	this.isIos7 = function () {
		if (this.isIphone() && window.device && parseFloat(window.device.version) >= 7) {
			return true;
		}
		else {
			return false;
		}
	}
	
	this.isIos7orAbove = function () {
		if (/iP(hone|od|ad)/.test(navigator.platform)) {
			 var v = (navigator.appVersion).match(/OS (\d+)_(\d+)_?(\d+)?/);
			    var ver = [parseInt(v[1], 10), parseInt(v[2], 10), parseInt(v[3] || 0, 10)][0];
			    if (ver >= 7) {
			    	  return true;
			    	}
			    else
			    	return false;
		}
		else {
			return false;
		}
	}

    
	this.getCDataValue = getCDataValue;

	//convert number to time e.g. 305 -> 03:05
	function inputNumber2Time(number) {
		switch (number.toString().length) {
		case 1:
			return "00:0" + number.toString();
			break;
		case 2:
			return "00:" + number.toString();
			break;
		case 3:
			return "0" + number.toString()[0]+":" + number.toString()[1]+ number.toString()[2];
			break;
		case 4:
			return number.toString()[0]+ number.toString()[1]+":" + number.toString()[2]+ number.toString()[3];
			break;
		default:
			break;
		}
	}

	//Check if running in mobile device
	function isMobile() {
		if (navigator.userAgent.indexOf("Android") != -1 || navigator.userAgent.indexOf("iPhone") != -1)
			return true;
		else
			return false;
	}
	//Check if running in iPhone device
	function isIphone() {
		if (navigator.userAgent.indexOf("iPhone") != -1)
			return true;
		else
			return false;
	}

	//Check if running in iPad device
	function isIpad() {
		if (navigator.userAgent.match(/iPad/i) != null)
			return true;
		else
			return false;
	}



	//Check if running in Android Tablet device
	function isAndroidTablet() {
		if (navigator.userAgent.match(/iPad/i) != null)
			return true;
		else
			return false;
	}


	//Check if running in Android device
	function isAndroid() {
		if (navigator.userAgent.indexOf("Android") != -1)
			return true;
		else
			return false;
	}

	this.prefixes = [
	                 { value: '050' },
	                 { value: '052' },
	                 { value: '053' },
	                 { value: '054' },
	                 { value: '055' },
	                 { value: '057' },
	                 { value: '058' }
	                 ];

	this.getIndexOfPrefixe = function (pref) {
		var i = 0;

		for (i = 0; i < this.prefixes.length; i++) {
			if (pref == this.prefixes[i].value) {
				return i;
			}
		}
		return -1;
	}
	function getBaseURL() {
		return amexUtilities.baseUrl;
	}




	//converts input's number to number with commas (work while typing the number).
	function inputNumber2numberWithCommas(input) {
		var nStr = input.value;

		nStr += '';
		nStr = nStr.replace(/,/g, '');

		x = nStr.split('.');
		x1 = x[0];
		x2 = x.length > 1 ? '.' + x[1] : '';
		var rgx = /(\d+)(\d{3})/;
		while (rgx.test(x1))
			x1 = x1.replace(rgx, '$1' + ',' + '$2');

		input.value = x1 + x2;
	}

	function number2numberWithComma(num) {
		var nStr = num.toString();

		nStr += '';
		nStr = nStr.replace(/,/g, '');

		x = nStr.split('.');
		x1 = x[0];
		x2 = x.length > 1 ? '.' + x[1] : '';
		var rgx = /(\d+)(\d{3})/;
		while (rgx.test(x1))
			x1 = x1.replace(rgx, '$1' + ',' + '$2');

		return x1 + x2;    
	}

	//convert number with commas to float
	function numberWithCommas2number(str) {
		return str.replace(/,/g, '');
	}

	//remove


	//remove letters from string.
	//ex. amex3456 -> 3456.
	function strToNumberStr(str) {
		return str.replace(/^\D+/g, '');
	}


	/*email field validation*/
	function emailValidation() {
		var reg = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/
			if (reg.test(email)) {
				return true;
			}
			else {
				return false;
			}
	}

	//check if number is INT
	function isInt(value) {
		for (i = 0; i < value.length; i++) {
			if ((value.charAt(i) < '0') || (value.charAt(i) > '9')) { return false; }
		}

		return true;
	}

	function isEmpty(value) {
		if (value == '') {
			return true;
		}
		else {
			return false;
		}
	}

	this.formatDateNumber = function (value) {
		if (value < 10)
			return '0' + value;
		else
			return value.toString();
	}

	this.getHebrewDate = function (dateString) {
		date = new Date(dateString)
		var result;
		result = this.formatDateNumber(date.getDate()).toString() + ' ב' +
		this.getHebrewMonth(date.getMonth() + 1) + ' ' +
		date.getFullYear().toString();
		return result;
	}
	function getCDataValue(obj,index) {
		var result = "";
		if (obj != null) {
			if (index) {
				result = obj;
			} else {                
				result = obj[cdataStr];
			}
		}
		return result;
	}

	this.getHebrewMonth = function (month) {
		var result = '';
		switch (month) {
		case 1:
			result = 'ינואר';
			break;
		case 2:
			result = 'פברואר';
			break;
		case 3:
			result = 'מרץ';
			break;
		case 4:
			result = 'אפריל';
			break;
		case 5:
			result = 'מאי';
			break;
		case 6:
			result = 'יוני';
			break;
		case 7:
			result = 'יולי';
			break;
		case 8:
			result = 'אוגוסט';
			break;
		case 9:
			result = 'ספטמבר';
			break;
		case 10:
			result = 'אוקטובר';
			break;
		case 11:
			result = 'נובמבר';
			break;
		case 12:
			result = 'דצמבר';
			break;
		default:
			break;
		}
		return result;
	}


	function validateId(num) {
		var tot = 0;
		var tz = new String(num);
		for (i = 0; i < 8; i++) {
			x = (((i % 2) + 1) * tz.charAt(i));
			if (x > 9) {
				x = x.toString();
				x = parseInt(x.charAt(0)) + parseInt(x.charAt(1))
			}
			tot += x;
		}

		if ((tot + parseInt(tz.charAt(8))) % 10 == 0) {
			return true;
		} else {
			return false;
		}
	}

	/* This func parse string date
    input: '/Date(1359025200000+0200)/'
    output: 09.05.2013 */

	/* This func parse string date
    input: "2013-12-23T23:59:00"
    output: 09.05.2013 */
	function parseDateStrToDDMMYYYY(strDateNumber) {
		var returnStr = "";
		var date;
		if (strDateNumber.indexOf("Date") != -1) {
			strDateNumber = strDateNumber.substring(6, 24);
			date = new Date(parseInt(strDateNumber));
		} else {
			date = new Date(strDateNumber);
		}
		returnStr = "" + convertOneNumberTOTwo(date.getUTCDate()) + "." + convertOneNumberTOTwo((date.getUTCMonth() + 1)) + "." + date.getUTCFullYear();

		return returnStr;
	}
	function parseDateFromKitlocateStrToDDMMYYYY(strDateNumber) {
		var returnStr = "";
		var date;
		if (strDateNumber.indexOf(" ") != -1) {
			var d = strDateNumber.substring(0, 2);
			var m = strDateNumber.substring(3, 5);
			var y = strDateNumber.substring(6, 10);
			var time = strDateNumber.substring(11);
			strDateNumber = y + "-" + m + "-" + d + "T" + time;
			date = new Date(strDateNumber);
		} else {
			date = new Date(strDateNumber);
		}
		returnStr = "" + convertOneNumberTOTwo(date.getUTCDate()) + "." + convertOneNumberTOTwo((date.getUTCMonth() + 1)) + "." + date.getUTCFullYear();

		return returnStr;
	}

	function convertOneNumberTOTwo(number) {
		number = "" + number;

		if (number.length == 1)
			number = "0" + number;

		return number;
	}

	function loadXMLDoc(filename)
	{
		if (window.XMLHttpRequest)
		{
			xhttp=new XMLHttpRequest();
		}
		else // code for IE5 and IE6
		{
			xhttp=new ActiveXObject("Microsoft.XMLHTTP");
		}
		xhttp.open("GET",filename,false);
		xhttp.send();
		return xhttp.responseXML;
	}
	
	function dateToyyyymmdd(date)
	{
			var yyyy = date.getFullYear().toString();
		   var mm = (date.getMonth()+1).toString(); // getMonth() is zero-based
		   var dd  = date.getDate().toString();
		   return yyyy +"-" +(mm[1]?mm:"0"+mm[0]) +"-"+ (dd[1]?dd:"0"+dd[0]); // padding
	}
}


