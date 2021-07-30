<?php
// print_r(json_decode(file_get_contents('php://input'), true));


$filename = "files/".$_GET['n'].'.json';
$data = json_decode(file_get_contents('php://input'), true);


if($data){
    file_put_contents($filename, json_encode($data, JSON_PRETTY_PRINT));
}

// echo "JSON file:<pre>";
header('Content-Type: application/json');
print_r(file_get_contents($filename));