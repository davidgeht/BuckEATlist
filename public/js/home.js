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
    
    let id = await $.get('/api/user').id; //better way to get logged in user?

    $.get('/api/users/{id}/buckeatlist/')
    .then(data=>{
        loadMapMarkers(data);
    }).catch(err=>{
        console.log(err);
    });
});

function loadMapMarkers(restaurants){
    console.log(restaurants);
}
