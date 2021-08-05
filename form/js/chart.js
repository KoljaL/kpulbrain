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
ChartData.Color = new Object;
for (let i = 0; i < Object.keys(localDataProfil.Wirkung).length; i++) {
    let localWirkung = localDataProfil.Wirkung[i];
    localWirkung = localWirkung.split("___");
    // deb(localWirkung,'localWirkung')
    if (allWirkungen.includes(localWirkung[0])) {
        ChartData.Color[localWirkung[0]] = localWirkung[1];
    }
}
// deb(ChartData['Color'],'ChartData[Color]')


//
// fill ChartData Object with Timestamp
//
ChartData.Timestamp = Object.assign({}, Object.keys(localDataMood).map(function(key, index) {
    return key; // den timestamp doppelt zu speichern ist doch überflüssig--> kann raus
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
// deb(ChartData.Wirkungen[Unruhe], 'ChartData.Wirkungen.Unruhe')


deb(Object.values(ChartData.Timestamp))



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
    },

    data: {
        labels: Object.values(ChartData.Timestamp),
        radius: 5,



        datasets: [{
                label: 'Brainload',
                data: Object.values(ChartData.Wirkung.Unruhe),
                backgroundColor: 'rgb(190, 80, 70)',
                borderColor: 'rgb(190, 80, 70)',
                pointStyle: 'circle',
                radius: 10,
                borderWidth: 1,
                pointBorderColor: '#1b1e23',
                pointHoverBorderColor: '#1b1e23',
                pointHoverBackgroundColor: 'rgb(190, 80, 70)',
                pointHoverBorderWidth: 0,
                pointHoverRadius: 10,
                lineTension: 0,
                fill: false,
            },



        ]
    }
});











// var ctx = document.getElementById('myChart');
// var myChart = new Chart(ctx, {
//     type: 'bar',
//     data: {
//         labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
//         datasets: [{
//             label: '# of Votes',
//             data: [12, 19, 3, 5, 2, 3],
//             backgroundColor: [
//                 'rgba(255, 99, 132, 0.2)',
//                 'rgba(54, 162, 235, 0.2)',
//                 'rgba(255, 206, 86, 0.2)',
//                 'rgba(75, 192, 192, 0.2)',
//                 'rgba(153, 102, 255, 0.2)',
//                 'rgba(255, 159, 64, 0.2)'
//             ],
//             borderColor: [
//                 'rgba(255, 99, 132, 1)',
//                 'rgba(54, 162, 235, 1)',
//                 'rgba(255, 206, 86, 1)',
//                 'rgba(75, 192, 192, 1)',
//                 'rgba(153, 102, 255, 1)',
//                 'rgba(255, 159, 64, 1)'
//             ],
//             borderWidth: 1
//         }]
//     },
//     options: {
//         scales: {
//             y: {
//                 beginAtZero: true
//             }
//         }
//     }
// });