module.exports = function() {
    var foodPlaces = [];
    var api = {
        findPlaceByYelpID: findPlaceByYelpID,
        findPlacesByYelpIDs: findPlacesByYelpIDs,
        createFoodPlace: createFoodPlace
    };
    return api;

    function findPlacesByYelpIDs (yelpIDs) {
        var foodPlaces = [];
        for (var id in yelpIDs) {
            var place = findMovieByYelpID (yelpIDs[id]);
            if (place) {
                foodPlaces.push(place);
            }
        }
        return foodPlaces;
    }

    function createFoodPlace(place) {
        place = {
            _id: "ID_" + (new Date()).getTime(),
            yelpID: place.id,
            poster: place.image_url,
            title: place.name
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
}