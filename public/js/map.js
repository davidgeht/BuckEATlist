let map;

let lastOpenedInfoWindow = null;

function initMap() {
     
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(initMapWithPosition); 
        return;
    }
    map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 43.651070, lng: -79.347015},
        zoom: 13
    });
}

function initMapWithPosition(position){
    map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: position.coords.latitude, lng: position.coords.longitude},
        zoom: 13
    });    
}

function setMarkers(restuarantList, image) {
   
    let restaurants = [];

    if (restuarantList.length > 0) {
        restaurants = restuarantList;        
    
        createMarkers(restaurants, image);
    }
    
}

async function createMarkers(restaurants, image) {
    let markers = [];
    for (const restuarant of restaurants) {
        let imageSource = '';
        let mlat = parseFloat(restuarant.lat);
        let mlng = parseFloat(restuarant.lon);
        let position = { lat: mlat, lng: mlng };

        let infowindow = new google.maps.InfoWindow({ minWidth: 400 });

        let marker = new google.maps.Marker({
            position: position,
            map: map,
            icon: image,
            title: restuarant.name,                
            property_id: restuarant.id
        });

        google.maps.event.addListener(marker, 'click', (function (marker, thisRestaurant) {

            return function () {
                //get info window content for particular restaurant

                if (lastOpenedInfoWindow){
                    lastOpenedInfoWindow.close();
                }
                if (thisRestaurant.image_url !== null) {
                    imageSource = thisRestaurant.image_url;
                } else {
                    imageSource = "";//'/Images/info_window_fallback.png';
                }
                console.log(thisRestaurant);
                
                let categoriesStr = "cuisines";
                // let categoriesStr = thisRestaurant.categories.map(e =>{                        
                //     return e.title;
                // }).join(", ");                   
                
                let contentDiv = $("<div>").addClass("maps-info-pane")
                    .append($("<h2>").addClass("restaurant-name").text(thisRestaurant.name),
                            $("<div>").addClass("")
                            .append($("<div>").addClass("").attr("style",`background-image: url("${imageSource}")'`),
                                    $("<div>").addClass("restaurant-info")
                                    .append($("<h4>").addClass("address").text(JSON.parse(thisRestaurant.address).address1),
                                             $("<p>").addClass("").html(`Cuisine: <strong>${categoriesStr}</strong>`),
                                             $("<p>").addClass("").html(`Price: <strong>${thisRestaurant.price}</strong>`),
                                             $("<p>").addClass("").html(`Rating: <strong>${thisRestaurant.rating}</strong>`),
                                             $("<button>").addClass("btn btn-success").attr("data-yelpid",thisRestaurant.yelp_id).text("Show Details")
                                                .on('click', async function(event){
                                                   
                                                    console.log("hi");
                                                    let yelp_id = $(event.currentTarget).data("yelpid");
                                                    //console.log(yelp_id);
                                                    loadInfoModal(yelp_id, thisRestaurant.added_at);
                                                })
                                    )
                            )
                    );
              
                infowindow.setContent(contentDiv.clone(true)[0]);
                infowindow.open(map, marker);

                lastOpenedInfoWindow = infowindow;
            }
        })(marker, restuarant));
        markers.push(marker);
    }     
    
    // let listener = await google.maps.event.addListener(map, "idle", function () {
    //     fitMarkersInBounds(map, markers);
    //     google.maps.event.removeListener(listener);
    // });
    if(markers.length > 0 ){
        fitMarkersInBounds(map, markers);
        panToRestaurantClick(map, markers); //When restaurant div is clicked, move tha map's focus and zoom into it
    }
}

function fitMarkersInBounds(map, markers) {
    
    let bounds = new google.maps.LatLngBounds();
    
    for(const marker of markers){
        bounds.extend(marker.position);
    }

    map.fitBounds(bounds,
        { //padding
            top: 30,
            left: 10, //panelWidth
            bottom: 10,
            right: 10
        });
    map.panToBounds(bounds);        
    
}

function panToRestaurantClick(map, markers) {
    let elements = document.getElementsByClassName("restaurantContainer");
   
    for (let i = 0; i < elements.length; i++) {

        elements[i].setAttribute("markerIndex", i);
        elements[i].addEventListener("click", function (e) {
            google.maps.event.trigger(markers[e.currentTarget.getAttribute("markerIndex")], 'click');
            map.setZoom(15);
            
            map.panTo(markers[e.currentTarget.getAttribute("markerIndex")].getPosition());
            // if ($(window).width() > 550) {
            //     map.panBy(((mapWidth / 2) - ((mapWidth - panelWidth) / 2)), 0);
            // }
        });
    }
}




  

    
