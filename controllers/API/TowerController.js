const readXlsxFile = require("read-excel-file/node");
var formidable = require('formidable');
var mv = require('mv');
var path = require('path');

exports.TowerController = new function() {

    this.index = async (req, res)  => {
        readXlsxFile('./public/data/' + process.env.DATA_FILENAME).then((data) => {
            data.splice(0, 1);
            let row = [];
            data.forEach((v, i) => {
                if (data[i][3].toLowerCase() == 'tiang') {
                    row.push(({
                        id: data[i][2],
                        // name: data[i][3],
                        lng: data[i][0],
                        lat: data[i][1],
                        // description: data[i][4],
                    }))
                }
            })
            let search = req.query.search;
            if (search) {
                row = row.filter((v) => {
                    return `${v.id}`.match(search['1'].value);
                })
            }
            res.json({
                status: 200,
                data: row
            });
        })
    }

    this.store = (req, res) => {
        var form = new formidable.IncomingForm();
        form.parse(req, function (err, fields, files) {
            var ext = files.filetoupload.originalFilename.slice(
                ((files.filetoupload.originalFilename.lastIndexOf('.') - 1) >>> 0) + 2
            );
            if (['xlsx'].includes(ext)) {
                var oldpath = files.filetoupload.filepath;
                // var filename = makeid(10) + '.xlsx';
                var filename = 'Data.xlsx';
                var newpath = path.join(__dirname, '../../public/data/') + filename;
                mv(oldpath, newpath, function(err) {
                    process.env.DATA_FILENAME = filename;
                    res.json({
                        status: 200,
                        data: []
                    })
                });
            }
        });
    }

}

function makeid(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * 
 charactersLength));
   }
   return result;
}