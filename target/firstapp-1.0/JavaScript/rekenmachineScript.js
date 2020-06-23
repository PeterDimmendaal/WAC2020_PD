var operator = "";
var eerdereGetal = 0;
var huidigeGetal = 0;
var isClicked = 0;

function setHuidigeGetal () {
	eerdereGetal = huidigeGetal;
	huidigeGetal = document.getElementById("display").innerHTML;
	document.getElementById("display").innerHTML = null;
}

function setOperator (clicked_id) {
	operator = document.getElementById(clicked_id).innerHTML;
	eerdereGetal = huidigeGetal;
	huidigeGetal = document.getElementById("display").innerHTML;
	document.getElementById("display").innerHTML = null;
}

function appendGetal (clicked_id) {
	if (isClicked == 1) {
	document.getElementById("display").innerHTML = document.getElementById(clicked_id).innerHTML;
	huidigeGetal = document.getElementById("display").innerHTML;
	isClicked = 0;
	}
	else {
		console.log(document.getElementById(clicked_id));
		document.getElementById("display").innerHTML = document.getElementById("display").innerHTML + document.getElementById(clicked_id).innerHTML;
		huidigeGetal = document.getElementById("display").innerHTML;
	}
}

function equals () {
	if (operator == "*") {
		document.getElementById("display").innerHTML = parseInt(eerdereGetal) * parseInt(huidigeGetal);
	}

	else if (operator == "+") {
		document.getElementById("display").innerHTML = parseInt(eerdereGetal) + parseInt(huidigeGetal);
	}

	else if (operator == "-") {
		document.getElementById("display").innerHTML = parseInt(eerdereGetal) - parseInt(huidigeGetal);
	}

	else if (operator == "/") {
		document.getElementById("display").innerHTML = parseInt(eerdereGetal) / parseInt(huidigeGetal);
	}
	eerdereGetal = huidigeGetal;
	huidigeGetal = document.getElementById("display").innerHTML;
	isClicked = 1;
}

function cleardisplay () {
	document.getElementById("display").innerHTML = "0";
}
