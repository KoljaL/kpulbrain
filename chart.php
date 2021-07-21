<?php


//
// db connection
//
$db = new SQLite3('mood.sqlite', SQLITE3_OPEN_CREATE | SQLITE3_OPEN_READWRITE);


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
    <!-- <script src="https://cdn.jsdelivr.net/npm/chart.js"></script> -->
    <link rel="stylesheet" href="style.css">

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
    <!-- <div>
        <canvas id="myChart"></canvas>
    </div> -->

    <div class="container">
        <canvas id="examChart"></canvas>
    </div>


    <script>
    var ctx = document.getElementById("examChart").getContext("2d");


    var myChart = new Chart(ctx, {
        type: 'line',
        options: {

            tooltips: {

                bodyFontSize: 14,
                // bodyFontStyle: "bold",
                // bodyFontColor: '#FFFFFF',
                bodyFontFamily: "'LibreBaskerville_Regular', 'Arial', sans-serif",
                footerFontSize: 20,
                bodySpacing: 5,
                intersect: false,
                mode: 'index',


                callbacks: {
                    labelColor: function(tooltipItem, chart) {
                        var dataset = chart.config.data.datasets[tooltipItem.datasetIndex];
                        return {
                            backgroundColor: dataset.borderColor,
                            borderColor: 'rgb(0, 0, 0)',
                            borderWidth:0
                        }
                    },
                    labelTextColor: function(tooltipItem, chart) {
                        var dataset = chart.config.data.datasets[tooltipItem.datasetIndex];
                        return dataset.borderColor
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
                    footer: function(tooltipItem, data) {
                      // console.log(data['datasets'][0]['data'][tooltipItem[0]['index']]);
                      console.log(tooltipItem[0]['label']);
                      var time = "'"+tooltipItem[0]['label']+"'";
                      var comment = <?php getComment(?>time<?php ); ?>
                        var multistringText = ['<b>first string</b>'];
                        multistringText.push('another string');
                        return multistringText;
                    }
                }

            },


            scales: {
                xAxes: [{
                    type: 'time',
                    distribution: 'linear',
                    time: {
                        tooltipFormat: 'DD.MM.YYYY HH:mm:ss',
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
            labels: <?= $labelChart ?>,
            datasets: [{
                    label: 'Brainload',
                    fill: false,
                    borderColor: 'rgb(190, 80, 70)',
                    data: [<?=$brainloadChart?>],
                    borderWidth: 2
                },
                {
                    label: 'Mood',
                    fill: false,
                    borderColor: 'rgb(97, 174, 238)',
                    data: [<?=$moodChart?>],
                    borderWidth: 2
                },
                {
                    label: 'Motivation',
                    fill: false,
                    borderColor: 'rgb(152, 195, 121)',
                    data: [<?=$motivationChart?>],
                    borderWidth: 2
                }
            ]
        }
    });
    </script>
</body>
</html>