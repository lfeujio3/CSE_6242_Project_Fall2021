const express = require('express'); 
const bodyParser = require("body-parser")
const app = express();
const dotenv = require('dotenv');
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

// dotenv.config();
// const {privateKey, password} = require("./config")

// console.log("my keys is: ", password)
// route to run test and send data back
app.post("/getData", (req, res) => {
    try {
        const {body}  = req
        const {reportSuite} = body

        console.log("Request from browser", reportSuite )

        if (!reportSuite) {
            return res.send({success: false, message: "Report suite name is invalid"})
        }

        res.send({ value: {reportSuite: reportSuite}, success: true}); 
    } catch(e) {
        res.status(500).send({error: e})
    }
})


// This displays message that the server running and listening to specified port
app.listen(port, () => console.log(`Server Running on port ${port}`)); 
