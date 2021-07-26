   // GLOBAL settings in graph.js
   // http://microbuilder.io/blog/2016/01/10/plotting-json-data-with-chart-js.html


   //
   // get and sort JSON data from PHP
   //  
   DataArray = JSON.parse(DataArray);
//    console.log(DataArray)
   DataArray.shift();
//    console.log(DataArray)

   var time = DataArray.map(function(e) {
       return e.date;
       // return e.timestamp;
       // return moment(e.time, "DD.MM.YYYY hh:mm:ss", true);
   });
   var situation = DataArray.map(function(e) {
       return e.situations;
   });
   var comment = DataArray.map(function(e) {
       return e.comment;
   });
   var brainload = DataArray.map(function(e) {
       return e.brainload;
   });
   var mood = DataArray.map(function(e) {
       return e.mood;
   });
   var motivation = DataArray.map(function(e) {
       return e.motivation;
   });


   //
   // make first and last day
   //
   var lastDay = time[time.length - 1];
   lastDay = lastDay.substr(0, 10);
   lastDay = moment(lastDay, "DD.MM.YYYY", true)['_d'];
   lastDay.setDate(lastDay.getDate() + 1);
   lastDay = lastDay.getDate() + '.' + (lastDay.getMonth() + 1) + '.' + lastDay.getFullYear();
   var firstDay = time[0];
   firstDay = firstDay.substr(0, 10);


   // console.log(firstDay);
   // console.log(time);
   // console.log(situation);
   // console.log(comment);
   // console.log(brainload);
   // console.log(mood);
   // console.log(motivation);


   var myChart = new Chart(document.getElementById("brainChart").getContext("2d"), {
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
           tooltips: {
               enabled: false,
               intersect: false,
               mode: 'index',
               bodyFontSize: 14,
               bodyFontFamily: "'LibreBaskerville_Regular', 'Arial', sans-serif",
               bodySpacing: 5,

               custom: function(tooltipModel) {
                   // Tooltip Element
                   var tooltipEl = document.getElementById('chartjs-tooltip');

                   // Create element on first render
                   if (!tooltipEl) {
                       tooltipEl = document.createElement('div');
                       tooltipEl.id = 'chartjs-tooltip';
                       tooltipEl.innerHTML = '<div id="CustomTooltip"></div>';
                       document.body.appendChild(tooltipEl);
                   }

                   // Hide if no tooltip
                   if (tooltipModel.opacity === 0) {
                       tooltipEl.style.opacity = 0;
                       return;
                   }

                   // Set caret Position
                   tooltipEl.classList.remove('above', 'below', 'no-transform');
                   if (tooltipModel.yAlign) {
                       tooltipEl.classList.add(tooltipModel.yAlign);
                   } else {
                       tooltipEl.classList.add('no-transform');
                   }

                   function getBody(bodyItem) {
                       return bodyItem.lines;
                   }

                   //
                   // Set Text
                   //
                   if (tooltipModel.body) {
                       var titleLines = tooltipModel.title || [];
                       var bodyLines = tooltipModel.body.map(getBody);
                       var innerHtml = '';

                       //
                       // DATE
                       //
                       titleLines.forEach(function(title) {
                           innerHtml += '<div id=CTT_Date>' + title + '</div>';
                       });


                       //
                       // SITUATIONS
                       //
                       var TT_index = tooltipModel.dataPoints[0].index;
                    //    console.log(situation[TT_index])
                       innerHtml += '<div id=CTT_Situations>' + situation[TT_index] + '</div>';

                       //
                       // VALUES
                       //
                       innerHtml += '<table>';

                       bodyLines.forEach(function(body, i) {
                           var b_label = body[0].split(' ')[0];
                           var b_value = body[0].split(' ')[1];
                           var colors = tooltipModel.labelColors[i].backgroundColor;
                           var style = 'color:' + colors;
                           innerHtml += '<tr id=CTT_Values style="' + style + '"><td class=b_label>' + b_label + '</td><td class=b_value>' + b_value + '</td></tr>';
                       });
                       innerHtml += '</table>';


                       //
                       // COMMENT
                       //
                       innerHtml += '<div id=CTT_Comments>' + comment[TT_index] + '</div>';

                       //
                       // add tooltip to HTML
                       //
                       tooltipEl.querySelector('div#CustomTooltip').innerHTML = innerHtml;
                   }

                   // `this` will be the overall tooltip
                   var position = this._chart.canvas.getBoundingClientRect();
                   // Display, position, and set styles for font
                   tooltipEl.style.opacity = 1;
                   tooltipEl.style.position = 'absolute';
                   tooltipEl.style.left = position.left + window.pageXOffset + tooltipModel.caretX - tooltipModel.width + 'px';
                   tooltipEl.style.top = '100px';
                   tooltipModel.xAlign = "center";
                   //    console.log(tooltipModel)
                   //    tooltipEl.style.left = position.left + window.pageXOffset + tooltipModel.caretX + 'px';
                   //    tooltipEl.style.top = position.top + window.pageYOffset + tooltipModel.caretY + 'px';
                   tooltipEl.style.pointerEvents = 'none';
               }
           },
           scales: {
               xAxes: [{
                   type: 'time',
                   display: true,
                   // distribution: 'series',

                   distribution: 'linear',
                   time: {

                       parser: 'DD.MM.YYYY HH:mm',

                       tooltipFormat: 'DD.MM.YYYY HH:mm',
                       displayFormats: {
                           'millisecond': 'HH:mm',
                           'second': 'HH:mm',
                           'minute': 'HH:mm',
                           //    'hour': 'DD.MM.YYYY',
                           'hour': 'HH:mm',
                           'day': 'DD.MM.YYYY HH:mm',
                           'week': 'HH:mm',
                           'month': 'HH:mm',
                           'quarter': 'HH:mm',
                           'year': 'HH:mm',
                       },
                       // min:'22.07.2021',
                       // max:'24.07.2021',
                       min: firstDay,
                       max: lastDay,
                       unit: 'hour',
                       stepSize: 6,

                   },
                   ticks: {
                       fontColor: '#abb2bf',
                       fontSize: 16,
                       fontFamily: "'LibreBaskerville_Regular', 'Arial', sans-serif",
                       padding: 10,

                       //    bounds: 'ticks',
                       //    source: 'labels',
                       major: {
                           enabled: true,
                           stepSize: 24,
                           lineHeight: 2,
                           fontColor: '#abb2bf',
                           fontSize: 18,
                           fontFamily: "'LibreBaskerville_Regular', 'Arial', sans-serif",
                       },
                       callback: function(value, index, values) {
                           if (values[index] !== undefined) {
                               if (values[index].major == true) {
                                   return moment(values[index].value).format('DD.MM.');
                               } else {
                                   return value;
                               }
                           }
                       }
                   },
                   gridLines: {
                       drawBorder: true,
                       lineWidth: 2,
                   },
               }],
               yAxes: [{
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
           labels: time,
           radius: 5,

           datasets: [{
                   label: 'Brainload',
                   data: brainload,
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
               {
                   label: 'Mood',
                   data: mood,
                   backgroundColor: 'rgb(97, 174, 238)',
                   borderColor: 'rgb(97, 174, 238)',
                   pointStyle: 'circle',
                   radius: 10,
                   borderWidth: 1,
                   pointBorderColor: '#1b1e23',
                   pointHoverBorderColor: '#1b1e23',
                   pointHoverBackgroundColor: 'rgb(97, 174, 238)',
                   pointHoverBorderWidth: 0,
                   pointHoverRadius: 10,
                   lineTension: 0,
                   fill: false,
               },
               {
                   label: 'Motivation',
                   data: motivation,
                   backgroundColor: 'rgb(152, 195, 121)',
                   borderColor: 'rgb(152, 195, 121)',
                   pointStyle: 'circle',
                   radius: 10,
                   pointHoverBorderColor: '#1b1e23',
                   pointHoverBackgroundColor: 'rgb(152, 195, 121)',
                   pointHoverBorderWidth: 0,
                   pointHoverRadius: 10,
                   borderWidth: 1,
                   pointBorderColor: '#1b1e23',
                   lineTension: 0,
                   fill: false,
               }
           ]
       }
   });
 