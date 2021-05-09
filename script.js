//var used
var sumNo = 0;
var sumYes = 0;

//for database (using firebase)
var db = firebase.database();
var task = db.ref('hasil-vote');

task.on('value', showData, showErr);


    } else if(add == 1){
        task.update({
            yes: sumYes+1
        })
    }
    updateChartValue()
}


//show Data
function showData(item){
    item.forEach((child) => {
        if(child.key == 'no'){
            sumNo = parseInt(child.val());
        } else {
            sumYes = parseInt(child.val());
        }
    })
    updateChartValue()
}

function showErr(err){
    console.log(err);
}

//for displaying chart id="voting-chart"
var ctx = document.getElementById('voting-chart').getContext('2d');
var myChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: ['No','Yes'],
        datasets: [{
            label: '# of Votes',
            data: [sumNo, sumYes],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
            ],
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        }
    }
});

//updating value in chart
function updateChartValue(){
    myChart.data.datasets[0].data[0] = sumNo;
    myChart.data.datasets[0].data[1] = sumYes;
    myChart.update()
}
