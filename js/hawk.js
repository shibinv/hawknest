/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
url = 'http://localhost/php/route.php';

function LoadCourse() {
    // selected value of department
    value = $("#department").val();

    console.log(value);
    //console.log($.getJSON(url + '?request=course&value=' + value));
    console.log(url + '?request=course&value=' + value);
    
    $.getJSON(url + '?request=course&value=' + value, function (data) {

        
        $.each(data, function (key, val) {
            if (key === 'status'){
                console.log(val);
                $("#course").empty(); //.fadeOut(); // clear the dropdown on success
            } else {
                $.each(val, function(row, item) {
                    $("#course")
                        .append($('<option>', { row : item.course_number })
                        .text(item.course_number));
                    //$("#course").fadeIn();
                    console.log(item.course_number);
                });
            }
        });
    });
}

function LoadSection() {
    // selected value of department
    value = $("#course").val();

    console.log(value);
    //console.log($.getJSON(url + '?request=course&value=' + value));
    console.log(url + '?request=section&value=' + value);
    
    $.getJSON(url + '?request=section&value=' + value, function (data) {

        $.each(data, function (key, val) {
            if (key === 'status'){
                console.log(val);
                $("#course").empty(); //.fadeOut(); // clear the dropdown on success
            } else {
                $.each(val, function(row, item) {
                    $("#course")
                        .append($('<option>', { row : item.section })
                        .text(item.course_number));
                    //$("#course").fadeIn();
                    console.log(item.course_number);
                });
            }
        });
    });
}