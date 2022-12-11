$('#bank_name').change(function(){
    var type = $('#bank_name').val();
    $.ajax({
		type: "POST",
		url: 'rent/network',
		dataType: "JSON",
		data: {
			type: type
		},
		success: function(data) {
            $('#recipient-net').val(data.message);
		}
	});
});


$('#acc').change(function(){
    var acc = $('#acc').val();
    $.ajax({
		type: "POST",
		url: 'rent/get_provider',
		dataType: "JSON",
		data: {
			acc: acc
		},
		success: function(data) {
		  //  alert(data);
		    $('#provider').val(data.message.provider);
		    $('#provider_id').val(data.message.id);
		}
	});
});