function printout(){
	var x = document.getElementById("text").value;
	console.log(x);
}
var intervalID = setInterval(printout, 5000)