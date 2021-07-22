<?php


//
// db connection
//
$db = new SQLite3('timestamp.sqlite', SQLITE3_OPEN_CREATE | SQLITE3_OPEN_READWRITE);


//
// get all data
//
$results= $db->query("select * from user_1");
$data= array();
while ($res= $results->fetchArray(1)){
  // print_r($res);  
  // echo "<br>";
array_push($data, $res);
}

//
// print data as table
//
//   $data = array_reverse($data);
//   echo "<table class=allData>";
//   echo "<tr>";
//   echo "<td>id</td>";
//   echo "<td>time</td>";
//   echo "<td>situation</td>";
//   echo "<td>brainload</td>";
//   echo "<td>mood</td>";
//   echo "<td>motivation</td>";
//   echo "<td>comment</td>";
//   echo "</tr>";
//   foreach ($data as $key => $value) {
//     echo "<tr>";
//     foreach ($value as $k => $v) {
//       echo "<td>".$v."</td>";
//     }
//     echo "</tr>";
//   }
//   echo "</table>";
$brainloadChart = "";
$moodChart = "";
$motivationChart = "";
$labelChart = "[";
$comments = array();
foreach ($data as $key => $value) {

    foreach ($value as $k => $v) {

        if($k=="time"){
            // echo $v."<br>";
            $newdate = date("c",strtotime($v));
            // echo $newdate."<br>";
            $labelChart .= "\"".$newdate."\",";
            $brainloadChart .= "{ t:'".$newdate."',";
            $moodChart .= "{ t:'".$newdate."',";
              $motivationChart .= "{ t:'".$newdate."',";
        }

        if($k=="brainload"){
          $brainloadChart .= "y: ".$v."},";
        }
        if($k=="mood"){
          $moodChart .= "y: ".$v."},";
        }
        if($k=="motivation"){
          $motivationChart .= "y: ".$v."},";
        }

        
    }
    
}
$labelChart .= "]";
 

function getComment($date){
  global $data;
  foreach ($data as $key => $value) {
    if ($date == $value['time'])
   return $value['comment'];
  }
}


// echo getComment('21.07.2021 11:04:26');
// print_r($data);
// exit;
?>

<!DOCTYPE html>
<html lang="de">

<head>
    <meta charset="UTF-8">
    <title>Brain Overload</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <!-- <link rel="shortcut icon" href="favicon.ico"> -->
    <link rel="icon" type="image/svg+xml" href="brain.png">
    <link rel="stylesheet" href="style.css">



    <!-- <script src="https://cdn.jsdelivr.net/npm/chart.js"></script> -->
    <!-- <script src="https://cdn.jsdelivr.net/npm/chart.js@3.4.1/dist/chart.js"></script> -->
    <!-- <script src="https://cdn.jsdelivr.net/npm/chartjs-adapter-moment@1.0.0/dist/chartjs-adapter-moment.min.js"></script> -->

    <script src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.29.1/moment.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/chart.js@2.9.4/dist/Chart.js"></script>

    <style>
    .container {
        display: block;
        width: 80%;
        height: 554px !important;
    }
    </style>

</head>
<body>


    <div id=links>
        <a href="index.php">Formular</a>
        <a href="error">Formular debug</a>
        <a href="chart.php">Chart</a>
        <a href="error?e=chart">Chart debug</a>
        <a href="admin.php">DB</a>
    </div>
    <!-- <div>
        <canvas id="myChart"></canvas>
    </div> -->

    <div class="container">
        <canvas id="examChart"></canvas>
    </div>


    <script>
    // GLOBAL settings in graph.js
    // http://microbuilder.io/blog/2016/01/10/plotting-json-data-with-chart-js.html

    function getTimeString(date) {
        var day = date.getDate();
        var month = date.getMonth() + 1;
        var year = date.getFullYear();

        return day + '/' + month + '/' + year;
    }


    //
    // get and sort JSON data from PHP
    //  
    // console.log(< ?= json_encode($data);?>)
    var DataArray = <?= json_encode($data);?>;
    var time = DataArray.map(function(e) {
        // return e.timestamp;
        return moment(e.time, "DD.MM.YYYY hh:mm:ss", true);
    });
    var situation = DataArray.map(function(e) {
        return e.situation;
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

    // console.log(time);
    // console.log(situation);
    // console.log(comment);
    // console.log(brainload);
    // console.log(mood);
    // console.log(motivation);


    // console.log(moment('24/12/2019 09:15:00', "DD/MM/YYYY hh:mm:ss", true));

    var ctx = document.getElementById("examChart").getContext("2d");


    var myChart = new Chart(ctx, {
        type: 'line',
        options: {

            tooltips: {

                bodyFontSize: 14,
                bodyFontFamily: "'LibreBaskerville_Regular', 'Arial', sans-serif",
                footerFontSize: 20,
                footerFontColor: 'rgb(209, 154, 102)',
                TitleFontColor: 'rgb(9, 154, 102)',
                bodySpacing: 5,
                intersect: false,
                mode: 'index',
                footerMarginTop: 20,
                footerSpacing: 15,


                callbacks: {
                    labelColor: function(tooltipItem, chart) {
                        var dataset = chart.config.data.datasets[tooltipItem.datasetIndex];
                        return {
                            backgroundColor: dataset.borderColor,
                            borderColor: 'rgb(0, 0, 0)',
                            borderWidth: 0
                        }
                    },
                    labelTextColor: function(tooltipItem, chart) {
                        var dataset = chart.config.data.datasets[tooltipItem.datasetIndex];
                        return dataset.borderColor
                    },

                    title: function(tooltipItem, data) {
                        // console.log(data)
                        var niceDate = data['labels'][tooltipItem[0]['index']]
                        niceDate = moment(niceDate).format("DD.MM.YYYY hh:mm");

                    return niceDate;
                },


                // labelColor: function(context) {
                //       return {
                //           borderColor: 'rgb(0, 0, 255)',
                //           backgroundColor: 'rgb(255, 0, 0)',
                //           borderWidth: 2,
                //           borderDash: [2, 2],
                //           borderRadius: 2,
                //       };
                //   },
                //   labelTextColor: function(context) {
                //       return '#543453';
                //   },
                // title: function(tooltipItem, data) {
                //     return data['labels'][tooltipItem[0]['index']];
                // },
                // label: function(tooltipItem, data) {
                //     return data['datasets'][0]['data'][tooltipItem['index']];
                // },


                beforeTitle: function(tooltipItem, data) {
                    // console.log(data['datasets'][0]['data'][tooltipItem[0]['index']]);
                    // console.log(tooltipItem);
                    var indexNr = tooltipItem[0]['index'];
                    var situations = situation[indexNr];
                    return situations;
                },

                afterFooter: function(tooltipItem, data) {
                    // console.log(data['datasets'][0]['data'][tooltipItem[0]['index']]);
                    // console.log(tooltipItem);
                    var indexNr = tooltipItem[0]['index'];
                    var comments = comment[indexNr];
                    return comments;
                }


            }

        },


        scales: {
            xAxes: [{
                type: 'time',
                distribution: 'linear',
                time: {
                    tooltipFormat: 'DD.MM.YYYY HH:mm',
                    displayFormats: {
                        'millisecond': 'HH:mm',
                        'second': 'HH:mm',
                        'minute': 'HH:mm',
                        'hour': 'HH:mm',
                        'day': 'HH:mm',
                        'week': 'HH:mm',
                        'month': 'HH:mm',
                        'quarter': 'HH:mm',
                        'year': 'HH:mm',
                    },
                    unit: 'hour',
                    // round: 'hour',
                },
                ticks: {
                    // max: 50,
                    // min: 10,
                    stepSize: 2,
                }
            }]
        }
    },
    data: {
        labels: time,
        datasets: [{
                label: 'Brainload',
                fill: false,
                borderColor: 'rgb(190, 80, 70)',
                data: brainload,
                borderWidth: 2,
                // cubicInterpolationMode: false,
                lineTension: 0,
                // steppedLine: 'before',
                // fill: -1
            },
            {
                label: 'Mood',
                fill: false,
                borderColor: 'rgb(97, 174, 238)',
                data: mood,
                borderWidth: 2,
                lineTension: 0,

            },
            {
                label: 'Motivation',
                fill: false,
                borderColor: 'rgb(152, 195, 121)',
                data: motivation,
                borderWidth: 2,
                lineTension: 0,

            }
        ]
    }
    });
    </script>
</body>
</html>