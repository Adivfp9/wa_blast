function validHuruf(a) {
    if(!/^[a-zA-Z _]+$/.test(a.value)) {
        a.value = a.value.substring(0,a.value.length-1000);
    }
}
function validAngka(a) {
    if(!/^[0-9]+$/.test(a.value)) {
        a.value = a.value.substring(0,a.value.length-1000);
    }
}

function validAngkaHuruf(a) {
    if(!/^[a-zA-Z0-9.]+$/.test(a.value)) {
        a.value = a.value.substring(0,a.value.length-1000);
    }
}

var goodColor = "#66cc66";
var badColor = "#A94442";   
function validasiEmail(user) {
    pola_email=/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!pola_email.test(user.value)){
        user.style.borderColor = badColor;
        document.getElementById("emailValidasi").style.display = "block";
        $('#daftarb').attr('disabled','disabled');
        return false;
    }
    user.style.borderColor = goodColor;
    document.getElementById("emailValidasi").style.display = "none";
    $('#daftarb').removeAttr('disabled');
    return (true);
}