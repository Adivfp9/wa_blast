var DataTable = $('#DataTable').DataTable({
    'language': {
        'url': datatable_lang,
    },
    'stateSave': false,
    'autoWidth': false,
    'responsive': false,
    'processing': true,
    'serverSide': true,
    'order': [
        //[1, 'desc']
    ],
    'columnDefs': [
        { 'targets': 'no-sort', 'orderable': false, 'searchable': false },
        { 'targets': 'th-action', 'orderable': false, 'searchable': false },
        { 'targets': [0], 'width': '20px' }
    ],
    'lengthMenu': [
        [10, 30, 50, 100, -1],
        [10, 30, 50, 100, 'All']
    ],
    'ajax': {
        'type': 'POST',
        'url': window.location.href
    },
    'drawCallback': function(settings) {
        var api_table = this.api();
        dataTableDrawCallback(); // standard setting

        $('.delete_single').on('click', function(i) {
            var data_pk = [];
            data_pk = [$(this).attr('data-pk')];
            $('.noty_layout').remove(); // close jsnotif
            cfSwalDelete(data_pk, api_table, admin_url + a_mod + '/delete');
        });

        $('.delete_multi').on('click', function() {
            var data_pk = [];
            $('.row_data:checked').each(function(i) {
                data_pk[i] = $(this).val();
            });
            if (data_pk != '' && data_pk != 'on') {
                $('.noty_layout').remove(); // close jsnotif
                cfSwalDelete(data_pk, api_table, admin_url + a_mod + '/delete');
            }
        });

        $('.headline_toggle').on('click', function() {
            $(this).find('i').removeClass().addClass('icon-spinner2 spinner');
            $('.noty_layout').remove();
            var data_pk = $(this).attr('data-id');
            $.ajax({
                url: admin_url + a_mod + '/headline',
                type: 'POST',
                dataType: 'json',
                data: { pk: data_pk, },
                success: function(response) {
                    if (response['status'] == true) {
                        var classRow = '.' + response['index'];
                        var content = response['html'];
                        $(classRow).html(content);
                        cfNotif(response['alert']);
                    } else {
                        cfNotif(response['alert']);
                    };
                    $('.headline_toggle').find('i').removeClass().addClass('fa fa-star');
                }
            });
        });
    }
});