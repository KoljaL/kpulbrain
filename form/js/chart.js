let localData = JSON.parse(localStorage.getItem(localDataName)) || initObj;
let localDataProfil = localData.Profil;
let localDataMood = localData.Mood;
deb(localDataProfil, 'localDataProfil')
deb(localDataMood, 'localDataMood')




// var Datetime = localDataMood.map(function(e) {
//     return e.Datetime;
// });







//
// search all localDataMood Items for Wirkungen & store unique ones in array
//
let allWirkungen = [];
for (const key in localDataMood) {
    const ItemMoods = localDataMood[key].mood;
    // deb(ItemMoods, 'ItemMoods');
    allWirkungen.push(Object.keys(ItemMoods))
}
allWirkungen = allWirkungen.flat();
allWirkungen = allWirkungen.filter((item, index) => { return (allWirkungen.indexOf(item) == index) });
deb(allWirkungen, 'allWirkungen')





//
// CREATE ChartData
//
let ChartData = new Object;
// ChartData['Datetime'] = new Object;
// ChartData['Medikation'] = new Object;
// ChartData['Kommentar'] = new Object;
// ChartData.Situationen = new Object;
// ChartData['Timestamp'] = new Object;


//
// fill ChartData Object with Color
// 
var colorArray = {
        bluegreen: "#56b6c2",
        blue: "#61aeee",
        pink: "#c678dd",
        salomon: "#e06c75",
        green: "#98c379",
        red: "#be5046",
        orange: "#d19a66",
        yellow: "#e6c07b"
    }
    // deb(colorArray,'colorArray')
ChartData.Color = new Object;
for (let i = 0; i < Object.keys(localDataProfil.Wirkung).length; i++) {
    let localWirkung = localDataProfil.Wirkung[i];
    localWirkung = localWirkung.split("___");
    // deb(localWirkung,'localWirkung')
    if (allWirkungen.includes(localWirkung[0])) {
        ChartData.Color[localWirkung[0]] = colorArray[localWirkung[1]];
        // ChartData.Color[localWirkung[0]] = localWirkung[1];
    }
}
// deb(ChartData.Color,'ChartData.Color')


//
// fill ChartData Object with Timestamp         // den timestamp doppelt zu speichern ist doch überflüssig--> kann raus
//
ChartData.Timestamp = Object.assign({}, Object.keys(localDataMood).map(function(key, index) {
    // return key*= 1000; 
    return key; 
}));


//
// fill ChartData Object with datetime
//
ChartData.Datetime = Object.assign({}, Object.keys(localDataMood).map(function(key, index) {
    let value = localDataMood[key].Datetime;
    if (value) {
        return value;
    } else {
        return null;
    }
}));


//
// fill ChartData Object with Wirkung       WIRKUNG IS ARRAY !!!
// loop through allWirkungen
//
ChartData.Wirkung = new Object;
for (let i = 0; i < allWirkungen.length; i++) {
    // fill ChartData Object with mood values
    ChartData.Wirkung[allWirkungen[i]] = Object.assign({}, Object.keys(localDataMood).map(function(key, index) {
        let value = localDataMood[key].mood[allWirkungen[i]];
        if (value) {
            // deb(allWirkungen[i], 'allWirkungen[i]')
            // deb(localDataMood[key].mood[allWirkungen[i]], 'localDataMood[key]')
            return value;
        } else {
            return null;
        }
    }));
}


//
// fill ChartData Object with Medikation  MEDIKATION IS ARRAY !!!
//
ChartData.Medikation = Object.assign({}, Object.keys(localDataMood).map(function(key, index) {
    let value = localDataMood[key].Medikation;
    // // flatten array?
    // deb(value)
    // value.forEach(element => {
    //     deb(element)
    // });
    if (value) {
        return value;
    } else {
        return null;
    }
}));


//
// fill ChartData Object with Kommentar
//
ChartData.Kommentar = Object.assign({}, Object.keys(localDataMood).map(function(key, index) {
    let value = localDataMood[key].comment;
    if (value) {
        return value;
    } else {
        return null;
    }
}));


//
// fill ChartData Object with Situationen
//
ChartData.Situationen = Object.assign({}, Object.keys(localDataMood).map(function(key, index) {
    // deb(localDataMood[key], 'localDataMood[key]')
    let value = localDataMood[key].situations;
    if (value) {
        // deb(Object.values(value), 'Object.values(value)');
        value = Object.values(value);
        value = value.toString();
        value = value.replace(',', ', ');
        // deb(value, 'value')
        return value;
    } else {
        return null;
    }
}));
deb(ChartData, 'ChartData')
 

//
// create datasets
//
let datasets = [];
for (i = 0; i < allWirkungen.length; i++) {
    // deb(allWirkungen[i])
    datasets[i] = {
        label: allWirkungen[i],
        data: Object.values(ChartData.Wirkung[allWirkungen[i]]),
        backgroundColor: ChartData.Color[allWirkungen[i]],
        borderColor: ChartData.Color[allWirkungen[i]],
        pointStyle: 'circle',
        radius: 10,
        borderWidth: 1,
        pointBorderColor: '#1b1e23',
        pointHoverBorderColor: '#1b1e23',
        pointHoverBackgroundColor: ChartData.Color[allWirkungen[i]],
        pointHoverBorderWidth: 0,
        pointHoverRadius: 10,
        lineTension: 0,
        fill: false,
    }
}
// deb(datasets, 'datasets')


//
// CHART
//
var myChart = new Chart(document.getElementById("myChart").getContext("2d"), {
    type: 'line',
    options: {
        showLines: false,
        // events: ['click'],

        // for better performance
        animation: {
            duration: 0,
        },
        hover: {
            animationDuration: 0,
        },
        responsiveAnimationDuration: 0,

        layout: {
            padding: {
                left: 10,
                right: 10,
                top: 10,
                bottom: 10
            },
        },
        legend: {
            display: true,
            position: 'top',
            align: 'start',
            fullWidth: false,
            labels: {
                fontColor: '#abb2bf',
                fontSize: 14,
                fontFamily: "'LibreBaskerville_Regular', 'Arial', sans-serif",
                usePointStyle: true,
            },

        },
        scales: {
            // x: {
            //     type: 'time',    
            //     display: true,
            //     distribution: 'linear',
            //     time: {
            //         unit: 'hour',
            //         stepSize: 6,
            //         // parser: 'dd.MM.yyyy HH:mm',
            //         displayFormats: {
            //             // 'hour': 'dd.MM.yyyy',
            //             'hour': 'HH:mm',
            //         },
            //         min: '04.08.2021',
            //         max: '05.08.2021',
            //     }
            // }

            x: 
            // [
                {
                    // id: 'hours',
                    type: 'time',
                    display: true,
                    distribution: 'linear',
                    time: {
                        // parser: 'DD.MM.YYYY HH:mm',
                        // tooltipFormat: 'DD.MM.YYYY HH:mm',
                        displayFormats: {
                            //    'hour': 'DD.MM.YYYY',
                            'hour': 'HH:mm',
                        },
                    min: 1628076511,
                    max: 1628162911,
                        unit: 'hour',
                        stepSize: 6,
                    },
                    ticks: {
                        fontColor: '#abb2bf',
                        fontSize: 16,
                        fontFamily: "'LibreBaskerville_Regular', 'Arial', sans-serif",
                        padding: 10,
                    },
                    gridLines: {
                        drawBorder: false,
                        offsetGridLines: false,
                        lineWidth: 2,
                        drawOnChartArea: true,

                    },
                },
            // {
            //     id: 'days',
            //     type: 'time',
            //     display: true,
            //     distribution: 'linear',
            //     time: {
            //         // parser: 'DD.MM.YYYY HH:mm',
            //         // tooltipFormat: 'DD.MM.YYYY HH:mm',
            //         displayFormats: {
            //             'day': 'DD.MM.YYYY',
            //         },
            //         // min: firstDay,
            //         // max: lastDay,
            //         unit: 'day',
            //         stepSize: 1,
            //     },
            //     ticks: {
            //         fontColor: '#abb2bf',
            //         fontSize: 16,
            //         fontFamily: "'LibreBaskerville_Regular', 'Arial', sans-serif",
            //         padding: -10,
            //         callback: (value, index, values) => (index == (values.length - 1)) ? undefined : value,
            //     },
            //     gridLines: {
            //         offsetGridLines: false,
            //         drawBorder: false,
            //         drawOnChartArea: true,
            //         lineWidth: 0,
            //     },
            // }
            // ],
            y: [{
                gridLines: {
                    drawBorder: true,
                    lineWidth: 2,

                },
                ticks: {
                    fontColor: '#abb2bf',
                    fontSize: 16,
                    fontFamily: "'LibreBaskerville_Regular', 'Arial', sans-serif",
                    max: 100,
                    min: 0,
                    stepSize: 20,
                },
            }],

        }
    },

    data: {
        // labels: Object.values(ChartData.Datetime),
        labels: Object.values(ChartData.Timestamp).map(e => e * 1),
        radius: 5,
        datasets: datasets,
    }
});