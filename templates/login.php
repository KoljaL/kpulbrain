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
    <div id="content">
        <form action="<?php htmlspecialchars($_SERVER['PHP_SELF']) ?>" method="POST" name=form autocomplete=off>
            <fieldset>
                <legend>Login</legend>
                <label class="itemLabel situation" for=situation>Name: </label>
                <input type="text" placeholder="name" name="u_name" class=newSituation value="ADXS">
                <br>
                <label class="itemLabel situation" for=situation>Password: </label>
                <input type="password" placeholder="password" class=newSituation name="u_password" value="ADXS">
                <input type="submit" id=submitButton class=button value="Submit" name="submit">
            </fieldset>
        </form>
    </div>
</body>
</html>