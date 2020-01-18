$("#searchForm").submit( event => {
    event.preventDefault();
    console.log("hi");
    let location = $("#locationInput").val().trim();     

    // if(!location){
        
    //     return false;
    // }

    let body = {
        latitude: 43.779256,
        longitude: -79.415713,
        radius: 500    
    };
    
    $.post('/api/search/restaurantsnearby',body).then(function(data){        
        
    });
   
});