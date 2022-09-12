let map = null;

const GMap = function(selector, dlat, dlng) {
    
    let elMap = document.querySelector(selector);

    let map = new google.maps.Map(elMap, {
        center: new google.maps.LatLng(dlat, dlng),
        zoom: 18,
        disableDefaultUI: true,
        // scrollwheel: false,
        disableDoubleClickZoom: true,
        styles: [{
            featureType: "poi",
            elementType: "labels",
        
            stylers: [{
              visibility: "off"
            }]
        }]
    });

    this.getMap = () => {
        return map
    }

}