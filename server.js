var express = require('express');
var app = express();
app.use(express.static(__dirname + '/public'));
var ipaddress = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';
var port = process.env.OPENSHIFT_NODEJS_PORT || 3000;

//The Yelp API handling
var yelp = require("node-yelp");
var client = yelp.createClient({
    oauth: {
        "consumer_key": "gg8OHXBFdC5S2s3Ibx8tYA",
        "consumer_secret": "Vw103ihOCyYzXpke4_wbOBYHfXA",
        "token": "H88uGzz66yXEsHx-4o_Afskl8F8uejMg",
        "token_secret": "K62YYuc56QfUZ4BLFqZOa61CwSY"
    },

    // Optional settings:
    httpClient: {
        maxSockets: 25  // ~> Default is 10
    }
});

app.get('/searchapi', function (req, res) {
    //Sample: http://localhost:3000/searchapi?term=cream+puffs&location=San+Francisco

    var succObj = {status: "success", message: "Preference removed"};
    var errObj = {status: "error", message: "Could not remove, user not found"};
    var remErrObj = {status: "error", message: "Could not remove, other issue"};

    var subUrl = req.url; // here: /searchapi
    var fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
    console.log("The received URL: " + fullUrl);

    term = req.query.term;
    //location = req.query.location; //Boston
    ll = req.query.ll;

    console.log("Term/ll: "+ term +"/"+ ll);
    client.search({
        terms: term,
        ll: ll
    }).then(function (data) {
        console.log("Yelp Working: ")
        //console.log(data);
        res.json(data);
        //var businesses = data.businesses;
        //var location = data.region;

        // ...
    }).catch(function (err) {
        console.log("Yelp Error!");
        res.json(err);

        //if (err.type === yelp.errorTypes.areaTooLarge) {
        //    // ..
        //} else if (err.type === yelp.errorTypes.unavailableForLocation) {
        //    // ..
        //}
    });
});

app.get('/hello', function(req, res){
    res.send('hello world');
});
app.listen(port, ipaddress);