<?php
//
// config
//
$filename = 'db/user1.json';
$UID = 'UNIQUERANDOMUSERID';
$date = date("d.m.Y H:i:s");
 


//
// init db file
//
$handle = @fopen($filename, 'r+');
if ($handle == null){
    $handle = fopen($filename, 'w+');
    $dataArray = array('UID'=>$UID, 'date' => $date);           
    fwrite($handle, json_encode(array($dataArray)));
}


//
// write to db
//
if ($handle && !empty($_POST['situations'])){
    $dataArray['UID'] = $UID;
    $dataArray['date'] = $date;
    $dataArray = array_merge($dataArray,$_POST);
    unset($dataArray['submit']);    
    fseek($handle, 0, SEEK_END);
    if (ftell($handle) > 0){
        fseek($handle, -1, SEEK_END);
        fwrite($handle, ',', 1);
        fwrite($handle, json_encode($dataArray) . ']');
    } 
    fclose($handle);
}
// print_r($dataArray);


//
// get all data
//
$JSONdata = file_get_contents($filename, true);
$data = json_decode($JSONdata, true);
unset($data[0]);
// print json fiele
// header('Content-Type: application/json');
// print_r($data);
// exit;


/////////////////////////
//
// DATA
//
/////////////////////////

//
// get all difffenrent situations
//
$situations = array();
foreach ($data as $key => $value) {
  foreach ($value as $k => $v) {
      if ($k == 'situations'){
        // echo $v;
    //   $situation = (explode(",",$v));
      foreach ($v as $nr => $situation) {
        array_push($situations, trim($situation));
      }
    }
  }
}
$situations = array_filter(array_unique($situations));
// echo "<br>";
// print_r($situations);
// exit;


//
// print data as table
//
$datatable = '';
$data_r = array_reverse($data);
$datatable .= "<table class=allData>";
$datatable .= "<tr>";
$datatable .= "<td>UID</td>";
$datatable .= "<td>date</td>";
$datatable .= "<td>situation</td>";
$datatable .= "<td>brainload</td>";
$datatable .= "<td>mood</td>";
$datatable .= "<td>motivation</td>";
$datatable .= "<td>comment</td>";
$datatable .= "</tr>";
foreach ($data_r as $DatarowKey => $DatarowValue) {
    $datatable .= "<tr>";
    foreach ($DatarowValue as $ItemKey => $ItemValue) {
        if(is_array($ItemValue)){
            $ItemString = "";
            foreach ($ItemValue as $StringKey => $StringValue) {
                $ItemString .= $StringValue.", "; 
            }
            $datatable .= "<td class=datacell>".$ItemString."</td>";
        }else{
            $datatable .= "<td class=datacell>".$ItemValue."</td>";
        }
    }
    $datatable .= "</tr>";
}
$datatable .= "</table>";
// echo $datatable;
// exit;


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




















// //
// // db connection
// //
// $db = new SQLite3('assets/timestamp.sqlite', SQLITE3_OPEN_CREATE | SQLITE3_OPEN_READWRITE);


// //
// // init db
// //
// $db->query('CREATE TABLE IF NOT EXISTS "user_1" (
//   "id" INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
//   "time" DATETIME,
//   "timestamp" INTEGER,
//   "situation" VARCHAR,
//   "brainload" INTEGER,
//   "mood" INTEGER,
//   "motivation" INTEGER,
//   "comment" VARCHAR
// )');


// //
// // write to db
// //
// if(!empty($_POST['situations'])){
//     $situation = implode(", ",$_POST['situations']);
//     $brainload = $_POST['brainload'];
//     $mood = $_POST['mood'];
//     $motivation = $_POST['motivation'];
//     $comment = $_POST['comment'];
//     $date = date("d.m.Y H:i:s");
//     $timestamp = time();
//     $db->exec('BEGIN'); 
//     $db->query("INSERT INTO user_1 (situation,brainload, mood, motivation, comment,time, timestamp) 
//                 VALUES ('$situation', '$brainload','$mood','$motivation','$comment', '$date','$timestamp')");
//     $db->exec('COMMIT');
// }



// //
// // get all data
// //
// $results= $db->query("select * from user_1");
// $data = array();
// while ($res= $results->fetchArray(1)){
//   array_push($data, $res);
// }










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