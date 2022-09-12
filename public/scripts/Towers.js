const Towers = new function() {
    var towers = [];

    this.getTowers = () => towers;

    this.init = () => {
        axios.get('/api/tower').then(({status, data}) => {
            if (status == 200) {
                data.data.forEach(tower => {
                    towers.push(new Tower(tower.id, tower.name, {lat: tower.lat, lng: tower.lng}));
                });
            }
        })
    }

    this.getTower = (id) => {
        towers.find(v => {
            return v.getId() == id;
        });
    }

    this.getTowersByIds = (ids = []) => {
        return towers.filter(v => {
            return ids.includes(v.getId());
        });
    }

    this.setVisibleTowers = (bool, except = []) => {
        towers.forEach(twr => {
            let cont = false; //continue
            for (const ex of except) {
                if (ex.getId() == twr.getId()) {
                    cont = true;
                }
            }
            if (!cont) {
                twr.setVisible(bool);
            }
        })
    }

    this.reset = () => {
        this.setVisibleTowers(true);
        this.getBrokenTowers().forEach(v => {
            v.setBroken(false);
        })
    }

    this.getBrokenTowers = () => {
        let data = dataTable.rows({selected: true}).data();
        let ids = [];
        for (let i=0; i<data.length; i++) {
          ids.push(data[i].id);
        }
        return Towers.getTowersByIds(ids);
    };

}