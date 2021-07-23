<?php
$case = 'chart';
include 'assets/functions.php';
?>
<!DOCTYPE html>
<html lang="de">
<head>
    <meta charset="UTF-8">
    <title>Brain Overload</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="icon" type="image/svg+xml" href="assets/brain.png">
    <link rel="stylesheet" href="assets/style.css">
    <script src="assets/Moment.js"></script>
    <script src="assets/Chart.js"></script>
</head>
<body>
    <div id=links>
        <a href="index.php"><img src="assets/FormIcon.png" alt="FormIcon"></a>
    </div>
    <div class="container">
        <canvas id="brainChart"></canvas>
    </div>
    <script>
      var DataArray = <?= json_encode($data);?>;
    </script>
    <script src="assets/BO_Chart.js"></script>
</body>
</html>
