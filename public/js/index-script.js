
// baca firebase

var db = firebase.database();
var votingHasil = db.ref('hasil-voting');

// init svariable
let provinceArr = [];

votingHasil.on('value', showData, showError);

function showData(items){
    let provinceTemp = [];
    provinceArr = provinceTemp
    items.forEach((item) => {
        provinceTemp.push([item.val()]);
    })
    visualize();
    updateNational();
}

function visualize(){
    let daerah = "aceh";
}

function showError(err){
    console.log(err);
}

// chart yes no nasional
var ctx = document.getElementById('chart-yes-no');
var nationalChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: ['yes', 'no'],
        datasets: [{
            label: 'My Data Sets',
            data: [0, 0],
            backgroundColor: [
                'rgb(54, 162, 235)',
                'rgb(255, 99, 132)'
            ],
            hoverOffset: 4
        }]
    },
    options: {
        responsive: true,
	maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'People Who Have Taken an Act'
            }
        }
    }
})

// update chart nasional

function updateNational(){
    nationalChart.data.datasets[0].data = [provinceArr[1][0]['yes'], provinceArr[1][0]['no']]
    nationalChart.update()
}

// chart yes no per daerah

var ctxD = document.getElementById('chart-per-daerah');
var daerahChart = new Chart(ctxD, {
    type: 'doughnut',
    data: {
        labels: ['sangat tidak puas', 'tidak puas', 'biasa saja', 'puas', 'sangat puas'],
        datasets: [{
            label: 'My Data Sets',
            data: [0,0,0,0,0],
            backgroundColor: [
                'rgb(255, 99, 132)',
                'rgb(54, 162, 235)',
                'rgb(255, 99, 132)',
                'rgb(255, 99, 132)',
                'rgb(54, 162, 235)'
            ],
            hoverOffset: 4
        }]
    },
    options: {
        responsive: true,
	maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Provinces\' Air Quality Satisfaction'
            }
        }
    }
})

var ctxYN = document.getElementById('nasionalYesNo')
var daerahChartYesNo = new Chart(ctxYN, {
    type: 'doughnut',
    data: {
        labels: ['sangat tidak puas', 'tidak puas', 'biasa saja', 'puas', 'sangat puas'],
        datasets: [{
            label: 'My Data Sets',
            data: [0,0,0,0,0],
            backgroundColor: [
                'rgb(143, 11, 11)',
                'rgb(245, 12, 12)',
                'rgb(237, 220, 31)',
                'rgb(255, 99, 132)',
                'rgb(36, 113, 237)'
            ],
            hoverOffset: 4
        }]
    },
    options: {
	maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'National\'s Air Quality Satisfaction'
            }
        }
    }
})


function findDaerah(){
    var daerah = document.getElementById('namaDaerah').value;
    showDaerah(daerah);
}

function showDaerah(daerah){
    let tempArr = [];
    for(var i=1;i<=5;i++){
        tempArr.push(provinceArr[0][0][daerah][i])
    }

    let tempArrYesNo = [];
    for(var i=1;i<=5;i++){
        tempArrYesNo.push(provinceArr[1][0][i])
    }

    //daerahChartYesNo.data.datasets[0].data = [provinceArr[0][0][nasional]['yes'], provinceArr[0][0][nasional]['no']]
    daerahChartYesNo.data.datasets[0].data = tempArrYesNo
    daerahChartYesNo.update()

    daerahChart.data.datasets[0].data = tempArr
    daerahChart.update()
}

// tempat untuk animasi slide
ScrollReveal().reveal('.overlay', {duration: 1000});
ScrollReveal().reveal('.tempat-map', {duration: 1000});
