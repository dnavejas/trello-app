const express = require('express')
const app = express()
const port = 3000;
const bodyParser = require('body-parser');
const multer = require('multer');
const upload = multer();

app.use(express.static('static'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(express.json());
app.use(express.urlencoded());
app.use(upload.array()); 
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', function(req, res){
    res.render('form');
});
 
app.set('view engine', 'pug');
app.set('views', './views');

app.post('/', function(req, res){
console.log(req.body);
res.send("recieved your request!");
});

let cards = [];

let card1 = {"cardName": "test card 1", "cardDesc": "really cool card description"};
let card2 = {"cardName": "test card 2", "cardDesc": "really cool card description"};

cards.push(card1);
cards.push(card2);

app.post('/cards', function(req, res) {
    console.log('we have a post');
    console.log("card name", req.body.cardName);
    console.log("card desc", req.body.cardDesc);
    cards.push({"cardName": req.body.cardName, "cardDesc":req.body.cardDesc});
    res.send("got it");
});

app.get('/cards', function(req, res){
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(cards, null, 3));
});

app.get('/', function(req, res){
    res.send("<h2>Hello World</h2>")
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`))