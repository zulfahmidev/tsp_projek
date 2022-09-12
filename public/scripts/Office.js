const Office = function(id, name, position) {

    let marker = new google.maps.Marker({
        position,
        map: map.getMap(),
        icon: {
            path: google.maps.SymbolPath.CIRCLE,
            fillOpacity: 0.5,
            fillColor: "red",
            strokeOpacity: 1.0,
            strokeColor: "red",
            strokeWeight: 2.0,
            scale: 10.0
        },
        visible: false,
    })

    this.setVisible = (bool) => marker.setVisible(bool);
    this.getId = () => id;
    this.getName = () => name;
    this.getPosition = () => position;
    // this.getPosition = () => new google.maps.LatLng(position.lat, position.lng);
}