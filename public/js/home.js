
$(document).ready(async function (){
    
    //map.js
    initMap();

    //let id = await $.get('/api/user').id; //better way to get logged in user?
    
    $.get(`/api/users/buckeatlist`)
    .then(data=>{        
        loadMapMarkers(data);
    });    
    
    $("button.remove").on("click", function(event){
        event.stopPropagation();
        let button = $(event.currentTarget);
        let id = button.data("id");

        $.ajax({
            method: "DELETE",
            url: `/api/users/buckeatlist/${id}`
        }).then(data =>{
            window.location.reload();
        });
    });

    $("button.info").on("click", async function(event){
        event.stopPropagation();
        let yelp_id = $(event.currentTarget).data("yelpid");
        console.log(yelp_id);
        loadInfoModal(yelp_id);
    });

    $("button.checkoff").on("click", function(event){
        event.stopPropagation();   
            
    });
});

function loadInfoModal(yelp_id){

    $.get(`/api/restaurants/${yelp_id}`)
    .then(data =>{

        populateRestaurantModal(data);

        $("#restInfoModal").modal({show:true,focus:true});

    });
    $("#restInfoModal").modal({show:true,focus:true});
}

function checkOffRestaurant(){
    $.post(`/api/checkoffRestaurant/${id}`,body)
    .then(res => {

    });
}


function loadMapMarkers(restaurants){
    
    let image = {
        url: "../content/images/bucket-map-icon.png"
    };

    setMarkers(restaurants, map, image);    
}

function populateRestaurantModal(restaurant){
    
    $("#modalAddtoList").on('click',function (event) {
        $.post(`/api/user/${userId}/buckeatlist/add`, restaurant)
        .then();
    });
    
}
