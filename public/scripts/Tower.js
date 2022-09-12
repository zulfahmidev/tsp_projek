const Tower = function(id, name, position) {

    let marker = new google.maps.Marker({
        position,
        map: map.getMap(),
        visible: false,
    })

    marker.addListener('click', () => {
        if (isModeSetBroken) {
            this.setBroken(true);
            console.log('berhasil');
        }
    })

    let isBroken = false;

    this.setVisible = (bool) => {
        marker.setVisible(bool);
    }

    this.setBroken = (bool) => {
        isBroken = bool;
        if (bool) marker.setLabel({
            text: '!',
            fontWeight: 'bold',
            color: 'white',
            fontSize: '21px',
        }); else marker.setLabel('');
    }

    this.isBroken = () => isBroken;

    this.getId = () => id;
    this.getName = () => name;
    this.getPosition = () => position;
    // this.getPosition = () => new google.maps.LatLng(position.lat, position.lng);
}