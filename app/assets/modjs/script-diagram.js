let diagram = new dhx.Diagram("diagram_container", {
  type: "org",
  defaultShapeType: "img-card",
  scale: 0.9
});

$.ajax({
    url: admin_url + a_mod + '/load_leader_network',
    type: 'GET',
    dataType: 'json',
    cache: false,
    success:function(response){
        diagram.data.load(response);
        // if (response['success']==true) {
        //     $(location).attr('href',admin_url + a_mod);
        // } else {
        //     cfNotif(response['alert']);
        //     $('.submit_add').find('i').removeClass().addClass('fa fa-check mr-2');
        // }
    }
})

// diagram.data.load('data.json');