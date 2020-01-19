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
    
    $.post('/api/search/restaurantsNearby',body)
    .then(function(data){    
        renderResults(data);
    }).catch(err=>{

    });     
   
});

function renderResults(data){
    let contentStr = "<h3>Search Results</h3>\n";
    
    if(data.length === 0){
        return `${contentStr}
        <span>0 results found</span>`;
    }

    for(const restaurant of data){        
        contentStr += `<div class="restaurantContrainer row align-items-center">\n
        <span class="restName">${restaurant.name}</span>\n           
        <button class="addToList" data-restaurant='${JSON.stringify(restaurant)}' data-yelpid="${restaurant.id}"><i class="fas fa-plus"></i></button>\n            
        </div>\n`;
    }
    
    $("#results").html(contentStr);

    $(".addToList").on('click', function(event){                
        let restaurant = $(event.currentTarget).data("restaurant"); 
        console.log(restaurant);       
        $.post(`/api/buckeatlist/add`, restaurant)
        .then();            
    });
    
}