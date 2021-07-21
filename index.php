<!DOCTYPE html>
<html lang="de">

<head>
    <meta charset="UTF-8">
    <title>Brain Overload</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <!-- <link rel="shortcut icon" href="favicon.ico"> -->
    <link rel="icon" type="image/svg+xml" href="brain.png">
    <link rel="stylesheet" href="style.css">
    <style>

    </style>

</head>
<body>


    <?php


//
// db connection
//
$db = new SQLite3('mood.sqlite', SQLITE3_OPEN_CREATE | SQLITE3_OPEN_READWRITE);

//
// init db
//
$db->query('CREATE TABLE IF NOT EXISTS "user_1" (
  "id" INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
  "time" DATETIME,
  "situation" VARCHAR,
  "brainload" INTEGER,
  "mood" INTEGER,
  "motivation" INTEGER,
  "comment" VARCHAR
)');



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
        // echo "-".trim($sit)."-<br>";
        array_push($situations, trim($sit));
      }
    }
  }
}
$situations = array_filter(array_unique($situations));
// print_r($situations);

// exit;
?>


    <div id="content">
        <form action="" method="POST" name=form>
            <fieldset>
                <legend>How do you feel?</legend>
                <!-- SITUATIONS -->
                <label class="itemLabel situation" for=situation>Situation: </label>
                <div class=SituationCheckboxes>
                    <?php
            foreach ($situations as $key => $value) {
              $id = random_int(1000,9999);
              echo "<input type=checkbox class=hidden_checkbox id=$id name=situations[] value=$value>";
              echo "<label class=text_checkbox for=$id>$value</label>";
            }
            echo "<input type=text class=newSituation id=xxx name=situations[] placeholder='new situation'>";
          ?>
                </div>
                <!-- SLIDER  -->
                <label class="itemLabel brainload" for=brainloadSlider>Brainload: </label>
                <div id=brainloadSliderOutput></div>
                <input type="range" min="0" max="100" value="0" step="10" class="slider brainload" id=brainloadSlider name=brainload>
                <!-- SLIDER  -->
                <label class="itemLabel mood" for=moodSlider>Mood: </label>
                <div id=moodSliderOutput></div>
                <input type="range" min="0" max="100" value="0" step="10" class="slider mood" id=moodSlider name=mood>
                <!-- SLIDER  -->
                <label class="itemLabel motivation" for=motivationSlider>Motivation: </label>
                <div id=motivationSliderOutput></div>
                <input type="range" min="0" max="100" value="0" step="10" class="slider motivation" id=motivationSlider name=motivation>
                <!-- COMMENT -->
                <label class="itemLabel comment" for=comment>Comment: </label>
                <textarea name="comment" id="comment"></textarea>
                <!-- BUTTON -->
                <input type="submit" class=button value="Submit" name="submit">
            </fieldset>
        </form>
    </div>
    <script>
    // get slider values
    document.getElementById("motivationSliderOutput").innerHTML = document.getElementById("motivationSlider").value;
    document.getElementById("moodSliderOutput").innerHTML = document.getElementById("moodSlider").value;
    document.getElementById("brainloadSliderOutput").innerHTML = document.getElementById("brainloadSlider").value;
    // change on input
    document.getElementById("motivationSlider").oninput = function() {
        document.getElementById("motivationSliderOutput").innerHTML = this.value;
    }
    document.getElementById("moodSlider").oninput = function() {
        document.getElementById("moodSliderOutput").innerHTML = this.value;
    }
    document.getElementById("brainloadSlider").oninput = function() {
        document.getElementById("brainloadSliderOutput").innerHTML = this.value;
    }
    </script>
</body>
</html>




<?php 
if (1 == $error){
  echo "<br><br><br>POST: ";
  print_r($_POST);
  echo "<br><br><br>";
}







//
// write to db
//
if(!empty($_POST)){
  $situation = implode(", ",$_POST['situations']);
  $brainload = $_POST['brainload'];
  $mood = $_POST['mood'];
  $motivation = $_POST['motivation'];
  $comment = $_POST['comment'];
  $date = date("d.m.Y H:i:s");
  $db->exec('BEGIN'); 
  $db->query("INSERT INTO user_1 (situation,brainload, mood, motivation, comment,time) 
              VALUES ('$situation', '$brainload','$mood','$motivation','$comment', '$date')");
  $db->exec('COMMIT');
}


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
if (1 == $error){
  $data = array_reverse($data);
  echo "<table class=allData>";
  echo "<tr>";
  echo "<td>id</td>";
  echo "<td>time</td>";
  echo "<td>situation</td>";
  echo "<td>brainload</td>";
  echo "<td>mood</td>";
  echo "<td>motivation</td>";
  echo "<td>comment</td>";
  echo "</tr>";
  foreach ($data as $key => $value) {
    echo "<tr>";
    foreach ($value as $k => $v) {
      echo "<td>".$v."</td>";
    }
    echo "</tr>";
  }
  echo "</table>";
}