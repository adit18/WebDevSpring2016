(function(){
    angular
        .module("FoodQuotientApp")
        .factory("YelpService", yelpService);

    function yelpService($http) {
        var api = {
            searchYelp: searchYelp,
            searchBizYelp: searchBizYelp
        };
        return api;

        function searchYelp (searchTerm, searchLoc, callback) {

            var accessor = {
                consumerSecret: auth.consumerSecret,
                tokenSecret: auth.accessTokenSecret
            };
            var parameters = [];
            parameters.push(['term', searchTerm]);
            parameters.push(['location', searchLoc]);
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

        function searchBizYelp (bizID, callback) {

            var accessor = {
                consumerSecret: auth.consumerSecret,
                tokenSecret: auth.accessTokenSecret
            };
            var parameters = [];
            //parameters.push(['term', 'food']);
            //parameters.push(['location', 'Boston,MA']);
            //parameters.push(['limit', 10]);
            //parameters.push(['category_filter', 'restaurants']);
            parameters.push(['callback', 'angular.callbacks._0']);
            parameters.push(['oauth_consumer_key', auth.consumerKey]);
            parameters.push(['oauth_consumer_secret', auth.consumerSecret]);
            parameters.push(['oauth_token', auth.accessToken]);
            parameters.push(['oauth_signature_method', 'HMAC-SHA1']);
            var message = {
                'action': 'https://api.yelp.com/v2/business/'+bizID,
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
    }
})();