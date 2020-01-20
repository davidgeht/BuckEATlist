
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
            method: "POST",
            url: `/api/deleteRestaurant/${id}`
        }).then(data =>{
            window.location.reload();
        });
    });

    $("button.info").on("click", async function(event){
        event.stopPropagation();
        let yelp_id = $(event.currentTarget).data("yelpid");
        let added_at = $(event.currentTarget).data("addedat");
        
        loadInfoModal(yelp_id,added_at);
    });

    $("button.checkoff").on("click", function(event){
        event.stopPropagation();
        let name = $(event.currentTarget).data("name");  
        let id = $(event.currentTarget).data("id");   
        
        loadCheckOffModal(name, id);
    });
});

function loadInfoModal(yelp_id, added_at){

    $.get(`/api/restaurants/${yelp_id}`)
    .then(data =>{

        populateRestaurantModal(data,added_at);

        $("#restInfoModal").modal({show:true,focus:true});

    });
    
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
    setMarkers(restaurants, image);    
}

function populateRestaurantModal(restaurant, added_at, bucketID){
    
    let modal = $("#restInfoModal");

    modal.find("h5.modal-title").text(restaurant.name);
    modal.find(".restImg").attr("src",restaurant.image_url);
    modal.find("p.categories").text(restaurant.categories.map(e=>{return e.title}).join(', '));
    modal.find("span.price").text(restaurant.price);
    modal.find("p.address").text(restaurant.location.display_address.join("\n"));
    modal.find("span.phoneNumber").text(restaurant.display_phone);
    modal.find("p.rating").html(generateRatingGraphic(restaurant.rating));
    modal.find("span.openNow").text(restaurant.hours.is_open_now? "Yes":"No");    
    modal.find("p.addedAt").text(moment(Date.parse(added_at)).format("MMMM D, YYYY"));
    modal.find("span.link a").attr("href",restaurant.url);

    $("#checkOffList").attr("data-id",bucketID).on('click',function (event) {
        modal.modal('hide');
        loadCheckOffModal(restaurant,bucketID);
        
    });
    
}

function loadCheckOffModal(name,bucketID){
    
    populateCheckOffModal(name,bucketID);

    $("#restCheckOffModal").modal({show:true,focus:true});

    $("#btnCheckOffSubmit").on('click', async function(event){
        let review = $("#reviewArea").val();
        let bucketID = $(event.currentTarget).data("bucketid");
        let rating = $("input[type=radio]:checked").val();
        let date = $("input.datetimepicker-input").val();
        let files = $("#customFile").get()[0].files;
        
        console.log("grabbed inputs");
        let formData = new FormData();
        
        for(file of files){
            formData.append("files[]", file);
        }
        formData.append("review", review);
        formData.append("date", date);
        formData.append("rating", rating);

        $.ajax({
            url:`/api/checkoffRestaurant/${bucketID}`,
            method:"POST",
            data:formData,
            contentType: false,
            processData: false            
        }).then(response =>{
            $("#restCheckOffModal").modal('hide');
            window.location.reload();
        }).catch(err=>{
            let alert = $("#checkOffAlert");
            alert.text(err);
            alert.show();
        });

    });
}

function populateCheckOffModal(name, bucketID){
    let modal = $("#restCheckOffModal");
    modal.find("#checkOffRestaurantForm").trigger('reset');
    $("#checkOffAlert").hide();
    modal.find("h5.modal-title").text(name);
    modal.find("#btnCheckOffSubmit").attr("data-bucketid",bucketID);
   
}

