(function(){
    angular
        .module("FoodQuotientApp")
        .factory("YelpService", yelpService);

    function yelpService($http) {
        var api = {
            searchYelp: searchYelp,
            //findUserLikes: findUserLikes
        };
        return api;

        function searchYelp (callback) {
            var auth = {
                consumerKey : "gg8OHXBFdC5S2s3Ibx8tYA",
                consumerSecret : "Vw103ihOCyYzXpke4_wbOBYHfXA",
                accessToken : "H88uGzz66yXEsHx-4o_Afskl8F8uejMg",
                accessTokenSecret : "K62YYuc56QfUZ4BLFqZOa61CwSY",
                serviceProvider : {
                    signatureMethod : "HMAC-SHA1"
                }
            };



            var accessor = {
                consumerSecret: auth.consumerSecret,
                tokenSecret: auth.accessTokenSecret
            };
            var parameters = [];
            parameters.push(['term', 'food']);
            parameters.push(['location', 'Boston,MA']);
            parameters.push(['limit', 10]);
            parameters.push(['category_filter', 'restaurants']);
            parameters.push(['callback', 'angular.callbacks._0']);
            parameters.push(['oauth_consumer_key', auth.consumerKey]);
            parameters.push(['oauth_consumer_secret', auth.consumerSecret]);
            parameters.push(['oauth_token', auth.accessToken]);
            parameters.push(['oauth_signature_method', 'HMAC-SHA1']);
            var message = {
                'action': 'http://api.yelp.com/v2/search',
                'method': 'GET',
                'parameters': parameters
            };
            OAuth.setTimestampAndNonce(message);
            OAuth.SignatureMethod.sign(message, accessor);
            var parameterMap = OAuth.getParameterMap(message.parameters);
            parameterMap.oauth_signature = OAuth.percentEncode(parameterMap.oauth_signature);

            $.ajax({
                'url': message.action,
                'data': parameterMap,
                'cache': true,
                'dataType': 'jsonp',
                'jsonpCallback': 'cb',
                success: callback,
                error:function(){
                    console.log("Yelp Error!");
                }
            });

        }

        function userLikesFood(userId, foodplace) {
            return $http.post("/service/food/user/"+userId+"/food/"+foodplace.id,foodplace);
        }
    }
})();