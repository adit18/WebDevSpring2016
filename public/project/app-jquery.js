(function()
{
    //angular
    //    .module("FoodQuotientApp", ["ngRoute"]);

    $(init);

    var $foodTitleTxt;
    var $searchFoodBtn;
    var auth = {
        consumerKey : "gg8OHXBFdC5S2s3Ibx8tYA",
        accessToken : "H88uGzz66yXEsHx-4o_Afskl8F8uejMg",
        serviceProvider : {
            signatureMethod : "HMAC-SHA1"
        }
    };
    var accessor = {
        token: "H88uGzz66yXEsHx-4o_Afskl8F8uejMg",
        consumerKey : "gg8OHXBFdC5S2s3Ibx8tYA"
    };
    parameters = [];

    var searchUrl = "http://api.yelp.com/v2/search";
    function init() {
        $foodTitleTxt = $("#foodTitleTxt");
        $searchFoodBtn = $("#searchFoodBtn");
        //alert("Hello from jQuer!");
        $searchFoodBtn.click(searchFood);
    }

    function searchFood() {

        var foodTitle = $foodTitleTxt.val();

        //var url = searchUrl.replace("TITLE", foodTitle)
        //    .replace("LOC","Boston");
        alert("SearchURL: "+searchUrl);

        //parameters.push(['term', foodTitle]);
        parameters.push(['location', "Boston"]);
        //parameters.push(['callback', 'JSON_CALLBACK']);
        parameters.push(['oauth_consumer_key', auth.consumerKey]);
        //parameters.push(['oauth_consumer_secret', auth.consumerSecret]);
        parameters.push(['oauth_token', auth.accessToken]);
        parameters.push(['oauth_signature_method', 'HMAC-SHA1']);

        var message = {
            action: searchUrl,
            method: "GET",
            parameters: parameters
        };

        OAuth.setTimestampAndNonce(message);
        OAuth.completeRequest(message, accessor);
        OAuth.SignatureMethod.sign(message, accessor);

        searchUrl = searchUrl + '?' + OAuth.formEncode(message.parameters);
        console.log(message.parameters);
        $.ajax({
            url: searchUrl,
            dataType : "jsonp",
            //jsonp : false,
            jsonpCallback : 'renderFoodList',
            cache: true,
            success : function (data) {
                console.log(data);
                //$("body").append(output);
            }
        });
    }

    function renderFoodList(){
        alert("Food List");
    }

})();