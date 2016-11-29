var express   = require('express')
var validator = require('ws-ui-shared')

var bodyParser = require('body-parser');
var cors       = require('cors');
var app        = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true  }));
app.use(cors());


function pp(obj) {
    console.log(JSON.stringify(obj, null, 2));
}


app.put('/validate', function (req, res) {
    let questions = req.body.questions;

    if (!questions) {
        res.send("Must send questions...");
    }

    console.log("Validating questions");
	pp(questions);

    let errors = validator.validateModel(questions)
    res.send(errors);
});


app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
});

