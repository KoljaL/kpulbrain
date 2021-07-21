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
$labelChart = "[";
foreach ($data as $key => $value) {

    foreach ($value as $k => $v) {

        if($k=="time"){
            // echo $v."<br>";
            $newdate = date("c",strtotime($v));
            // echo $newdate."<br>";
            $labelChart .= "\"".$newdate."\",";
            $brainloadChart .= "{ t:'".$newdate."',";

        
        }

        
        if($k=="brainload"){
            // echo $v."<br>";
            // $newdate = date("c",strtotime($v));
            // echo $newdate."<br>";
            $brainloadChart .= "y: ".$v."},";
        
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
    
    <script src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.29.1/moment.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/chart.js@2.9.4/dist/Chart.min.js"></script>

    <style>

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
    scales: {
      xAxes: [{
        type: 'time',
      }]
    }
  },
  data: {
    // labels: ["2015-03-15T13:03:00Z", "2015-03-15T13:02:00Z", "2015-03-16T14:12:00Z"],
    labels: <?= $labelChart ?>,
    datasets: [{
      label: 'Demo',
      borderColor: 'rgb(255, 99, 132)',
      data: [ <?= $brainloadChart?> ],
    //   data: [{
    //       t: '2015-03-15T13:03:00Z',
    //       y: 12
    //     },
    //     {
    //       t: '2015-03-15T13:06:00Z',
    //       y: 21
    //     },
    //     {
    //       t: '2015-03-16T14:12:00Z',
    //       y: 32
    //     }
    //   ]
      borderWidth: 1
    }]
  }
});



    const labels = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
    ];
    const data = {
        labels: labels,
        datasets: [{
            label: 'My First dataset',
            backgroundColor: 'rgb(255, 99, 132)',
            borderColor: 'rgb(255, 99, 132)',
            data: [0, 10, 5, 2, 20, 30, 45],
        }]
    };
    const config = {
        type: 'line',
        data,
        options: {}
    };


    var myChart = new Chart(
        document.getElementById('myChart'),
        config
    );
    </script>
</body>
</html>