<?php


$json = file_get_contents('http://server.navsquire.us/test.php?request=department&type=json');
$obj = json_decode($json);
//var_dump($obj->result);

?>

<html>
    <head>
        <script src="js/jquery.js"></script>
        <script src="js/hawk.js"></script>
        <title>Testing Dropdown</title>
    </head>
    <body>
        <select id="department" name="department" onchange="LoadCourse();">
            <option></option>
            <?php 
                foreach ($obj->result as $option) {
                    //var_dump($option); die;
                    echo '<option value="'.$option->dept_id.'">'.$option->dept_subject.'</option>';
                }
            ?>
        </select>
        
        <select id="course" name="course" onchange="">
            <option></option>
        </select>
    </body>

</html>


