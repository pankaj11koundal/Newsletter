const express = require("express")
const bodyParser = require("body-parser")
// const request = require("request") 
const https = require("https");
// const { post } = require("request");

const app = express();
app.use(bodyParser.urlencoded({extended: true}))
app.use(express.static('public'))

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/signup.html")
})

app.post("/", (req, res) => {
    // console.log(req.body.firstName);
    console.log(req.body.secondName);
    // console.log(req.body.email);

    const data = {
        members: [
            {
                email_address : req.body.email,
                status : "subscribed",
                merge_fields : {
                    FNAME: req.body.firstName,
                    LNAME: req.body.secondName
                }
            }
        ]
    };

    const jsonData = JSON.stringify(data);

    url = "https://us20.api.mailchimp.com/3.0/lists/7e3d511f00";
    options = {
        method: "POST",
        auth: "thenullperson_:0eabddf48d6eab65273f263260d74919-us20"
    }

    const request = https.request(url, options, (response) => {
        response.on('data', (data) => {
            console.log(JSON.parse(data));
        })

        if (response.statusCode === 200) {
            res.sendFile(__dirname + "/success.html");
        } else {
            res.sendFile(__dirname + "/failure.html");
        }
    })

    request.write(jsonData);
    request.end();
    
})

app.post("/failure", (req, res) => {
    res.redirect("/");
})

app.listen(process.env.PORT || 3000, () => console.log("Server is running on port 3000"))

// API Key: 0eabddf48d6eab65273f263260d74919-us20
// List/Audience ID: 7e3d511f00
