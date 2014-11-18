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
        <script src="js/pathfinding.js"></script>
        <script src="js/hawk.js"></script>
        <link rel="stylesheet" type="text/css" href="css/jquery-ui.css">
        <link rel="stylesheet" type="text/css" href="css/hawk.css">
        <title>Hawknest</title>
    </head>
    <body>

<!--
        
        <div id="maptester">
        <canvas id="myCanvas" width="903" height="513" style="border:1px solid #000000;"></canvas><br>
        <input type="button" onclick="Test(15, 7);" value="test">
        </div>
        <img id="testmap" src="img/testmap.png" alt="testmap" style="visibility: hidden;">

-->
    
    
        <img src="img/banner2.jpg" width="100%" height="131" alt=""/>
        <div id="content"> 
  
<!--Course selection dropdown boxes-->

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

<!--SEARCH-->
        <fieldset>
            <legend>Search</legend>
            <input id="search" type="text"  placeholder="Search...">
        </fieldset>

<!--SIDEBAR (LINKS) --------------------->
        <img src="img/links.jpg" usemap="#linksmap" width="200" height="400" alt="" style="float:left;">
        <map name="linksmap">
            <area shape="rect" coords="0,80,200,130" alt="Map" href="maps.php">
            <area shape="rect" coords="0,150,200,200" alt="App" href="app.php">
            <area shape="rect" coords="0,220,200,270" alt="Tutorial" href="tutorial.php">
            <area shape="rect" coords="0,280,200,330" alt="Help" href="faq.php">
        </map>
        
        <div id="mapwrapper" style="float:left;">
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