//fix margin for the full job column
//$("#mapColumn").css("margin-right",$("#listColumn").css("width"));
$("#map").css("height",$(window).innerHeight()-$("#navbar").outerHeight(true)-$("#mapColumn .navbar").outerHeight(true)-18); 
//set job card column height
$("#listColumn").css("height",$(window).innerHeight() - $("#navbar").outerHeight(true)-26);

$("#restList").css("height",$("#listColumn").outerHeight(true)-$("#listColumn > h3").outerHeight(true)-55);

//fixing page element dimensions on resize
$(window).on('resize',function(){
    //$("#mapColumn").css("margin-right",$("#listColumn").css("width"));   
    $("#listColumn").css("height",$(window).innerHeight() - $("#navbar").outerHeight(true)-26);
    $("#restList").css("height",$("#listColumn").outerHeight(true)-$("#listColumn > h3").outerHeight(true)-55);
    $("#map").css("height",$(window).innerHeight()-$("#navbar").outerHeight(true)-$("#mapColumn .navbar").outerHeight(true)-18); 
});
