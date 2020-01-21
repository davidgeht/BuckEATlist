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
        console.log("clicked on info button");
        let id = $(event.currentTarget).data("id");
        let added_at = $(event.currentTarget).data("addedat");
       
        loadInfoModal(id);
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
        console.log("got a response");
        console.log(data);
        populateRestaurantModal(data);

        $("#restInfoModal").modal('show');

    });
    
}

function populateRestaurantModal(restaurant){
    let modal = $("#restInfoModal");

    let date = restaurant.date_visited?moment(Date.parse(restaurant.date_visited)).format("MMMM D, YYYY"):"no date given";

    modal.find("h5.modal-title").text(restaurant.name);
    modal.find("p.review").text(restaurant.user_review || "no review submitted");
    modal.find("p.rating").html(generateRatingGraphic(restaurant.user_rating));  
    modal.find("p.date").text(date);
    
}
