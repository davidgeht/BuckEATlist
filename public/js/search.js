$('#nearbyChbox').click(event => {
    if ($('#nearbyChbox').is(':checked')) {
        console.log('checked');
        $("#locationInput").attr("disabled",true);
        $("#locationInput").val(' ');
    } else {
        console.log('unchecked');
        $("#locationInput").attr("disabled",false);
        $("#locationInput").val(' ');
    }
});

$("#searchForm").submit(event => {
    event.preventDefault();

    if ($('#nearbyChbox').is(":checked")) {
        console.log("Searching nearby");
        let location = $("#locationInput").val().trim();     
        let term = $("#nameInput").val();
        let body = {
            latitude: 43.779256,
            longitude: -79.415713,
            radius: 500,
            term: term  
        };
        
        $.post('/api/search/restaurantsNearby',body)
        .then(function(data){
            renderResults(data);
        }).catch(err=>{
    
        });     
       
    } else {
        let location = $("#locationInput").val();
        let term = $("#nameInput").val();
        let body = {
            location: location,
            term: term  
        };
        $.post('/api/search/restaurants', body)
        .then(function(data){
            console.log('Data received');
            renderResults(data);
        }).catch(err=>{
            console.log(err);
        });  
    }

})

function renderResults(data){
    $("#results").empty();
    let contentStr = $('<h3>').text('Search Results');
    let resultList = $('<ul>').attr('class', 'restaurantContrainer list-group');

    if(data.length === 0){
        return `<span>0 results found</span>`;
    }

    for(const restaurant of data){ 
        console.log('getting restaurant details');
        let item = $('<li>').attr({'class': 'list-group-item d-flex justify-content-between align-items-top', style: "width:750px;"});
        let restocard = $('<div>').attr({'class': 'd-flex justify-content-left flex-column', style: "width:80%;padding:1rem;"});
        let resto = $('<h5>').attr('class', 'restName').text(restaurant.name);
        let img = $('<img>').attr({'src': restaurant.image_url, style: "width:150px;height:150px;"});
        let toDisable = restaurant.inBucketlist;        
        let button = $('<button>').attr({'class': 'addToList btn btn-primary', 
                        'data-restaurant': encodeJsonForHTML(restaurant), 
                        'data-yelpid':restaurant.id,
                        'disabled': toDisable
                    });
        let i = $('<i>').attr('class', 'fas fa-plus');
        button.append(i);
        restocard.append(resto);
        restocard.append($(`<p>Rating: ${restaurant.rating}</p>
                            <p>Price: ${restaurant.price}</p>
                            <p>Address: ${restaurant.location.display_address}</p>
                            <p>Phone: ${restaurant.display_phone}</p>
                            `))
        item.append(img);
        item.append(restocard);
        item.append(button);        
        resultList.append(item);
        
        // += `<li class="">\n
        // <span class="restName">${}</span>\n           
        // <button class="addToList btn btn-primary" data-restaurant="${encodeJsonForHTML(restaurant)}" data-yelpid="${restaurant.id}"><i class="fas fa-plus"></i></button>\n            
        // </li>`;
    }
    
    $("#results").append(contentStr);
    $("#results").append(resultList);

    $(".addToList").on('click', function(event){                
        let restaurant = decodeJsonFromHTML($(event.currentTarget).data("restaurant")); 
               
        $.post(`/api/buckeatlist/add`, restaurant)
        .then(res=>{
            $(event.currentTarget).attr('disabled', true);
        });            
    });
    
}

function encodeJsonForHTML(json){
    return JSON.stringify(json).replace(/'/g,"\\'").replace(/"/g,"'");
}
function decodeJsonFromHTML(string){
    return JSON.parse(string.replace(/'/g,'"').replace(/\\"/g,"'"));
}