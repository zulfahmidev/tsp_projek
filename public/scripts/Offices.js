const Offices = new function() {
    var offices = [];

    this.getOffices = () => offices;

    this.init = () => {
        axios.get('/api/office').then(({status, data}) => {
            if (status == 200) {
                data.body.forEach(office => {
                    offices.push(new Office(office.id, office.name, office.position));
                });
            }
        })
    }

    this.setVisible = (bool) => {
        offices.forEach(v => v.setVisible(bool));
    }

    this.getNearOffice = (towers) => {
        let lats = 0;
        let lngs = 0;
        // console.log(towers)
        towers.forEach(v => {
            lats += v.getPosition().lat;
            lngs += v.getPosition().lng;
        });
        let mlat = lats/towers.length;
        let mlng = lngs/towers.length;

        let selected_office = null;
        let current_dist = 0;
        Offices.getOffices().forEach((ofc, i) => {
            let dlat = ofc.getPosition().lat - mlat;
            let dlng = ofc.getPosition().lng - mlng;
            let dist = Math.sqrt(dlat**2 + dlng**2);

            if (i == 0) {
             current_dist = dist;   
             selected_office = ofc;
            }else {
                if (dist <= current_dist) {
                    current_dist = dist;
                    selected_office = ofc;
                }
            }
        })
        return selected_office;
    }
}