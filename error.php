<?php
error_reporting( E_ALL );
ini_set( 'display_errors', '1' );

$error = 1; 
if (isset($_GET['e']) && $_GET['e'] == "chart"){
    include 'chart.php';
}else{
    include 'index.php';
}
// include 'admin.php';



