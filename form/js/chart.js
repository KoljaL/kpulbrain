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
ChartData['Wirkung'] = [];
ChartData['Datetime'] = [];
ChartData['Medikation'] = [];
ChartData['Kommentar'] = [];
ChartData.Situationen = new Object;
ChartData['Timestamp'] = new Object;


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
    // ChartData['Datetime'] = Object.keys(localDataMood).map(function(key, index) {
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
for (let i = 0; i < allWirkungen.length; i++) {
    // fill ChartData Object with mood values
    ChartData.Wirkung[allWirkungen[i]] = Object.assign({}, Object.keys(localDataMood).map(function(key, index) {

        // ChartData['Wirkung'][allWirkungen[i]] = Object.keys(localDataMood).map(function(key, index) {
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

// ChartData['Medikation'] = Object.keys(localDataMood).map(function(key, index) {
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

// ChartData['Kommentar'] = Object.keys(localDataMood).map(function(key, index) {
    let value = localDataMood[key].comment;
    if (value) {
        return value;
    } else {
        return null;
    }
}));

deb(ChartData, 'ChartData')

//
// fill ChartData Object with Kommentar
//
ChartData.Situationen = Object.assign({}, Object.keys(localDataMood).map(function(key, index) {

// ChartData.Situationen = Object.keys(localDataMood).map(function(key, index) {
    let value = localDataMood[key].situations;
    if (value) {
        value = value.toString();
        value = value.replace(',', ', ');
        // deb(value,'Situationen')
        //  return Object.assign({}, value);
        return value;
    } else {
        return null;
    }
}));

deb(ChartData, 'ChartData')



































var ctx = document.getElementById('myChart');
var myChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        datasets: [{
            label: '# of Votes',
            data: [12, 19, 3, 5, 2, 3],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});