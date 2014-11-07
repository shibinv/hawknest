<?php


$json = file_get_contents('http://localhost/php/route.php?request=department&type=json');
$obj = json_decode($json);

//var_dump($obj);
// debugging
if (isset($obj->status) && $obj->status == "success") {
?>

<html>
    <head>
        <script src="js/jquery.js"></script>
        <script src="js/jquery-ui.js"></script>
        <script src="js/hawk.js"></script>
        <link rel="stylesheet" type="text/css" href="css/jquery-ui.css">
        <link rel="stylesheet" type="text/css" href="css/hawk.css">
        <title>Testing Drop-down</title>
    </head>
    <body>
        <fieldset>
            <legend>Select by Course</legend>
            <select id="department" name="department" onchange="LoadCourse();">
                <option></option>
                <?php 
                    foreach ($obj->result as $option) {
                        echo '<option value="'.$option->dept_subject.'">'.$option->dept_subject.'</option>';
                    }
                ?>
            </select>

            <select id="course" name="course" onchange="LoadSection();">
                <option></option>
            </select>

            <select id="section" name="section" onchange="GetRoom();">
                <option></option>
            </select>
        </fieldset>
        

        
        <fieldset>
            <legend>Search</legend>
            <input id="search" type="text"  placeholder="Search...">
        </fieldset>
        
        <div id="result"></div>

        <div id="mapwrapper">
            <img id="pin" src="img/pin.png" alt="Pin">
            <img id="map1" src="img/map-l1.png" alt="Level 1" class="map">
            <img id="map2" src="img/map-l2.png" alt="Level 2" class="map">
            
        </div>

    </body>

</html>


<?php 
    } else { // show an error if API server is unavailable
        echo "A server error occured please try again in a few mins: " . $obj->message;
    }