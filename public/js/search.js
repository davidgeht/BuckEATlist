$("#searchForm").submit( event => {
    event.preventDefault();
    console.log("hi");
    let location = $("#locationInput").val().trim();     

    if(!location){
        
        return false;
    }

    let body = {
        location: location
    };
    
    $.post('/api/search/location',body).then(function(data){
        console.log(data);
        $("#results").text(JSON.stringify(data,null,2));
    });
   
});