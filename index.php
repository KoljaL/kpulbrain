<?php
// print_r($_GET);
// print_r(basename($_SERVER['REQUEST_URI']));
// $basename = basename(__DIR__);
$case = basename($_SERVER['REQUEST_URI']);


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
    $_POST  = filter_input_array(INPUT_POST, FILTER_SANITIZE_STRING);  
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



if('chart' == $case){
  include 'templates/chart.php';
}
else{
  include 'templates/form.php';
}
?>










