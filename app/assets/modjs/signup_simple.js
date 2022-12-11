function checkEmail(user) {
	var email = user.value;
	$.ajax({
        type : "POST",
        url  : "home/cek_email",
        dataType : "JSON",
        data : {email: email},
        success: function(data){
        	if (data.success !== true) {
        		user.style.borderColor = badColor;
                document.getElementById("emailError").style.display = "block";
                $('#simple-submit').attr('disabled','disabled');
                return false;
        	} else {
        		user.style.borderColor = goodColor;
                document.getElementById("emailError").style.display = "none";
                $('#simple-submit').removeAttr('disabled');
                return true;
        	}
        }
    });
}

function checkPhone(user) {
	var phone = user.value;
	$.ajax({
        type : "POST",
        url  : "home/cek_hp",
        dataType : "JSON",
        data : {phone: phone},
        success: function(data){
        	if (data.success !== true) {
        		user.style.borderColor = badColor;
                document.getElementById("phoneError").style.display = "block";
                $('#simple-submit').attr('disabled','disabled');
                return false;
        	} else {
        		user.style.borderColor = goodColor;
                document.getElementById("phoneError").style.display = "none";
                $('#simple-submit').removeAttr('disabled');
                return true;
        	}
        }
    });
}

$('#simple-submit').on('click',function() {   	
	var name = $("#name").val();
	var email = $("#email").val();
	// var password = $("#password").val();
    var phone = $("#phone").val();
    var paket = $("#paket").val();
    var tema = $("#tema").val();
    var domain = $("#domain").val();
    $.ajax({
        type : "POST",
        url  : "home/simple_registrasi",
        dataType : "JSON",
        data : {name : name, email: email, phone: phone, paket: paket, tema: tema, domain: domain},
        beforeSend: function () {
            document.getElementById("loadingdaf").style.display = "block";
            // document.getElementById("formnya").style.display = "none";
            $('#simple-submit').attr('disabled','disabled');
        },
        success: function(data){
        	if (data.success !== true) {
        		alert(data.message);
                return false;
        	} else {
        		alert(data.message);
        		// window.location.href = "l-member";
                document.getElementById("successInput").style.display = "block";
                return true;
        	}
        },
        complete:function(data){
            document.getElementById("loadingdaf").style.display = "none";
            // document.getElementById("formnya").style.display = "none";
            $('#simple-submit').removeAttr('disabled');
        }
    });
    return false;
});

