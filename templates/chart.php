<!DOCTYPE html>
<html lang="de">
<head>
    <meta charset="UTF-8">
    <title>Brain Overload</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="icon" type="image/svg+xml" href="templates/images/brain.png">
    <link rel="stylesheet" href="templates/style.css">
    <script src="templates/lib/Moment.js"></script>
    <script src="templates/lib/Chart.js"></script>
</head>
<body>
    <div id=links>
        <a href="index"><img src="templates/images/FormIcon.png" alt="FormIcon"></a>
    </div>
    <div class="container">
        <canvas id="brainChart"></canvas>
    </div>
    <script>
      var DataArray = <?= json_encode($JSONdata);?>;
    </script>
    <script src="templates/chart.js"></script>
</body>
</html>
