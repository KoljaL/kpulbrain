let localData = JSON.parse(localStorage.getItem(localDataName)) || initObj;
let localDataProfil = localData.Profil;
let localDataMood = localData.Mood;

// deb(localData, 'localData')
// deb(localDataProfil, 'localDataProfil')
// deb(localDataMood, 'localDataMood')








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
// deb(allWirkungen, 'allWirkungen')





//
// CREATE ChartData
//
let ChartData = [];
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
    // ChartData.Color = new Object;
ChartData['Color'] = [];
for (let i = 0; i < Object.keys(localDataProfil.Wirkung).length; i++) {
    let localWirkung = localDataProfil.Wirkung[i];
    localWirkung = localWirkung.split("___");
    // deb(localWirkung,'localWirkung')
    if (allWirkungen.includes(localWirkung[0])) {
        ChartData['Color'][localWirkung[0]] = colorArray[localWirkung[1]];
        // ChartData.Color[localWirkung[0]] = localWirkung[1];
    }
}
// deb(ChartData['Color'],'ChartData['Color']')


//
// fill ChartData Object with Timestamp         // den timestamp doppelt zu speichern ist doch überflüssig--> kann raus
//
// ChartData.Timestamp = Object.assign({}, Object.keys(localDataMood).map(function(key, index) {
ChartData['Timestamp'] = Object.keys(localDataMood).map(function(key, index) {
    // return key *= 1000;
    return key *= 1; //.toString();
});

// deb(ChartData['Timestamp'])
//
// fill ChartData Object with datetime
//
// ChartData.Datetime = Object.assign({}, Object.keys(localDataMood).map(function(key, index) {
ChartData['Datetime'] = Object.keys(localDataMood).map(function(key, index) {
    let value = localDataMood[key].Datetime;
    if (value) {
        return value;
    } else {
        return null;
    }
});


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
// deb(ChartData, 'ChartData')


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
// ZOOM & PAN
//
const zoomOptions = {
    limits: {
        x: { min: 'original', max: 'original', minRange: 50 },
        y: { min: 'original', max: 'original', minRange: 50 }
    },
    pan: {
        enabled: true,
        mode: 'x',
    },
    zoom: {
        wheel: {
            enabled: true,
        },
        pinch: {
            enabled: true
        },
        mode: 'x',
        onZoomComplete({ chart }) {
            chart.update('none');
        }
    }
};


const scaleOpts = {
    reverse: true,
    ticks: {
        callback: (val, index, ticks) => index === 0 || index === ticks.length - 1 ? null : val,
    },
    grid: {
        borderColor: 'blue',
        color: 'rgba( 0, 0, 0, 0.1)',
    },
    title: {
        display: true,
        text: (ctx) => ctx.scale.axis + ' axis',
    }
};
const scales = {
    x: {
        position: 'top',
    },
    y: {
        position: 'right',
    },
};
Object.keys(scales).forEach(scale => Object.assign(scales[scale], scaleOpts));





//
// CHART LEGEND
//
const getOrCreateLegendList = (chart, id) => {
    const legendContainer = document.getElementById(id);
    let listContainer = legendContainer.querySelector('ul');
    if (!listContainer) {
        listContainer = document.createElement('ul');
        // listContainer.style.display = 'flex';
        // listContainer.style.flexDirection = 'row';
        listContainer.style.margin = 0;
        listContainer.style.padding = 0;
        legendContainer.appendChild(listContainer);
    }
    return listContainer;
};

const htmlLegendPlugin = {
    id: 'htmlLegend',
    afterUpdate(chart, args, options) {
        const ul = getOrCreateLegendList(chart, options.containerID);
        while (ul.firstChild) {
            ul.firstChild.remove();
        }
        const items = chart.options.plugins.legend.labels.generateLabels(chart);
        items.forEach(item => {
            const li = document.createElement('li');
            li.style.alignItems = 'center';
            li.style.cursor = 'pointer';
            li.style.display = 'flex';
            li.style.flexDirection = 'row';
            li.style.marginLeft = '10px';
            // deb(item.datasetIndex, 'item.datasetIndex')

            li.onclick = () => {
                chart.setDatasetVisibility(item.datasetIndex, !chart.isDatasetVisible(item.datasetIndex));
                chart.update();
            };
            // Text
            const textContainer = document.createElement('p');
            textContainer.style.color = item.fillStyle;
            textContainer.style.margin = 0;
            textContainer.style.padding = 0;
            textContainer.style.textDecoration = item.hidden ? 'line-through' : '';
            const text = document.createTextNode(item.text);
            textContainer.appendChild(text);
            li.appendChild(textContainer);
            ul.appendChild(li);
        });
    }
};



//
// CHART
//
Chart.defaults.font.family = "'Baskerville', 'Arial', sans-serif";
Chart.defaults.font.size = 16;

var myChart = new Chart(document.getElementById("ChartCanvas").getContext("2d"), {
    type: 'line',
    // events: ['click'],

    data: {
        // labels: ChartData.Datetime,
        // labels: Object.values(ChartData.Datetime),
        // labels: ChartData.Timestamp,
        labels: ChartData.Timestamp, //must be an array of integers with index 0: 1628362016454
        radius: 5,
        datasets: datasets,
    },
    options: {
        showLines: false,
        // events: ['click'],
        responsive: true,
        // maintainAspectRatio: false,
        aspectRatio: 1.25,
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
                // left: 10,
                // right: 10,
                top: -20,
                bottom: 20
            },
        },
        plugins: {
            htmlLegend: {
                containerID: 'ChartLegend',
            },
            legend: {
                display: false,
            },

            // zoom: zoomOptions,
            title: {
                display: true,
                position: 'top',
            },
            tooltip: {
                enabled: false,
                intersect: false,
                mode: 'index',
                bodyFontSize: 14,
                bodyFontFamily: "'LibreBaskerville_Regular', 'Arial', sans-serif",
                bodySpacing: 5,

                external: function(tooltipModel) {
                    // deb(tooltipModel.tooltip, 'tooltipModel.tooltip')
                    // deb(tooltipModel, 'tooltipModel')
                    function getBody(bodyItem) {
                        return bodyItem.lines;
                    }
                    if (tooltipModel.tooltip.body) {

                        const legendItems = tooltipModel.chart.boxes[0].legendItems;
                        // deb(legendItems,'legendItems')

                        let datasetIndex = tooltipModel.tooltip.dataPoints[0].datasetIndex;
                        let toottipDataIndex = tooltipModel.tooltip.dataPoints[0].dataIndex;
                        let toottipTimestamp = tooltipModel.tooltip.dataPoints[0].parsed.x;
                        let bodyLines = tooltipModel.tooltip.body.map(getBody);
                        // deb(bodyLines,'bodyLines')



                        //
                        // DATE
                        //
                        document.getElementById('ChartToolDate').innerHTML = formatdate(toottipTimestamp);

                        //
                        // MEDIKATION
                        //
                        let MedHTML = '';

                        // Medikation is an Object
                        let medObj = ChartData.Medikation[toottipDataIndex];
                        for (let i = 0; i < Object.keys(medObj).length; i++) {
                            var Dosierung = (medObj[i].Dosierung) ? medObj[i].Dosierung + ' mg ' : '';
                            var Medikament = (medObj[i].Medikament) ? medObj[i].Medikament : '';
                            var Zeitpunkt = (medObj[i].Zeitpunkt) ? medObj[i].Zeitpunkt + ' Uhr' : '';
                            MedHTML += '<div>' + Dosierung + '  ' + Medikament + ' ' + Zeitpunkt + ' </div>';
                        }

                        // Medikation is an Array
                        // for (const med of Object.entries(ChartData.Medikation[toottipDataIndex])){
                        //     deb(med,'med')
                        //     // deb(ChartData.Medikation[toottipDataIndex],'ChartData.Medikation[toottipDataIndex]')
                        //     var Dosierung = (med.Dosierung) ? med.Dosierung : '';
                        //     var Medikament = (med.Medikament) ? med.Medikament : '';
                        //     var Zeitpunkt = (med.Zeitpunkt) ? med.Zeitpunkt : '';
                        //     MedHTML += '<div>' + Dosierung + ' mg ' + Medikament + ' ' + Zeitpunkt + ' Uhr</div>';
                        // }
                        document.getElementById('ChartToolMedikation').innerHTML = MedHTML;

                        //
                        // SITUATIONS
                        //
                        document.getElementById('ChartToolSituation').innerHTML = ChartData.Situationen[toottipDataIndex];


                        //
                        // WIRKUNGEN
                        //

                        // array of labels and values
                        var LabelValue = [];
                        bodyLines.forEach(bodyLine => {
                            var LineLabel = bodyLine[0].split(' ')[0];
                            var LineValue = bodyLine[0].split(' ')[1];
                            LabelValue[LineLabel] = LineValue;
                        });



                        // deb(legendItems, 'legendItems')
                        let WirkHTML2 = '<table>';
                        legendItems.forEach(function(item, i) {
                            // lable name 
                            let lable = item.text;
                            // ID of lable
                            let datasetIndex = item.datasetIndex;
                            // get value from lable
                            let value = LabelValue[lable + ':'] || ' ';
                            // get fontcolor from fillcolor
                            let color = item.fillStyle || '';
                            color = 'color:' + color + ';';
                            // strike through if line is hidden 
                            let textDecoration = item.hidden ? 'line-through;' : 'none;';
                            textDecoration = 'text-decoration:' + textDecoration;
                            // fill output
                            WirkHTML2 += '<tr id=Wirkung_' + datasetIndex + ' onclick="hideLines(' + datasetIndex + ')" style="' + color + textDecoration + '">'
                            WirkHTML2 += '<td class=b_label>' + lable + '</td>'
                            WirkHTML2 += '<td class=b_value>' + value + '</td>'
                            WirkHTML2 += '</tr>';
                        });
                        WirkHTML2 += '</table>';
                        document.getElementById('ChartToolWirkungen').innerHTML = WirkHTML2;


                        //
                        // COMMENT
                        //
                        document.getElementById('ChartToolKommentar').innerHTML = ChartData.Kommentar[toottipDataIndex];
                    }
                }
            },
        },

        scales: {
            x1: {
                type: 'time',
                display: true,
                color: '#abb2bf',
                fontSize: 16,
                fontFamily: "serif",
                distribution: 'linear',
                // min: '03.08.2021',
                // max: '06.08.2021',
                time: {
                    tooltipFormat: 'dd.LLL.y HH:mm',
                    unit: "hour",
                    stepSize: 12,
                    displayFormats: {
                        hour: "HH:mm"
                    }
                },
                ticks: {
                    // autoSkip: false,
                    maxRotation: 0,
                    source: 'auto',
                    color: '#abb2bf',
                    fontSize: 16,
                    fontFamily: "'LibreBaskerville_Regular', 'Arial', sans-serif",
                    // padding: 10,
                },
                grid: {
                    drawBorder: false,
                    offsetGridLines: false,
                    lineWidth: 0,
                    drawOnChartArea: true,
                },
            },
            x2: {
                id: 'days',
                type: 'time',
                position: 'top',
                // type: 'timecenter',
                display: true,
                distribution: 'linear',
                time: {
                    displayFormats: {
                        day: 'd LLL',
                    },
                    // min: firstDay,
                    // max: lastDay,
                    unit: 'day',
                    stepSize: 1,
                },
                ticks: {
                    color: '#abb2bf',
                    Size: 18,
                    fontFamily: "'LibreBaskerville_Regular', 'Arial', sans-serif",
                    padding: 5,
                    align: 'start',

                    // callback: (value, index, values) => (index == (values.length - 1)) ? undefined : value,
                },
                grid: {
                    // color: '',
                    // tickColor: 'red',
                    // offsetGridLines: true,
                    drawBorder: false,
                    // borderColor: 'white',
                    // drawOnChartArea: false,
                    lineWidth: 3,
                },
            },
            y: {
                display: true,
                color: '#abb2bf',
                fontSize: 16,
                fontFamily: "serif",
                max: 100,
                min: 0,
                alignToPixels: true,
                ticks: {
                    color: '#abb2bf',
                    stepSize: 50,
                }
            }

        },




    },
    // plugins: [htmlLegendPlugin],
});


function hideLines(datasetIndex) {
    // deb(myChart)
    if ('none' == document.getElementById('Wirkung_' + datasetIndex).style.textDecoration) {
        document.getElementById('Wirkung_' + datasetIndex).style.textDecoration = 'line-through';
    } else {
        document.getElementById('Wirkung_' + datasetIndex).style.textDecoration = 'none';
    }
    myChart.setDatasetVisibility(datasetIndex, !myChart.isDatasetVisible(datasetIndex));
    myChart.update();
};


// deb(ChartData.Datetime)
// deb(luxon.DateTime.utc(1628159311))              1628141311
// console.log(luxon.DateTime.fromMillis(Math.trunc(1628190881126)).toISO())
// console.log(luxon.DateTime.fromMillis(1628159311).toISO())
// return moment(e.time, "DD.MM.YYYY hh:mm:ss", true);




//
// DAY IN THE MIDDLE
//
// 
// var TimeCenterScale = Chart.scaleService.getScaleConstructor('time').extend({
//     getPixelForTick: function(index) {
//         var ticks = this.getTicks();
//         if (index < 0 || index >= ticks.length) {
//             return null;
//         }
//         var px = this.getPixelForOffset(ticks[index].value);
//         var nextPx = this.right;
//         var nextTick = ticks[index + 1];
//         if (nextTick) {
//             nextPx = this.getPixelForOffset(nextTick.value);
//         }
//         return px + (nextPx - px) / 2;
//     },
// });
// var defaults = Chart.scaleService.getScaleDefaults('time');
// Chart.scaleService.registerScaleType('timecenter', TimeCenterScale, defaults);