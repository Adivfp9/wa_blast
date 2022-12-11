var otomatis = setInterval(
function () {
	$('#runningprice').load('home/getPrice');
}, 15000);