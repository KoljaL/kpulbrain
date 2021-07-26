<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

//
// SESSION
//
session_start();
unset($user_ID);

//
// CONFOG
//
$case = basename($_SERVER['REQUEST_URI']);
$url = (isset($_SERVER['HTTPS']) && 'on' === $_SERVER['HTTPS'] ? 'https' : 'http') . "://$_SERVER[HTTP_HOST]$_SERVER[REQUEST_URI]";
$session_lenght = 3000;
$pagename = "SecretServices";



//
// LOGIN 
//
if (isset($_POST['u_name']) && '' != $_POST['u_name'] && isset($_POST['u_password']) && '' != $_POST['u_password']) {
  $_SESSION['user_ID'] = md5($_POST['u_name'] . $_POST['u_password']);
  $_SESSION['logged_in'] = true;
}
if (isset($_SESSION['user_ID'])) {$user_ID = $_SESSION['user_ID'];}
if (isset($user_ID)) {$_SESSION['last_visit'] = time();}


//
// SESSION
//
if (!isset($_SESSION['last_visit'])){
  $_SESSION['last_visit'] = time();
}
if ('logout'== $case or  (time() - $_SESSION['last_visit'] > $session_lenght) ) {
	$_SESSION['login_ID'] = '';
  $_SESSION['logged_in'] = false;
  session_destroy();
  header('Location: ' . str_replace($case,'',$url));
}
if (!isset($_SESSION['logged_in'])) { 
  // print_r($_SESSION);
  include 'templates/login.php';
  exit;
}
// print_r($_SESSION);


//
// file config
//
$filename = $_SESSION['user_ID'].'.json';
$UID = $_SESSION['user_ID'];
$date = date("d.m.Y H:i:s");
$dir_db = 'db';


//
// init db file
//
if (!file_exists($dir_db)) {
  mkdir($dir_db, 0777, true);
}
$handle = @fopen($dir_db."/".$filename, 'r+');
if ($handle == null){
  // echo "new file";
    $handle = fopen($dir_db."/".$filename, 'w+');
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
$JSONdata = file_get_contents($dir_db."/".$filename, true);
$data = json_decode($JSONdata, true);
unset($data[0]);
// print json fiele
// header('Content-Type: application/json');
// print_r($data);
// exit;

 

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
// internal linksx
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


//
// enable debug function
//
if (@explode("_",$case)[1] == 'deb'){
  $case = explode("_",$case)[0];
  $deb = 1;
}else{
  $deb = 0;
}


//
// call template
//
if('chart' == $case){
  include 'templates/chart.php';
}
else{
  include 'templates/form.php';
}










// session_destroy();
// unset($_SESSION['logged_in']);
// print_r($_GET);
// print_r(basename($_SERVER['REQUEST_URI']));
// $basename = basename(__DIR__);











