/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
url = 'php/route.php';

$(function() {
    $("#search").autocomplete({
        source: "php/search.php",
        minLength: 3,
        select: function(event, ui) {
            HideMap();
            GetRoom(ui.item.value);
            $("#section").empty().prop('disabled', 'disabled'); // clear and disable section
            $("#course").empty().prop('disabled', 'disabled'); // clear and disable course
            $("#department").val(" "); // clear the departmnet dropdown
        }
    });
});

function LoadCourse() {
    // selected value of department
    department = $("#department").val();

    if (department !== "") {
        request = url + '?request=course&value=' + department;
        console.log(request);
        //console.log($.getJSON(url + '?request=course&value=' + value));

        $.getJSON(request, function(data) {
            if (data.status === "success") { // make sure the result is valid
                $.each(data, function(key, val) {
                    if (key === 'status') {
                        console.log(val);
                        $("#course").empty().prop('disabled', false); //.fadeOut(); // clear the dropdown on success
                        $("#course").html('<option></option>');
                        $("#section").empty().prop('disabled', 'disabled');
                        HideMap();
                    } else {
                        $.each(val, function(row, item) {
                            $("#course")
                                    .append($('<option>', {value: item.course_number})
                                            .text(item.course_number));
                            //$("#course").fadeIn();
                            console.log(item.course_number);
                        });
                    }
                });
            } else {
                console.log(data.status);
                console.log(data.message);
            }
        });
    } else {
        $("#section").empty().prop('disabled', 'disabled');
        $("#course").empty().prop('disabled', 'disabled');
        HideMap();
    }
}

function LoadSection() {
    // selected value of department
    course = $("#course").val();
    department = $("#department").val();

    if (course !== "" && department !== "") {
        request = url + '?request=section&value=' + department + "&value2=" + course;

        console.log(request);

        $.getJSON(request, function(data) {
            if (data.status === "success") { // make sure the result is valid
                $.each(data, function(key, val) {
                    if (key === 'status') {
                        console.log(val);
                        $("#section").empty().prop('disabled', false); //.fadeOut(); // clear the dropdown on success
                        $("#section").html('<option></option>');
                        HideMap();
                    } else {
                        $.each(val, function(row, item) {
                            $("#section")
                                    .append($('<option>', {value: item.room_number})
                                            .text(item.course_section));
                            //$("#course").fadeIn();
                            console.log(item.course_number);
                        });
                    }
                });
            } else {
                console.log(data.status);
                console.log(data.message);
            }
        });

    } else {
        $("#section").empty().prop('disabled', 'disabled');
        HideMap();
    }
}

function GetRoom(roomnumber) {

    roomnumber = roomnumber || $("#section").val();

    if (roomnumber !== "") {
        request = url + '?request=room&value=' + roomnumber;

        console.log(request);
        $.getJSON(request, function(data) {
            if (data.status === "success") {
                $("#result").html(
                        'Room:' + data.result[0].room_number +
                        '<br>Map Coordinates: ' + data.result[0].room_xval + ',' + data.result[0].room_yval
                        );
                ShowMap(data.result[0].room_number, data.result[0].room_xval, data.result[0].room_yval);
                //Test(data.result[0].room_xval, data.result[0].room_yval);
                console.log(data.result);
            } else {
                console.log(data.status);
                console.log(data.message);
            }
        });
    }
}

function ShowMap(room, x, y) {
    if (room.charAt(1) === "1") {
        floor = 1;
    } else if (room.charAt(1) === "2") {
        floor = 2;
    } else {
        HideMap();
        return;
    }

    $("#map" + floor).show();
    $("#pin").css("left", x - 32);
    $("#pin").css("top", y - 64);
    $("#pin").show(750);

}

function HideMap() {
    $("#map1").hide();
    $("#map2").hide();
    $("#pin").hide();
}

function Test(dx,dy) {
    var matrix = [
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0],
        [1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1],
        [1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1],
        [1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1],
        [1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1],
        [1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1],
        [1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1],
        [1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1],
        [1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1],
        [1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1],
        [1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    ];
    
    var stair = [15, 7];
    
    var grid = new PF.Grid(30, 17, matrix); 
    var finder = new PF.AStarFinder();
    var path = finder.findPath(16, 0, 3, 14, grid);
    
    console.log("Destination: " + Math.round(dx/25) + ", " + Math.round(dy/25));
    
    var c = document.getElementById("myCanvas");
    var ctx = c.getContext("2d");
    var img = document.getElementById("testmap");
    
    ctx.drawImage(img, 0, 0, 903, 513);
    
    ctx.strokeStyle="red";
    ctx.lineWidth = 5;
    
    for(x=1; x<path.length; x++) {
        ctx.moveTo((path[x-1][0]+.5)*30.1, (path[x-1][1]+.5)*30.1764);
        ctx.lineTo((path[x][0]+.5)*30.1, (path[x][1]+.5)*30.1764);
        ctx.stroke();
    }
//    var c = document.getElementById("myCanvas");
//    var ctx = c.getContext("2d");
//    ctx.moveTo(13*25,0*25);
//    ctx.lineTo(22*25,15*25);
//    ctx.stroke();
}


