<?php

/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

$request = filter_input(INPUT_SERVER, 'QUERY_STRING');
$data = file_get_contents('http://server.navsquire.us/test.php?'.$request);
echo $data;
