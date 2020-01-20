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
        let id = $(event.currentTarget).data("id");
        let added_at = $(event.currentTarget).data("addedat");
        console.log(yelp_id);
        loadInfoModal(id);
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

function loadInfoModal(id){

    $.get(`/api/bucketlist/${id}`)
    .then(data =>{

        populateRestaurantModal(data,added_at);

        $("#restInfoModal").modal({show:true,focus:true});

    });
    
}

function populateRestaurantModal(restaurant){
    let modal = $("#restInfoModal");

    modal.find("h5.modal-title").text(restaurant.name);
    modal.find("p.rewview").text(restaurant.user_review);
    modal.find("p.rating").html(generateRatingGraphic(restaurant.user_rating));
    modal.find("span.openNow").text(restaurant.hours.is_open_now? "Yes":"No");    
    modal.find("p.addedAt").text(moment(Date.parse(restaurant.date_visited)).format("MMMM D, YYYY"));
    
}
