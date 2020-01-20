
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
        let added_at = $(event.currentTarget).data("addedat");
        console.log(yelp_id);
<<<<<<< HEAD
        console.log(added_at);
        loadInfoModal(yelp_id,added_at);
=======
        $.get(`/api/restaurants/${yelp_id}`)
        .then(data =>{

            populateRestaurantModal(data);

            $("#restInfoModal").modal({show:true,focus:true});

        });
        $("#restInfoModal").modal({show:true,focus:true});
        
>>>>>>> 43828975d36e8c3ecf927c43f0d31bd393d15e5e
    });

    $("button.checkoff").on("click", function(event){
        event.stopPropagation();   
            
    });
});

function loadInfoModal(yelp_id, added_at){

    $.post(`/api/search/business`,{location:yelp_id})
    .then(data =>{

        populateRestaurantModal(data,added_at);

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

function populateRestaurantModal(restaurant, added_at){
    
    let modal = $("#restInfoModal");

    modal.find("h5.modal-title").text(restaurant.name);
    modal.find(".restImg").attr("src",restaurant.image_url);
    modal.find("p.categories").text(restaurant.categories.map(e=>{return e.title}).join(', '));
    modal.find("span.price").text(restaurant.price);
    modal.find("p.address").text(restaurant.location.display_address.join("\n"));
    modal.find("span.phoneNumber").text(restaurant.display_phone);
    modal.find("span.rating").text(`${restaurant.rating}/5`);
    modal.find("span.openNow").text(restaurant.hours.is_open_now? "Yes":"No");    
    modal.find("p.addedAt").text(moment(Date.parse(added_at)).format("MMMM D, YYYY"));
    modal.find("span.link a").attr("href",restaurant.url);

    $("#checkOffList").on('click',function (event) {
        $.post(`/api/user/${userId}/buckeatlist/add`, restaurant)
        .then();
    });
    
}
