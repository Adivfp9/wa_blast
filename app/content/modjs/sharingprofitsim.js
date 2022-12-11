var DataTable = $('#datatabletrade').DataTable({
    
    'stateSave': false,
    'autoWidth': false,
    'responsive': true,
    'processing': true,
    'serverSide': true,
    'paging': false,
    "bLengthChange" : false, //thought this line could hide the LengthMenu
    "bInfo":false,    
    "searching": false,
    'ajax': {
        'type': 'POST',
        'url': admin_url + a_mod + '/load_comm_trader'
    }
});



function edit_comm_trader(id) {
    $.ajax({
        url: admin_url + a_mod + '/get_comm_trader/'+id,
        type: 'POST',
        dataType: 'json',
        contentType: false,
        processData:false,
        cache: false,
        success:function(response){
            if (response['success']==true) {
                var data = response['data'];
                $('#id_trader').val(id);
                $('#min_balance_trader').val(data['start_balance']);
                $('#max_balance_trader').val(data['end_balance']);
                $('#persen_comm_trader').val(data['commission']);
                $('.title-comm-trader').html("Edit Commission Trader");
            } else {
                // cfNotif(response['alert']);
                // $('.submit_add').find('i').removeClass().addClass('fa fa-check mr-2');
            }
            
            
            // cfNotif(response['alert']);
            // $('.submit_update_identity').find('i').removeClass().addClass('fa fa-save mr-2');
        }
    })
}


$('#form_comm_trader').on('submit', function(event) {
    event.preventDefault();
    var form = $('#form_comm_trader');
    // alert();
    $.ajax({
        url: admin_url + a_mod + '/trader_add_new',
        type: 'POST',
        data: form.serialize(),
        dataType: 'json',
        cache: false,
        success: function(data) {
            if (data['success'] == true) {
                $(location).attr('href', admin_url + a_mod);
            } else {
                cfNotif(data['alert']);
                // $('.submit_add').find('i#submit_icon').removeClass().addClass('fa fa-check mr-2');
            }
        }
    })
    return false;
});




var DataTable1 = $('#datatablenetwork').DataTable({
    
    'stateSave': false,
    'autoWidth': false,
    'responsive': true,
    'processing': true,
    'serverSide': true,
    'paging': false,
    "bLengthChange" : false, //thought this line could hide the LengthMenu
    "bInfo":false,    
    "searching": false,
    'ajax': {
        'type': 'POST',
        'url': admin_url + a_mod + '/load_comm_network'
    }
});

function edit_comm_network(id) {
    $.ajax({
        url: admin_url + a_mod + '/get_comm_network/'+id,
        type: 'POST',
        dataType: 'json',
        contentType: false,
        processData:false,
        cache: false,
        success:function(response){
            if (response['success']==true) {
                var data = response['data'];
                $('#id_network').val(id);
                $('#name_network').val(data['name']);
                $('#persen_comm_network').val(data['commission']);
                $('.title-comm-network').html("Edit Commission Network");
            } else {
                // cfNotif(response['alert']);
                // $('.submit_add').find('i').removeClass().addClass('fa fa-check mr-2');
            }
            
            
            // cfNotif(response['alert']);
            // $('.submit_update_identity').find('i').removeClass().addClass('fa fa-save mr-2');
        }
    })
}

$('#form_comm_network').on('submit', function(event) {
    event.preventDefault();
    var form = $('#form_comm_network');
    // alert();
    $.ajax({
        url: admin_url + a_mod + '/network_add_new',
        type: 'POST',
        data: form.serialize(),
        dataType: 'json',
        cache: false,
        success: function(data) {
            if (data['success'] == true) {
                $(location).attr('href', admin_url + a_mod);
            } else {
                cfNotif(data['alert']);
                // $('.submit_add').find('i#submit_icon').removeClass().addClass('fa fa-check mr-2');
            }
        }
    })
    return false;
});


var DataTable2 = $('#datatableleaderpool').DataTable({
    
    'stateSave': false,
    'autoWidth': false,
    'responsive': true,
    'processing': true,
    'serverSide': true,
    'paging': false,
    "bLengthChange" : false, //thought this line could hide the LengthMenu
    "bInfo":false,    
    "searching": false,
    'ajax': {
        'type': 'POST',
        'url': admin_url + a_mod + '/load_comm_leader'
    }
});

function edit_comm_leader(id) {
    $.ajax({
        url: admin_url + a_mod + '/get_comm_leader/'+id,
        type: 'POST',
        dataType: 'json',
        contentType: false,
        processData:false,
        cache: false,
        success:function(response){
            if (response['success']==true) {
                var data = response['data'];
                $('#id_leader').val(id);
                $('#name_leader').val(data['name']);
                $('#count_leader').val(data['count']);
                $('#persen_comm_leader').val(data['commission']);
                $('.title-comm-leader').html("Edit Commission Leader Pool");
            } else {
                // cfNotif(response['alert']);
                // $('.submit_add').find('i').removeClass().addClass('fa fa-check mr-2');
            }
            
            
            // cfNotif(response['alert']);
            // $('.submit_update_identity').find('i').removeClass().addClass('fa fa-save mr-2');
        }
    })
}

$('#form_comm_leader').on('submit', function(event) {
    event.preventDefault();
    var form = $('#form_comm_leader');
    // alert();
    $.ajax({
        url: admin_url + a_mod + '/leader_add_new',
        type: 'POST',
        data: form.serialize(),
        dataType: 'json',
        cache: false,
        success: function(data) {
            if (data['success'] == true) {
                $(location).attr('href', admin_url + a_mod);
            } else {
                cfNotif(data['alert']);
                // $('.submit_add').find('i#submit_icon').removeClass().addClass('fa fa-check mr-2');
            }
        }
    })
    return false;
});


var DataTable3 = $('#datatablecompany').DataTable({
    
    'stateSave': false,
    'autoWidth': false,
    'responsive': true,
    'processing': true,
    'serverSide': true,
    'paging': false,
    "bLengthChange" : false, //thought this line could hide the LengthMenu
    "bInfo":false,    
    "searching": false,
    'ajax': {
        'type': 'POST',
        'url': admin_url + a_mod + '/load_comm_company'
    }
});


function edit_comm_company(id) {
    $.ajax({
        url: admin_url + a_mod + '/get_comm_company/'+id,
        type: 'POST',
        dataType: 'json',
        contentType: false,
        processData:false,
        cache: false,
        success:function(response){
            if (response['success']==true) {
                var data = response['data'];
                $('#id_company').val(id);
                $('#persen_comm_company').val(data['commission']);
                $('.title-comm-company').html("Edit Commission Company");
            } else {
                // cfNotif(response['alert']);
                // $('.submit_add').find('i').removeClass().addClass('fa fa-check mr-2');
            }
            
            
            // cfNotif(response['alert']);
            // $('.submit_update_identity').find('i').removeClass().addClass('fa fa-save mr-2');
        }
    })
}

$('#form_comm_company').on('submit', function(event) {
    event.preventDefault();
    var form = $('#form_comm_company');
    // alert();
    $.ajax({
        url: admin_url + a_mod + '/company_add_new',
        type: 'POST',
        data: form.serialize(),
        dataType: 'json',
        cache: false,
        success: function(data) {
            if (data['success'] == true) {
                $(location).attr('href', admin_url + a_mod);
            } else {
                cfNotif(data['alert']);
                // $('.submit_add').find('i#submit_icon').removeClass().addClass('fa fa-check mr-2');
            }
        }
    })
    return false;
});


$('#form_proses_com').on('submit', function(event) {
    event.preventDefault();
    var form = $('#form_proses_com');
    // alert();
    $.ajax({
        url: admin_url + a_mod + '/proses_commission',
        type: 'POST',
        data: form.serialize(),
        dataType: 'json',
        cache: false,
        success: function(data) {
            if (data['success'] == true) {
                $('.hasil-proses').html(data['data']);
            } else {
                cfNotif(data['alert']);
                // $('.submit_add').find('i#submit_icon').removeClass().addClass('fa fa-check mr-2');
            }
        }
    })
    return false;
});
