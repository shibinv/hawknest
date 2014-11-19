<?php

/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

$json = file_get_contents('http://localhost/php/route.php?request=department&type=json');
$obj = json_decode($json);

//var_dump($obj);
// debugging
if (isset($obj->status) && $obj->status == "success") {

$title = "Hawknest - Home";

require_once 'php/header.php';
require_once 'php/menu.php';
?>

            
                <form class="pure-form">
                    <!--Course Selection Dropdown Boxes-->
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

                        <select id="course" name="course" onchange="LoadSection();" style="display:none;">
                            <option></option>
                        </select>

                        <select id="section" name="section" onchange="GetRoom();" style="display:none;">
                            <option></option>
                        </select>
                        
                    </fieldset>

                    <!--SEARCH-->
                    <fieldset>
                        <legend>Search</legend>
                        <input id="search" type="text"  placeholder="Search..." class="pure-u-1-2">
                    </fieldset>
                </form>
                <div id="result"></div>
                <div class="pure-g">
                    <div id="mapwrapper" class="pure-u-1">
                    
                    
                    <canvas id="mapcanvas" width="750" height="425" class="pure-img-responsive"></canvas>
                    <!--<input type="button" onclick="Test(3, 3);" value="test">-->
                    <img id="pin" src="img/pin32.png" alt="Pin" class="map">
                    <img id="map1" src="img/map-l1.png" alt="Level 1" class="map">
                    <img id="map2" src="img/map-l2.png" alt="Level 2" class="map">
                    </div>
                </div>
                
                <!-- <div id="mapwrapper" style="float:left; display:none;">
                    
                </div> -->
                
                
        
<?php require_once 'php/footer.php';

    } else { // show an error if API server is unavailable
        echo "A server error occured please try again in a few mins: " . $obj->message;
    }