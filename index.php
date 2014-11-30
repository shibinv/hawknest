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
$title = "Home";

if (isset($obj->status) && $obj->status == "success") {

require_once 'php/header.php';
require_once 'php/menu.php';
?>

                <form class="pure-form pure-form-stacked" onsubmit="return false;">
                    <!--Course Selection Dropdown Boxes-->
                    <fieldset>
                        <legend>Select by Course</legend>
                        <div class="pure-g">
                            <div class="pure-u-1-3">
                                <label for="department">Department</label>
                                <select id="department" name="department" onchange="LoadCourse();" class="pure-input">
                                    <option></option>
                                    <?php 
                                        foreach ($obj->result as $option) {
                                            echo '<option value="'.$option->dept_subject.'">'.$option->dept_subject.'</option>';
                                        }
                                    ?>
                                </select>
                            </div>
                        
                            <div class="pure-u-1-3">
                                <label for="course">Course</label>
                                <select id="course" name="course" onchange="LoadSection();" style="display:none;" class="pure-input">
                                    <option></option>
                                </select>
                            </div>
                        
                            <div class="pure-u-1-3">
                                <label for="department">Section</label>
                                <select id="section" name="section" onchange="GetRoom(); GetDetails();" style="display:none;" class="pure-input">
                                    <option></option>
                                </select>
                            </div>
                        </div>
                    </fieldset>

                    <!--SEARCH-->
                    
                    <fieldset>
                        <legend>Search</legend>
                        <input id="search" type="text"  placeholder="Search..." class="pure-input-1-2">
                    </fieldset>

                </form>
                <div id="result"></div>
                <div class="pure-g">
                    <div id="mapwrapper" class="pure-u-1">
                        <div id="mapdiv1" class="hidden">
                            <h3 class="floor">Delta Building - First Floor</h3>
                            <canvas id="mapcanvas1" width="750" height="425" class="pure-u-1 pure-img-responsive"></canvas>
                        </div>
                        <div id="mapdiv2" class="hidden">
                            <h3 class="floor">Delta Building - Second Floor</h3>
                            <canvas id="mapcanvas2" width="750" height="332" class="pure-u-1 pure-img-responsive"></canvas>
                        </div>
                        <!--<input type="button" onclick="Test(3, 3);" value="test">-->
                        <img id="pin" src="img/pin32.png" alt="Pin" class="map">
                        <img id="map1" src="img/map-l1.png" alt="Level 1" class="map">
                        <img id="map2" src="img/map-l2.png" alt="Level 2" class="map">
                    </div>
                </div>
                
                <div id ="request"></div>
<?php           

require_once 'php/footer.php';

} else { // show an error if API server is unavailable
    echo "A server error occured please try again in a few mins: " . $obj->message;
}