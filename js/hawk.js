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
                GetRoom(ui.item.value, true);
                $("#section").empty().hide(); // clear and disable section
                $("#course").empty().hide(); // clear and disable course
                $("#department").val(" "); // clear the departmnet dropdown
                $("#result").empty();
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
                                    .append($('<option>', {value: item.course_section})
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

function GetRoom(roomnumber, search) {
    if (search) { // if the request is from search then use the search value
        //roomnumber = $("#search").val();
        FindRoom(roomnumber);
    } else { // otherwise send a section request to find the matching room
        course = $("#course").val();
        department = $("#department").val();

        if (course !== "" && department !== "") {
            request = url + '?request=section&value=' + department + "&value2=" + course;
            
            $.getJSON(request, function(data) {
                if (data.status === "success") {
                    var x;
                    x = $("#section option:selected").index() - 1;
                    console.log("Section: " +x);
                    console.log(data.result[x].room_number);
                    room = data.result[x].room_number;
                    FindRoom(room);
                }
            });
        }   
    }
}

function FindRoom(room) {
    
    console.log("Room: " +room);
    if (room !== 'Online') {
        request = url + '?request=room&value=' + room;

        $.getJSON(request, function(data) {
            if (room !== "") {
                console.log(data);
                DrawMap(
                    data.result[0].door_x, data.result[0].door_y,
                    data.result[0].room_xval, data.result[0].room_yval,
                    data.result[0].room_number
                );
            }
            console.log(data.result);
        });
    } else {
        $("#mapdiv1").hide();
        $("#mapdiv2").hide();
    }
}

function GetDetails() {

    course = $("#course").val();
    department = $("#department").val();

    if (course !== "" && department !== "") {
        request = url + '?request=section&value=' + department + "&value2=" + course;

        console.log(request);
        $.getJSON(request, function(data) {
            if (data.status === "success") {

                j = ($("#section option:selected").index()) - 1;
                console.log(j);
                classnumber = data.result[j].class_number;

                request = url + '?request=detail&value=' + classnumber;
                console.log(request);
                $.getJSON(request, function(data) {
                    if (classnumber !== "") {
                        console.log(data);
                        $("#result").html('Room: ' + data.result[0].room_number + '<br>Professor: ' + data.result[0].fac_last_name + ', '
                                + data.result[0].fac_first_name + '<br>Course: ' + data.result[0].course_name
                                + '<br>Scheduled day(s): ' + data.result[0].schedule_day + '<br>Start time: '
                                + data.result[0].schedule_start_time + '<br>End time: ' + data.result[0].schedule_end_time);
                    }
                });
            }
        });
    }
}

function DrawMap(dx, dy, px, py, room) {

    // determine what floor room is in
    if (room.charAt(1) === "1") {
        floor = 1;
    } else if (room.charAt(1) === "2") {
        floor = 2;
    } else {
        $("#mapdiv1").hide();
        $("#mapdiv2").hide();
        return; // online or unknown room;
    }

    // create a grid for map
    matrix = [
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
    var path;

    // find path for level 1
    if (floor === 1) {
        path = finder.findPath(16, 2, dx, dy, grid);
        $("#mapdiv2").hide();
    } else {
        path = finder.findPath(16, 2, stair[0], stair[1], grid);
    }
    Levels(1, path);
    // find path for level 2
    if (floor === 2) {

        matrix = [
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1],
            [1, 0, 1, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 0, 1, 0, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 0, 0, 1, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        ];

        grid = new PF.Grid(30, 17, matrix);
        finder = new PF.AStarFinder();

        path = finder.findPath(15, 7, dx, dy, grid);
        Levels(2, path);
        $("#mapdiv2").show();
    }

    console.log("Destination: " + dx + ", " + dy);
    console.log("Floor: " + floor);

    // grab the destination floor
    var c = document.getElementById("mapcanvas" + floor);
    var ctx = c.getContext("2d");

    // draw pin on destination floor
    img = document.getElementById("pin");
    if (floor === 1) {
        ctx.drawImage(img, px - 16, py - 32, 32, 32);
    } else {
        ctx.drawImage(img, px - 16, py - 32 - 77, 32, 32); // take 77 px for cropping 
    }
    // show the canvas
    //$("#mapwrapper").show();
    $("#mapdiv1").show();
}

function Levels(level, path) {
    var mheight, height, width;
    if (level === 1) {
        mheight = 425; // set map height
        height = 25; // set block size
        width = 25; // set block size
    } else {
        mheight = 332;
        height = 19.5; // set block size
        width = 25; // set block size
    }

    console.log("Level: " + level);
    console.log("Path: " + path);

    var c = document.getElementById("mapcanvas" + level);
    var ctx = c.getContext("2d");
    var img = document.getElementById("map" + level);

    // clear the canvas
    ctx.clearRect(0, 0, 750, mheight);

    // draw map on to canvas
    ctx.drawImage(img, 0, 0, 750, mheight);

    // draw a ractangle at starting location
    ctx.beginPath();
    ctx.rect(path[0][0] * width, path[0][1] * height, width, height);
    ctx.fillStyle = '#50eb5f';
    ctx.fill();

    // draw a ractangle at ending location
    ctx.beginPath();
    ctx.rect((path[path.length - 1][0] * width), path[path.length - 1][1] * height, width, height);
    ctx.fillStyle = 'red';
    ctx.fill();

    // draw the path
    ctx.beginPath();
    ctx.strokeStyle = "#fdb913";
    ctx.lineWidth = 3;
    for (x = 1; x < path.length; x++) {
        ctx.moveTo((path[x - 1][0] + .5) * width, (path[x - 1][1] + .5) * height);
        ctx.lineTo((path[x][0] + .5) * width, (path[x][1] + .5) * height);
        ctx.stroke();
    }

}

