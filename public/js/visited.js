$(document).ready(async function (){
    
    //let id = await $.get('/api/user').id; //better way to get logged in user?
    initMap();

    $.get(`/api/user/visited`)
    .then(data=>{        
        loadMapMarkers(data);
    });    
    
    $("button.remove").on("click", function(event){
        event.stopPropagation();
        let button = $(event.currentTarget);
        let id = button.data("id");

        // $.ajax({
        //     method: "DELETE",
        //     url: `/api/users/buckeatlist/${id}`
        // }).then(data =>{
        //     window.location.reload();
        // });
    });

    $("button.info").on("click", async function(event){
        event.stopPropagation();
        let yelp_id = $(event.currentTarget).data("yelpid");
        let added_at = $(event.currentTarget).data("addedat");
        console.log(yelp_id);
        loadInfoModal(yelp_id,added_at);
    });

    $("button.checkoff").on("click", function(event){
        event.stopPropagation();       
    });
});

function loadMapMarkers(restaurants){
    
    let image = {
        url: "../content/images/bucket-map-icon.png"
    };
    
    setMarkers(restaurants, image);    
}

function loadInfoModal(yelp_id, added_at){

    $.get(`/api/restaurants/${yelp_id}`)
    .then(data =>{

        populateRestaurantModal(data,added_at);

        $("#restInfoModal").modal({show:true,focus:true});

    });
    $("#restInfoModal").modal({show:true,focus:true});
}

function populateRestaurantModal(restaurant){
    
    $("#modalAddtoList").on('click',function (event) {
        $.post(`/api/user/${userId}/buckeatlist/add`, restaurant)
        .then();
    });
    
}
