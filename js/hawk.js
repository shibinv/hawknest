/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
url = 'http://localhost/php/route.php';

function LoadCourse() {
    // selected value of department
    value = $("#department").val();

    //console.log(value);
    //console.log($.getJSON(url + '?request=course&value=' + value));
    
    $.getJSON(url + '?request=course&value=' + value, function (data) {
        //var items = [];
        $.each(data, function (key, val) {
//            $('#course')
//                .append($('<option>', { val : key })
//                .text(val)); 
            console.log(val);
        });
    });
}
