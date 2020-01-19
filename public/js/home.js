//fix margin for the full job column
//$("#mapColumn").css("margin-right",$("#listColumn").css("width"));
$("#map").css("height",$(window).innerHeight()-$("#navbar").outerHeight(true)-$("#mapColumn .navbar").outerHeight(true)-10); 
//set job card column height
$("#listColumn").css("height",$(document).innerHeight() - $("#navbar").outerHeight(true));

//fixing page element dimensions on resize
$(window).on('resize',function(){
    //$("#mapColumn").css("margin-right",$("#listColumn").css("width"));   
    $("#listColumn").css("height",$(document).innerHeight() - $("#navbar").outerHeight(true));
   
    $("#map").css("height",$(window).innerHeight() 
    - $("#navbar").outerHeight(true)-10); 
});

$(document).ready(async function (){
    
    //let id = await $.get('/api/user').id; //better way to get logged in user?
    let id = 22;
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
        $.get(`/api/restaurants/${yelp_id}`)
        .then(data =>{

            populateRestaurantModal(data);

            $("#restInfoModal").modal({show:true,focus:true});

        });
        $("#restInfoModal").modal({show:true,focus:true});
        
    });

    $("button.checkoff").on("click", function(event){
        event.stopPropagation();       
    });
});

function loadMapMarkers(restaurants){
    
    setMarkers(restaurants, map);    
}

function populateRestaurantModal(restaurant){
    
    $("#modalAddtoList").on('click',function (event) {
        $.post(`/api/user/${userId}/buckeatlist/add`, restaurant)
        .then();
    });
    
}
