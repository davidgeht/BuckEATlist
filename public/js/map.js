var map;
var marker;
var geoCoder;
var latLngC;
var defaultLat = "";
var defaultLng = "";

var mUpdateAddress = false;
var mUpdateLatitude = false;
var mUpdateLongitude = false;
var mUpdateDrag = false;


var map;
function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: -34.397, lng: 150.644},
        zoom: 8
    });
}


// function initialize() {   

//     latLngC = new google.maps.LatLng(defaultLat, defaultLng);

//     var mapOptions = {
//         center: latLngC,
//         zoom: 18,
//         mapTypeId: google.maps.MapTypeId.ROADMAP,
//     };

//     map = new google.maps.Map(document.getElementById('source_map'),
// mapOptions);

//     var marker = new google.maps.Marker({
//         position: latLngC,
//         map: map,
//         draggable: true
//     });


//     var places1 = new google.maps.places.Autocomplete(document.getElementById('txtPropertyAddress'));
//     google.maps.event.addListener(places1, 'place_changed', function () {
//         var place1 = places1.getPlace();

//         var src_addr = place1.formatted_address;
//         var src_lat = place1.geometry.location.lat();
//         var src_long = place1.geometry.location.lng();

//         var mesg1 = "Address: " + src_addr;
//         mesg1 += "\nLatitude: " + src_lat;
//         mesg1 += "\nLongitude: " + src_long;
//         //alert(mesg1);

//         document.getElementById('src_lat').value = src_lat;
//         document.getElementById('src_long').value = src_long;        

//         $('.txtLatitude').val(src_lat);
//         $('.txtLongitude').val(src_long);
//     });

//     //Add marker upon place change
//     //google.maps.event.addDomListener(places1, 'place_changed', addMarker);            
//     google.maps.event.addDomListener(places1, 'place_changed', function () { addMarker(map); });

// }

// google.maps.event.addDomListener(window, 'resize', initialize);
// google.maps.event.addDomListener(window, 'load', initialize);

// //Function to add marker upon clicking on a location in map
// function addMarker(map) {
//     var lat = document.getElementById('src_lat').value;
//     var loong = document.getElementById('src_long').value;
//     if (!lat || !loong) return;

//     var coordinate = new google.maps.LatLng(lat, loong);

//     if (marker) {
//         //if marker already was created change positon
//         marker.setPosition(coordinate);
//         map.setCenter(coordinate);
//         map.setZoom(18);

//         google.maps.event.addListener(marker, 'dragend', function (x) {

//             mUpdateLatitude = false;
//             mUpdateDrag = true;
//             mUpdateAddress = false;
//             mUpdateLongitude = false;

//             document.getElementById('src_lat').value = x.latLng.lat();
//             document.getElementById('src_long').value = x.latLng.lng();
//             //document.getElementById('pickup_location').innerHTML = x.latLng.lat() + ' , ' + x.latLng.lng();

//             $('.txtLatitude').val(x.latLng.lat());
//             $('.txtLongitude').val(x.latLng.lng());

//             var geocoder = new google.maps.Geocoder;
//             var infowindow = new google.maps.InfoWindow;
//             geocodeLatLng(geocoder, map, infowindow, x.latLng.lat(), x.latLng.lng(), 'txtPropertyAddress');

//             refreshValues();
//         });
//     }
//     else {
//         //create a marker
//         marker = new google.maps.Marker({
//             position: coordinate,
//             map: map,
//             draggable: true
//         });
//         map.setCenter(coordinate);
//         map.setZoom(18);

//         google.maps.event.addListener(marker, 'dragend', function (x) {

//             mUpdateLatitude = false;
//             mUpdateDrag = true;
//             mUpdateAddress = false;
//             mUpdateLongitude = false;

//             document.getElementById('src_lat').value = x.latLng.lat();
//             document.getElementById('src_long').value = x.latLng.lng();
//             //document.getElementById('pickup_location').innerHTML = x.latLng.lat() + ' , ' + x.latLng.lng();

//             $('.txtLatitude').val(x.latLng.lat());
//             $('.txtLongitude').val(x.latLng.lng());

//             var geocoder = new google.maps.Geocoder;
//             var infowindow = new google.maps.InfoWindow;
//             geocodeLatLng(geocoder, map, infowindow, x.latLng.lat(), x.latLng.lng(), 'txtPropertyAddress');

//             refreshValues();
//         });
//     }
// }

// function refreshValues() {
//     mUpdateLatitude = false;
//     mUpdateDrag = false;
//     mUpdateAddress = false;
//     mUpdateLongitude = false;
// }






  

    
