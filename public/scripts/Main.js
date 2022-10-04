let isModeSetBroken = false;
let isModeFindRoute = false;
let dataTable;

let distance = 0;

function main() {

    map = new GMap("#map", 5.176745235, 97.13243756);

    Towers.init();
    Offices.init();
    
}

function switchModeSetBroken() {
    isModeSetBroken = !isModeSetBroken;

    if (isModeSetBroken) {
        $('#btn_tower_broken').addClass('active');
    }else {
        $('#btn_tower_broken').removeClass('active');
    }
}

$(document).ready(function () {
    let search = '';
    dataTable = $('#tiang').DataTable({        
        scrollY: '380px',
        scrollCollapse: true,
        paging: false,
        pageLength: 100,
        // searching: false,
        bInfo: false,
        // bFilter: false,
        processing: true,
        serverSide: true,
        stateSave: true,
        columnDefs: [ {
            className: 'select-checkbox',
            targets:   0,
            'checkboxes': {
                'selectRow': true
            }
        } ],
        select: {
            style:    'multi',
            selector: 'td:first-child'
        },
        order: [[ 1, 'asc' ]],
        ajax: {
            "data":"json",
            "type": "GET",
            "url": "/api/tower?search="+search,
        },
        columns: [
            {data: 'id'},
            {data: 'lat'},
            {data: 'lng'},
        ]
    });

    $('#tiang_filter').addClass('d-none')
    $('#btn_find_route').click(() => {
        if (dataTable.rows({selected: true})[0].length > 0) {
            getRoute();
            $('#ui').addClass('d-none');
            $('#flying_info').removeClass('d-none');
            $('#distance_info').html(`Jarak: ${distance} Km.`)
            Towers.getBrokenTowers().forEach(v => v.setVisible(true))
        }
    })
    $('#btn_reset_route').click(() => {
        if (dataTable.rows({selected: true})[0].length > 0) {
            $('#ui').removeClass('d-none');
            $('#flying_info').addClass('d-none');
            Towers.getBrokenTowers().forEach(v => v.setVisible(false))
            resetRoute()
        }
    })
    
    $('#importBtn').click(() => {
        let form = document.querySelector('#importForm');
        form = new FormData(form);
        axios.post('/api/import', form, {
            headers: {
                "Content-Type": "multipart/form-data",
            }
        })
        .then((res) => {
            console.log(res);
            Swal.fire({
                icon: 'success',
                title: 'Import Successfully',
            })
        })
        .catch((err) => {
            console.log(err)
        })
    })
    
    $('#search-button').click(() => {
        if ($('#search_code').val().trim().length > 0) {
            $('#search-box').addClass('d-none');
            $('#tower').removeClass('d-none');
            $('#search_code').removeClass('is-invalid');
            dataTable.search($('#search_code').val()).draw()
        }else {
            $('#search_code').addClass('is-invalid');
        }
    })
    
    $('#back-button').click(() => {
        $('#search-box').removeClass('d-none');
        $('#tower').addClass('d-none');
    })
});
