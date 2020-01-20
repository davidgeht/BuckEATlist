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


$("#searchForm").submit(async function (event) {
    event.preventDefault();
    let alert = $("label.alert");
    alert.hide();
    if(!$("#nearbyChbox").is(":checked") && !$("#locationInput").val() &&  !$("#nameInput").val() ){
        alert.text("please input at least one search parameter");
        alert.show();
        return;
    }

    if ($('#nearbyChbox').is(":checked")) {
        console.log("Searching nearby");
        

        if(navigator.geolocation){
            navigator.geolocation.getCurrentPosition(position =>{
                
                let location = $("#locationInput").val().trim();     
                let term = $("#nameInput").val();
                let body = {
                    latitude: position.coords.latitude || 43.779256,
                    longitude: position.coords.longitude || -79.415713,
                    radius: 500,
                    term: term  
                };
                
                $.post('/api/search/restaurantsNearby',body)
                .then(function(data){
                    renderResults(data);
                }).catch(err=>{
            
                });     
                
            }
            ,null,{enableHighAccuracy: true});  
        }   
       
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
    let resultList = $('<ul>').attr('class', 'list-group');

    if(data.length === 0){
        return `<span>0 results found</span>`;
    }

    for(const restaurant of data){ 
        console.log('getting restaurant details');
        let item = $('<li>').attr({'class': 'list-group-item d-flex justify-content-start align-items-top restaurantContainer', style: "width:750px;"});
        let restocard = $('<div>').attr({'class': 'd-flex justify-content-left flex-column', style: "padding:1rem;"});
        let resto = $('<h5>').attr('class', 'restName').text(restaurant.name);
        
        let img = $("<div>").attr("style","width:150px").append($('<img>').attr({'src': restaurant.image_url, style: "max-width:150px;height:150px;"}));
        
        let toDisable = restaurant.inBucketlist;        
        let button = $('<button>').attr({'class': 'addToList btn btn-primary ml-auto', 
                        'data-restaurant': encodeJsonForHTML(restaurant), 
                        'data-yelpid':restaurant.id,
                        'disabled': toDisable,
                    });
        let i = $('<i>').attr('class', 'fas fa-plus');
        button.append(i);
        restocard.append(resto);
        restocard.append($(`<p>Rating: ${generateRatingGraphic(restaurant.rating).get()[0].outerHTML}</p>
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
    $("#results").append($("<h4>").text(`${data.length} result(s) found`));
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