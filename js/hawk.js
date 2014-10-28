/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
url = 'http://server.navsquire.us/test.php';

function LoadCourse() {
    // selected value of department
    value = $("#department").val();
    
    console.log($.getJSONP(url+'?request=course&value='+value));
}
