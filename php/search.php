<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

$search = filter_input(INPUT_GET, 'term');

if ($search != 'No Results') {
    
    $json = file_get_contents("http://localhost/php/route.php?request=search&value=".urlencode($search)."&type=json");
    $obj = json_decode($json);
    
    $json = file_get_contents("http://localhost/php/route.php?request=poi&value=".urlencode($search)."&type=json");
    $poi = json_decode($json);


    if (isset($obj->status) && $obj->status == "success") {

        foreach ($obj->result as $result) {
            $data[] = array(
                'label' =>
                    $result->dept_subject . " " .
                    $result->course_number . " - " .
                    $result->course_name . " - " .
                    $result->fac_last_name . ", " .
                    $result->fac_first_name . " - " .
                    $result->room_number,
                'value' => $result->room_number
            );
        }

        if (isset($poi->status) && $poi->status == "success") {
            foreach ($poi->result as $result) {
                $data[] = array(
                    'label' => $result->poi_name,
                    'value' => $result->room_number
                );
            }
        }

        if ($data == "") {
            $data[] = array(
                    'label' => 'No Results',
                    //'value' => 
                );
        }
        echo json_encode($data);

    }

}