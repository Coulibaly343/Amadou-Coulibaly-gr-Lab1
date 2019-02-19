document.addEventListener("DOMContentLoaded", appStart)
let webSocketServerURI = "ws://91.121.6.192:8010"
let mouseClick = false; //for mouse event 
let sendBtn; //change avatar
let Socket = new WebSocket(webSocketServerURI); //webSocket
let map; //map
let myMarker; //my send marker
let myMarkerProp; //properties of marker
let marker_array = []; //marker array
let ID = Math.floor((Math.random() * 1000) + 1); //random ID
let latitude; //vertical
let longitude; //horizontal
let icon; //marker icon
let coords; //for marker position change
let iconURL = "http://piq.codeus.net/static/media/userpics/piq_371243_400x400.png"; //URL picture
let mouseCoords; //location of the mouse click
let Markerlatlng; //object latlng to fix the position of the marker
let found = false; //finding a marker in the array
let change = false; //if there is a change in the position

function appStart() { //start
    Socket.onerror = (evt) => {
        console.log("error")
    }
    Socket.onmessage = wsMessageEv;
    Socket.onclose = (evt) => {
        console.log("close");
    }
    document.addEventListener("keydown", positionKeys);
    window.onbeforeunload = closeConnection;
    sendBtn = document.getElementById("send");
    sendBtn.addEventListener("click", changeAvatar);
}

function closeConnection() { //if leave the map, inform the rest, marker can be removed
    close = true;
    myMarkerProp.close = close;
    Socket.send(JSON.stringify(myMarkerProp))
    let msg = "Are you sure you want to leave?"
    return msg;
}

function changeAvatar() { //zmiana awatara
    let value = document.getElementById("URL").value;
    iconURL = value;
    myMarker.setIcon({
        url: iconURL,
        scaledSize: new google.maps.Size(34, 34)
    });
    console.log(myMarkerProp.icon)
    myMarkerProp.icon = myMarker.icon;
    document.getElementById("URL").value = "";
    sendMarker(myMarkerProp);
}

function positionKeys(e) { //moving the keys wsad or arrows
    switch (e.keyCode) {
        case 65:
        case 37: // <
            myMarkerProp.lng -= 0.0003;
            change = true;
            sendMarker(myMarkerProp);
            break;
        case 87:
        case 38: // ^
            myMarkerProp.lat += 0.0003;
            change = true;
            sendMarker(myMarkerProp);
            break;
        case 68:
        case 39: // >
            myMarkerProp.lng += 0.0003;
            change = true;
            sendMarker(myMarkerProp);
            break;
        case 83:
        case 40: // v
            myMarkerProp.lat -= 0.0003;
            change = true;
            sendMarker(myMarkerProp);
            break;
    }
}

function initMap() { //map initialization
    getLocation();

    let uluru = {
        lat: 50.062534,
        lng: 19.9370893
    };
    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 4,
        center: uluru,
        keyboardShortcuts: false,
        draggable: false,
        clickable: false
    });
    google.maps.event.addListener(map, "mousedown", onMouseDown, true);
    google.maps.event.addListener(map, "mousemove", onMouseOver, true);
    google.maps.event.addListener(map, "mouseup", onMouseUp, true);

    icon = {
        url: iconURL,
        scaledSize: new google.maps.Size(34, 34)
    }

    myMarker = new google.maps.Marker({
        position: uluru,
        map: map,
        animation: google.maps.Animation.DROP,
        icon: icon,
        ID: ID
    });
    marker_array.push(myMarker);
}

function getLocation() { //user location
    navigator.geolocation.getCurrentPosition(geoOk, geoFail)
}

function geoFail(err) { //if permission denied
    console.log(err);
}

function geoOk(e) { //if permission denied accept
    latitude = e.coords.latitude;
    longitude = e.coords.longitude;
    map.setCenter({
        lat: latitude,
        lng: longitude
    })
    myMarkerProp = {
        lat: latitude,
        lng: longitude,
        icon: icon,
        ID: ID
    }
    sendMarker(myMarkerProp);
    map.setZoom(12);
}

function changeMarkerPosition(markerProp) { //change the marker setting
    Markerlatlng = new google.maps.LatLng(markerProp.lat, markerProp.lng);
    for (let i = 0; i < marker_array.length; i++) {
        if (marker_array[i].ID == myMarkerProp.ID) {
            map.setCenter(Markerlatlng);
        }
        if (marker_array[i].ID == markerProp.ID) {
            marker_array[i].setPosition(Markerlatlng);
        }
    }
}

function sendMarker(marker) { //wysyłanie informacji na serwer
    Socket.send(JSON.stringify(marker));
}

function wsMessageEv(e) { //receiving messages from the server
    let dd = JSON.parse(e.data);
    marker_array.forEach(marker => {
        if (dd.ID == marker.ID) {
            found = true;
            marker.setIcon({
                url: dd.icon.url,
                scaledSize: dd.icon.scaledSize
            });
        }
    });
    if (dd.close) {
        for (let i = 0; i < marker_array.length; i++) {
            if (dd.ID == marker_array[i].ID) {
                marker_array[i].setMap(null);
                marker_array.splice(i, 1);
                close = false;
            }
        }
    } else if (!found) {
        addMarker(dd);
    } else {
        changeMarkerPosition(dd)
        found = false;
    }

}

function addMarker(marker) { //adding a new marker to the map
    let markPos = new google.maps.LatLng(marker.lat, marker.lng);
    let mark = new google.maps.Marker({
        position: markPos,
        map: map,
        animation: google.maps.Animation.DROP,
        icon: marker.icon,
        ID: marker.ID
    })
    marker_array.push(mark);
    console.log(marker_array)
}

function positionMouse() { //moving the mouse
    console.log(myMarkerProp.lng,myMarkerProp.lat)
    myMarkerProp.lng += coords.lng / 100;
    myMarkerProp.lat += coords.lat / 100;
    console.log(myMarkerProp.lng,myMarkerProp.lat)
    sendMarker(myMarkerProp);
}

function onMouseDown(e) { //permission to move the mouse
    mouseCoords = e.latLng;
    mouseClick = true;
}

function onMouseOver(e) { //counting coordinates
    if (mouseClick) {
        coords = {
            lng: e.latLng.lng() - mouseCoords.lng(),
            lat: e.latLng.lat() - mouseCoords.lat()
        }
        console.log(coords.lng,coords.lat)
        positionMouse();
    }
}

function onMouseUp() { //turning off mouse 
    mouseClick = false;
}