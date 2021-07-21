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

// echo $labelChart."<br>";
// echo $brainloadChart."<br>";

//   exit;

//   labels: ["2015-03-15T13:03:00Z", "2015-03-15T13:02:00Z", "2015-03-16T14:12:00Z"],

//   {
//     t: '2015-03-15T13:03:00Z',
//     y: 12
//   },


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
    <script src="https://cdn.jsdelivr.net/npm/apexcharts"></script>

    <style>
    /* .container {
        display: block;
        width: 80%;
        height: 554px !important;
    } */
    </style>

</head>
<body>
    <!-- <div>
        <canvas id="myChart"></canvas>
    </div> -->

    <div id="chart">
    </div>


    <script> 
    var options = {
  chart: {
    type: 'line'
  },
  series: [{
    name: 'sales',
    data: [30,40,35,50,49,60,70,91,125]
  },
  {
    name: 'wedw',
    data: [30,30,45,50,49,60,70,91,125]
  }],
  xaxis: {
    categories: [1991,1992,1993,1994,1995,1996,1997, 1998,1999]
  }
}

var chart = new ApexCharts(document.querySelector("#chart"), options);

chart.render();
    </script>
</body>
</html>