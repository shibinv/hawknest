<?php

/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

$search = filter_input(INPUT_GET, 'term');

$json = file_get_contents("http://localhost/php/route.php?request=search&value=$search&type=json");
$obj = json_decode($json);

//echo json_encode($_SERVER['QUERY_STRING']); die;

//$data[] = array(
//            'label' => $json,
//            'value' => $result->class_number
//            );
//
//echo json_encode($data);

if (isset($obj->status) && $obj->status == "success") {
    

    foreach($obj->result as $result) {
        $data[] = array(
            'label' => 
                $result->dept_subject . " " .
                $result->course_number . " - " .
                $result->course_name . " - " . 
                $result->fac_last_name . ", " . 
                $result->fac_first_name . " - " .
                $result->room_number,
            
            'value' => $result->class_number
            );
    }
$test[0] = array(
    "label" => "test",
    "value" =>"testing1"
    );

$test[1] = array(
    "label" => "test2",
    "value" =>"testing2"
    );



echo json_encode($data);

}