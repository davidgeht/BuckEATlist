var map;


function initMapWithPosition(position){
    map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: position.coords.latitude, lng: position.coords.longitude},
        zoom: 13
    });
}

function initMap() {

    let center = {lat: 43.651070, lng: -79.347015};  
    if(navigator.geolocation){
        console.log(navigator.geolocation.getCurrentPosition(initMapWithPosition)); 
        return;
    }
    map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 43.651070, lng: -79.347015},
        zoom: 8
    });
}

function setMarkers(restuarantList, map) {
    let markers = [];
    let restaurants = [];   
    let image = {
        //url: "/Images/office-building-marker.png"
    };

    if (restuarantList.length > 0) {
        restaurants = restuarantList;
    }    
    
    createMarkers(restaurants, map);

    async function createMarkers(restaurants, map) {
        for (const restuarant of restaurants) {
            let imageSource = '';
            let mlat = parseFloat(restuarant.lat);
            let mlng = parseFloat(restuarant.lon);
            let position = { lat: mlat, lng: mlng };

            let infowindow = new google.maps.InfoWindow({ minWidth: 400 });

            let marker = new google.maps.Marker({
                position: position,
                map: map,
                //icon: image,
                title: restuarant.name,                
                property_id: restuarant.id
            });

            await google.maps.event.addListener(marker, 'click', (function (marker, thisRestaurant) {

                return function () {
                    //get info window content for particular restaurant
                    if (thisRestaurant.image_url !== null) {
                        imageSource = thisRestaurant.image_url;
                    } else {
                        imageSource = "";//'/Images/info_window_fallback.png';
                    }

                    let categoriesStr = thisRestaurant.categories.map(e =>{                        
                        return e.title;
                    }).join(", ");                   

                    let contentString =
                    `<div class="maps-info-pane"> 
                        <h2 class="restaurant-name"> ${thisRestaurant.name}</h2>
                        <div class="">
                            <div class="" style="background-image: url(\'${imageSource}\')"></div>
                            <div class="property-info">
                                <p class="address"> ${thisRestaurant.location.address1}</p>                                
                                <p class="">Cuisine: <strong> ${categoriesStr}</strong></p>
                                <p class="">Price: <strong> ${thisRestaurant.price}</strong></p>
                                <button class="btn btn-success" data-id="${thisRestaurant.yelp_id}">Show Details</button>
                            </div>
                        </div>
                    </div>`;

                    infowindow.setContent(contentString);
                    infowindow.open(map, marker);
                }
            })(marker, restuarant));
            markers.push(marker);
        }     
        
        let listener = await google.maps.event.addListener(map, "idle", function () {
            fitMarkersInBounds(map, markers);
            google.maps.event.removeListener(listener);
        });

        panToRestaurantClick(map, markers); //When restaurant div is clicked, move tha map's focus and zoom into it
    }
}

function fitMarkersInBounds(map, markers) {
    let propertiesLatLng = [];
    let bounds = new google.maps.LatLngBounds();
    
    let coordArray = [];
    
    for(const marker of markers){
        bounds.extend(marker.position);
    }
    if(markers.length > 0){
        if (markers.length === 1) {
            map.panTo(markers[0].getPosition());
            map.setZoom(14);

        } else if ($(window).width() > 550) {
            map.fitBounds(bounds,
                { //padding
                    top: 30,
                    left: 10, //panelWidth
                    bottom: 10,
                    right: 10
                });
            map.panToBounds(bounds);
        } else {
            map.fitBounds(bounds);
        }
    }
}

function panToRestaurantClick(map, markers) {
    let elements = document.getElementsByClassName("restaurantContrainer");

    let panelWidth = $("#listColumn").outerWidth();
    let mapWidth = $("#map").outerWidth();
    
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






  

    
