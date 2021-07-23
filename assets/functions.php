<?php


//
// db connection
//
$db = new SQLite3('assets/timestamp.sqlite', SQLITE3_OPEN_CREATE | SQLITE3_OPEN_READWRITE);


//
// init db
//
$db->query('CREATE TABLE IF NOT EXISTS "user_1" (
  "id" INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
  "time" DATETIME,
  "timestamp" INTEGER,
  "situation" VARCHAR,
  "brainload" INTEGER,
  "mood" INTEGER,
  "motivation" INTEGER,
  "comment" VARCHAR
)');


//
// write to db
//
if(!empty($_POST['situations'])){
    $situation = implode(", ",$_POST['situations']);
    $brainload = $_POST['brainload'];
    $mood = $_POST['mood'];
    $motivation = $_POST['motivation'];
    $comment = $_POST['comment'];
    $date = date("d.m.Y H:i:s");
    $timestamp = time();
    $db->exec('BEGIN'); 
    $db->query("INSERT INTO user_1 (situation,brainload, mood, motivation, comment,time, timestamp) 
                VALUES ('$situation', '$brainload','$mood','$motivation','$comment', '$date','$timestamp')");
    $db->exec('COMMIT');
}


//
// get all data
//
$results= $db->query("select * from user_1");
$data= array();
while ($res= $results->fetchArray(1)){
  array_push($data, $res);
}


//
// get all difffenrent situations
//
$situations = array();
foreach ($data as $key => $value) {
  foreach ($value as $k => $v) {
    if ($k == 'situation'){
      $situation = (explode(",",$v));
      foreach ($situation as $nr => $sit) {
        array_push($situations, trim($sit));
      }
    }
  }
}
$situations = array_filter(array_unique($situations));
// print_r($situations);


//
// print data as table
//
$datatable = '';
$data_r = array_reverse($data);
$datatable .= "<table class=allData>";
$datatable .= "<tr>";
$datatable .= "<td>id</td>";
$datatable .= "<td>time</td>";
$datatable .= "<td>timestamp</td>";
$datatable .= "<td>situation</td>";
$datatable .= "<td>brainload</td>";
$datatable .= "<td>mood</td>";
$datatable .= "<td>motivation</td>";
$datatable .= "<td>comment</td>";
$datatable .= "</tr>";
foreach ($data_r as $key => $value) {
    $datatable .= "<tr>";
    foreach ($value as $k => $v) {
    $datatable .= "<td class=datacell>".$v."</td>";
    }
    $datatable .= "</tr>";
}
$datatable .= "</table>";

// echo $datatable;


//
// internal links
//
$links = <<< HTML
<div id=links>
    <a href="index.php">Formular</a>
    <a href="error">Formular debug</a>
    <a href="chart.php">Chart</a>
    <a href="error?e=chart">Chart debug</a>
    <a href="assets/admin.php">DB</a>
</div>
HTML;




























// if (1 == $error){
//     $POST = <<< HTML
//     <br><br><br>POST: 
//     print_r($_POST);
//     <br><br><br>
//     HTML;
//   }
  
  
  
  
  
  
  

  
  
  //
  // db connection
  //
//   $db = new SQLite3('timestamp.sqlite', SQLITE3_OPEN_CREATE | SQLITE3_OPEN_READWRITE);
  
  //
  // get all data
  //
//   $results= $db->query("select * from user_1");
//   $data= array();
//   while ($res= $results->fetchArray(1)){
    // print_r($res);  
    // echo "<br>";
//   array_push($data, $res);
//   }
  
  //
  // print data as table
  //



//
// get all data
//
// $db = new SQLite3('timestamp.sqlite', SQLITE3_OPEN_CREATE | SQLITE3_OPEN_READWRITE);
// $results= $db->query("select * from user_1");
// $data= array();
// while ($res= $results->fetchArray(1)){
  // print_r($res);  
  // echo "<br>";
// array_push($data, $res);
// }

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

// print_r($data);
// exit;