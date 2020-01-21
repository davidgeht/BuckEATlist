function generateRatingGraphic(rating){
    if(rating > 5) return;
    if(!rating ||( rating < 1)){
        return $("<span>").text("no rating given");
    }  
    let resultSpan = $("<span>");
    for(let i = 0; i < Math.floor(rating); i++){
        resultSpan.append($("<img>").attr("src","../content/images/bucket-rating-filled.png"));
    }
    if(rating % 1 != 0){
        resultSpan.append($("<img>").attr("src","../content/images/bucket-rating-half.png"));
    }
    for(let i = 5-Math.ceil(rating);i > 0; i--){
        resultSpan.append($("<img>").attr("src","../content/images/bucket-rating-unfill.png"));
    }
    resultSpan.append(` ${rating}/5`);
    return resultSpan;
}