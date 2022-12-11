function convertToRupiah(objek) {
    separator = ".";
    a = objek.value;
    b = a.replace(/[^\d]/g,"");
    c = "";
    panjang = b.length; 
    j = 0; 
    for (i = panjang; i > 0; i--) {
        j = j + 1;
        if (((j % 3) == 1) && (j != 1)) {
            c = b.substr(i-1,1) + separator + c;
        } else {
            c = b.substr(i-1,1) + c;
        }
    }
    objek.value = c;
}   

$('#amount').on('change',function() {
    var amount = this.value.replace(/\./g, "");
    var rate = $("#rate").val();
    var usd = amount/rate;
    $("#amount_get").val(usd);
});

$('#amount_wd').on('change',function() {
    var amount = $("#amount_wd").val();
    var amount = amount.replace(/\./g, "");
    var rate = $("#rate_wd").val();
    var usd = amount*rate;
    $("#amount_get_wd").val(usd);
});

function validAngka(a) {
    if(!/^[0-9.]+$/.test(a.value)) {
        a.value = a.value.substring(0,a.value.length-1000);
    }
}

function copy_data() {
  /* Get the text field */
  var copyText = document.getElementById("referral");

  /* Select the text field */
  copyText.select();
  copyText.setSelectionRange(0, 99999); /*For mobile devices*/

  /* Copy the text inside the text field */
  document.execCommand("copy");
}

function copy_data_bank() {
  /* Get the text field */
  var copyText = document.getElementById("recipient-net");

  /* Select the text field */
  copyText.select();
  copyText.setSelectionRange(0, 99999); /*For mobile devices*/

  /* Copy the text inside the text field */
  document.execCommand("copy");
}

function copytext(text) {
    var textField = document.getElementById("recipient-net");
    textField.innerText = text;
    document.body.appendChild(textField);
    textField.select();
    document.execCommand('copy');
    textField.remove();
    console.log('should have copied ' + text); // but it refuses to do so when a modal is used!
}

$(document).ready( function () {
  $('#table_acct').DataTable();
} );

$('#account_type').change(function(){
  var account_type = $('#account_type').val();
  var type = $("#account_type option:selected").attr("name");
  var lev = $("#account_type option:selected").attr("leverage");
  $('#acct').val(type);
  $('#leverage').val(lev);
  $('#leverage2').html(lev);
});