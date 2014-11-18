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

        <div id="main">
            <div class="header">
                <h1>{Logo}</h1>
                <h2>Hawknest Navigaton</h2>
            </div>

            <div class="content">
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
                </form>
                <div id="mapwrapper" style="float:left;">
                    <img id="pin" src="img/pin.png" alt="Pin">
                    <img id="map1" src="img/map-l1.png" alt="Level 1" class="map">
                    <img id="map2" src="img/map-l2.png" alt="Level 2" class="map">
                </div>
            </div>
        </div>
<?php require_once 'php/footer.php';

    } else { // show an error if API server is unavailable
        echo "A server error occured please try again in a few mins: " . $obj->message;
    }