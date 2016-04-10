module.exports = function() {
    var foodPlaces = [];
    var api = {
        findPlaceByYelpID: findPlaceByYelpID,
        findPlacesByYelpIDs: findPlacesByYelpIDs,
        createFoodPlace: createFoodPlace,
        addReviewFoodPlace : addReviewFoodPlace,
        updateReviewByID : updateReviewByID
    };
    return api;

    function findPlacesByYelpIDs (yelpIDs) {
        var retfoodPlaces = [];
        for (var id in yelpIDs) {
            var place = findPlaceByYelpID (yelpIDs[id]);
            if (place) {
               retfoodPlaces.push(place);
            }
        }
        return retfoodPlaces;
    }

    function createFoodPlace(place) {
        place = {
            _id: "ID_" + (new Date()).getTime(),
            yelpID: place.id,
            poster: place.image_url,
            title: place.name,
            reviews: []
        };
        foodPlaces.push(place);
        return place;
    }

    function findPlaceByYelpID(yelpID) {
        for(var m in foodPlaces) {
            if(foodPlaces[m].yelpID === yelpID) {
                return foodPlaces[m];
            }
        }
        return null;
    }

    function addReviewFoodPlace(inpPlace,user) {
        var place = findPlaceByYelpID(inpPlace.id);
        if(!place) {
            place = createFoodPlace(inpPlace);
        }

        for(var u in foodPlaces) {
            //can compare with _id too later
            if(foodPlaces[u].yelpID == inpPlace.id){
                var review = {};
                review._id = "ID_" + (new Date()).getTime();
                review.userID = user._id;
                review.username = user.username;
                review.yelpID = inpPlace.id;
                review.placeName = inpPlace.name;
                review.placePoster = inpPlace.image_url;
                review.comment = inpPlace.buffer;
                review.ratval = inpPlace.ratval;
                foodPlaces[u].reviews.push(review);
                return review;
            }
        }
        return null;
    }

    function updateReviewByID(reviewId,review) {
        for(var u in foodPlaces) {
            //can compare with _id too later
            if(foodPlaces[u].yelpID == review.yelpID){
                for(var f in foodPlaces[u].reviews){
                    if(foodPlaces[u].reviews[f]._id == reviewId){
                        foodPlaces[u].reviews.splice(f,1,review);
                        return foodPlaces[u].reviews[f];
                    }
                }
            }
        }
        return null;
    }


}