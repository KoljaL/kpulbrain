<!DOCTYPE html>
<html lang="de">
<head>
    <meta charset="UTF-8">
    <title>Brain Overload</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="icon" type="image/svg+xml" href="templates/images/brain.png">
    <link rel="stylesheet" href="templates/style.css">
</head>
<body>
    <div id=links>
        <a href="chart"><img src="templates/images/ChartIcon.png" alt="ChartIcon"></a>
    </div>
    <div id=logout>
        <a href="logout"><img src="templates/images/ChartIcon.png" alt="ChartIcon"></a>
    </div>
    <div id="content">
        <form action="<?php htmlspecialchars($_SERVER['PHP_SELF']) ?>" method="POST" name=form autocomplete=off>
            <fieldset>
                <legend>How do you feel?</legend>

                <!-- SITUATIONS -->
                <label class="itemLabel situation" for=situation>Situation: </label>
                <div id=SituationCheckboxes>
                    <?php
                      foreach ($situations as $key => $value) {
                        $id = random_int(1000,9999);
                        echo "<input type=checkbox class=hidden_checkbox id=$id name=situations[] value=$value>";
                        echo "<label class=text_checkbox for=$id>$value</label>";
                      }
                      echo "<input type=text class=newSituation name=situations[] placeholder='new situation'>";
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
                <input type="submit" id=submitButton class=button value="Submit" name="submit" disabled>
            </fieldset>
        </form>
    </div>
    <?php
      if($deb){
        echo $datatable; 
      }
    ?>
    <script src="templates/form.js"></script>
</body>
</html>