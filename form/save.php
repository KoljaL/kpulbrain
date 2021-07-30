<?php



// print_r(json_decode(file_get_contents('php://input'), true));

$data = json_decode(file_get_contents('php://input'), true);


if($data){
    file_put_contents("save.json", json_encode($data, JSON_PRETTY_PRINT));
}
// $str_json = file_get_contents('php://input');
// file_put_contents("save.json", json_encode($str_json));

echo "JSON file:<pre>";
print_r(file_get_contents('save.json'));