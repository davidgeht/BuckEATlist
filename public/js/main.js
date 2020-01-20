//fix margin for the full job column
//$("#mapColumn").css("margin-right",$("#listColumn").css("width"));
$("#map").css("height",$(window).innerHeight()-$("#navbar").outerHeight(true)-$("#mapColumn .navbar").outerHeight(true)-2); 
//set job card column height
$("#listColumn").css("height",$(window).innerHeight() - $("#navbar").outerHeight(true)-2);

$("#restList").css("height",$("#listColumn").outerHeight(true)-$("#listColumn > h3").outerHeight(true));

//fixing page element dimensions on resize
$(window).on('resize',function(){
    //$("#mapColumn").css("margin-right",$("#listColumn").css("width"));   
    $("#listColumn").css("height",$(window).innerHeight() - $("#navbar").outerHeight(true));
    $("#restList").css("height",$("#listColumn").outerHeight(true)-$("#listColumn > h3").outerHeight(true)-2);
    $("#map").css("height",$(window).innerHeight()-$("#navbar").outerHeight(true)-$("#mapColumn .navbar").outerHeight(true)-2); 
});
