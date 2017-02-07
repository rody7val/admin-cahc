window.onload = function (){

	var intervalTime = window.setInterval(timeCallback, 1000);

	function timeCallback() {
		var time = moment().locale('es').format('MMMM Do YYYY, h:mm:ss a');
		document.getElementById('time').innerHTML = time;
	}
}