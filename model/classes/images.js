class Image{
    constructor(id, user_id, rest_id, created_at, img_location){
        this.id = id,
        this.user_id = user_id,
        this.rest_id=rest_id,
        this.created_at=created_at,
        this.img_location=img_location
    }
}
module.exports = Image;