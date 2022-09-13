const readXlsxFile = require("read-excel-file/node");

exports.OfficeController = new function() {

    this.index = async (req, res)  => {
        readXlsxFile('./public/data/' + process.env.DATA_FILENAME).then((data) => {
            data.splice(0, 1);
            let row = [];
            data.forEach((v, i) => {
                if (data[i][3].toLowerCase().trim() != 'kantor') {
                    row.push(({
                        id: data[i][2],
                        name: data[i][3],
                        position: {
                            lng: data[i][0],
                            lat: data[i][1],
                        },
                        description: data[i][4],
                    }))
                }
            })
            res.json({
                message: "Success",
                status: 200,
                body: row
            });
        })
    }

}