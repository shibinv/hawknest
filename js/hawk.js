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
            //HideMap();
            if (ui.item.value !== 'No Results') {
                GetRoom(ui.item.value);
                $("#section").empty().hide(); // clear and disable section
                $("#course").empty().hide(); // clear and disable course
                $("#department").val(" "); // clear the departmnet dropdown
            }
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
                        $("#course").empty().show(300); //.fadeOut(); // clear the dropdown on success
                        $("#course").html('<option></option>');
                        $("#section").empty().hide();
                        //HideMap();
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
        $("#section").empty().hide(300);
        $("#course").empty().hide(300);
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
                        $("#section").empty().show(300); //.fadeOut(); // clear the dropdown on success
                        $("#section").html('<option></option>');
                    } else {
                        $.each(val, function(row, item) {
                            $("#section")
                                    .append($('<option>', {value: item.room_number})
                                            .text(item.course_section));
                            //$("#course").fadeIn();
                            console.log(item);
                        });
                    }
                });
            } else {
                console.log(data.status);
                console.log(data.message);
            }
        });

    } else {
        $("#section").empty().hide();
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
                        'Room: ' + data.result[0].room_number);
                        //'<br>Map Coordinates: ' + data.result[0].room_xval + ',' + data.result[0].room_yval
                        //);
                //ShowPin(data.result[0].room_xval, data.result[0].room_yval);
                DrawMap(
                    data.result[0].door_x, data.result[0].door_y, 
                    data.result[0].room_xval, data.result[0].room_yval,
                    data.result[0].room_number
                );
                console.log(data.result);
            } else {
                console.log(data.status);
                console.log(data.message);
            }
        });
    }
}

function DrawMap(dx, dy, px, py, room) {
    
    // determine what floor room is in
    if (room.charAt(1) === "1") {
        floor = 1;
    } else if(room.charAt(1) === "2")  {
        floor = 2;
    } else {
        $("#mapwrapper").hide();
        return; // online or unknown room;
    }
    
    // create a grid for map
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
    
    // set location of stairs
    var stair = [15, 7];
    
    // create the grid
    var grid = new PF.Grid(30, 17, matrix);
    var finder = new PF.AStarFinder();
    var path, path;
    
    // find path for level 1
    if (floor === 1) {
        path = finder.findPath(16, 1, dx, dy, grid);
        $("#mapcanvas2").hide();
    } else {
        path = finder.findPath(16, 1, stair[0], stair[1], grid);
    }
    Levels(1, path);
    // find path for level 2
    if (floor === 2) {
        path = finder.findPath(stair[0], stair[1], dx, dy, grid);
        Levels(2, path);
        $("#mapcanvas2").show();
    }
    
    console.log("Destination: " + dx + ", " + dy);
    console.log("Floor: " + floor);

    // grab the destination floor
    var c = document.getElementById("mapcanvas"+floor);
    var ctx = c.getContext("2d");
    
    // draw pin on destination floor
    img = document.getElementById("pin"); 
    ctx.drawImage(img, px-16, py-32, 32, 32);
    
    // show the canvas
    $("#mapwrapper").show();
}

function Levels(level, path) {
    
    console.log("Level: " + level);
    console.log("Path: " + path);
    
    var c = document.getElementById("mapcanvas"+level);
    var ctx = c.getContext("2d");
    var img = document.getElementById("map"+level);
    
    // clear the canvas
    ctx.clearRect (0, 0, 750, 425);
    
    // draw map on to canvas
    ctx.drawImage(img, 0, 0, 750, 425);
    
    // draw a ractangle at starting location
    ctx.beginPath();
    ctx.rect(path[0][0]*25, path[0][1]*25, 25, 25);
    ctx.fillStyle = '#50eb5f';
    ctx.fill();
    
    // draw a ractangle at ending location
    ctx.beginPath();
    ctx.rect((path[path.length-1][0]*25), path[path.length-1][1]*25, 25, 25);
    ctx.fillStyle = 'red';
    ctx.fill();
    
    // draw the path
    ctx.beginPath();
    ctx.strokeStyle="#fdb913";
    ctx.lineWidth = 3;
    for(x=1; x<path.length; x++) {
        ctx.moveTo((path[x-1][0]+.5)*25, (path[x-1][1]+.5)*25);
        ctx.lineTo((path[x][0]+.5)*25, (path[x][1]+.5)*25);
        ctx.stroke();
    }
    
}

