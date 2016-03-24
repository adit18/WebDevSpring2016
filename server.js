var express       = require('express');
var app           = express();
var bodyParser    = require('body-parser');
var multer        = require('multer');
var cookieParser  = require('cookie-parser');
var session       = require('express-session');
var ipaddress     = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';
var port          = process.env.OPENSHIFT_NODEJS_PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(multer());
app.use(session({ secret: "this is my secret",resave: true,
    saveUninitialized: true }));
app.use(cookieParser());
app.use(express.static(__dirname + '/public'));

//Yelp API handling----------------------------------------
/* require the modules needed */
var oauthSignature = require('oauth-signature');
var n = require('nonce')();
var request = require('request');
var qs = require('querystring');
var _ = require('lodash');

/* Function for yelp call
 * ------------------------
 * set_parameters: object with params to search
 * callback: callback(error, response, body)
 */
var request_yelp = function(set_parameters, callback) {

    /* The type of request */
    var httpMethod = 'GET';

    /* The url we are using for the request */
    var url = 'http://api.yelp.com/v2/search';

    /* We can setup default parameters here */
    var default_parameters = {
        location: 'Boston',
        sort: '2'
    };

    /* We set the require parameters here */
    var required_parameters = {
        oauth_consumer_key : 'gg8OHXBFdC5S2s3Ibx8tYA',
        oauth_token : 'H88uGzz66yXEsHx-4o_Afskl8F8uejMg',
        oauth_nonce : n(),
        oauth_timestamp : n().toString().substr(0,10),
        oauth_signature_method : 'HMAC-SHA1',
        oauth_version : '1.0'
    };

    /* We combine all the parameters in order of importance */
    var parameters = _.assign(default_parameters, set_parameters, required_parameters);

    /* We set our secrets here */
    var consumerSecret = 'Vw103ihOCyYzXpke4_wbOBYHfXA';
    var tokenSecret = 'K62YYuc56QfUZ4BLFqZOa61CwSY';

    /* Then we call Yelp's Oauth 1.0a server, and it returns a signature */
    /* Note: This signature is only good for 300 seconds after the oauth_timestamp */
    var signature = oauthSignature.generate(httpMethod, url, parameters, consumerSecret, tokenSecret, { encodeSignature: false});

    /* We add the signature to the list of paramters */
    parameters.oauth_signature = signature;

    /* Then we turn the paramters object, to a query string */
    var paramURL = qs.stringify(parameters);

    /* Add the query string to the url */
    var apiURL = url+'?'+paramURL;

    /* Then we use request to send make the API Request */
    request(apiURL, function(error, response, body){
        console.log(body);
        return callback(error, response, body);
    });

};


app.get('/searchapi', function (req, res) {
    //Sample: http://localhost:3000/searchapi?term=cream+puffs&location=San+Francisco
    var subUrl = req.url; // here: /searchapi
    var fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
    console.log("The received URL: " + fullUrl);

    qTerm = req.query.term;
    location = 'Boston,MA'; //req.query.location; //Boston
    //ll = req.query.ll;

    console.log("Term/loc: " + qTerm + "/" + location);
    request_yelp({term: qTerm, location: 'Boston,MA'}, function(error, response, body){
        console.log("Inside RequestYelp: ------------------");
        console.log(body);
        res.json(body);
    });
});
//Yelp ----------------------------------------------------


app.get('/hello', function(req, res){
    res.send('hello world');
});

require("./public/assignment/server/app.js")(app);
require("./public/project/server/app.js")(app);


app.listen(port, ipaddress);