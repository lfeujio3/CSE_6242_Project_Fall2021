const express = require('express'); 
const bodyParser = require("body-parser")
const app = express();
var axios = require('axios')

// Load the .env file if it exists
require("dotenv").config();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));


// Connect to Azure blob storage
const { BlobServiceClient, StorageSharedKeyCredential } = require("@azure/storage-blob");
const { Connection, Request } = require("tedious");

async function main() {
  // Enter your storage account name and shared key
  const account = process.env.AZURE_ACCOUNT_NAME || "";
  const accountKey = process.env.AZURE_ACCOUNT_KEY || "";

  // Use StorageSharedKeyCredential with storage account and account key
  // StorageSharedKeyCredential is only available in Node.js runtime, not in browsers
  const sharedKeyCredential = new StorageSharedKeyCredential(account, accountKey);

  // List containers
  const blobServiceClient = new BlobServiceClient(
    `https://${account}.blob.core.windows.net`,
    sharedKeyCredential
  );

  let i = 1;
  // for await (const container of blobServiceClient.listContainers()) {
  //   console.log(`Container ${i++}: ${container.name}`);
  // }

  // Create a container
  // const containerName = `newcontainer${new Date().getTime()}`;
  // const containerClient = blobServiceClient.getContainerClient(containerName);

  // const createContainerResponse = await containerClient.create();
  // console.log(`Create container ${containerName} successfully`, createContainerResponse.requestId);

  // Delete container
  //await containerClient.delete();

  //console.log("deleted container");
}

main().catch((err) => {
  console.error("Error running sample:", err.message);
});


// Create connection to database
const config = {
  authentication: {
    options: {
      userName: "flightadmin", // update me
      password: "Flight#123" // update me
    },
    type: "default"
  },
  server: "flightpredserver.database.windows.net", // update me
  options: {
    database: "FlightPredDB", //update me
    encrypt: true
  }
};


// route to search flights 
app.post("/searchFlights", (req, res) => {
    try {
        const {body}  = req
        const searchInfo = {...body}
        console.log("search from browser", searchInfo )

        if (!searchInfo) {
            return res.send({success: false, message: "Search is invalid"})
        }

        // Query the database using the search criteria
        const connection = new Connection(config);

        connection.connect();

        // Attempt to connect and execute queries if connection goes through
        connection.on("connect", err => {
          if (err) {
            console.error(err.message);
          } else {
            var flightDate = searchInfo.date
            var destinationAirport = searchInfo.destinationAirport.Code
            //queryDatabase(flightDate, destinationAirport);
            console.log("Reading rows from the Table...");

            var flightsArr = []
            //TODO: Wheeloff_time = Departure_delay
            //TODO: Function to get date and convert to seasons
            //TODO: Function to get hour from scheduled_dep_time
            const request = new Request(
              `Select Flight_Date, Carrier_Code, Flight_Number, Destination_Airport, Scheduled_Dep_Time,HourlyAltimeterSetting,HourlyDewPointTemperature,HourlyDryBulbTemperature,HourlyPrecipitation,HourlyRelativeHumidity,HourlySeaLevelPressure,HourlyStationPressure,HourlyVisibility,HourlyWetBulbTemperature,HourlyWindDirection,HourlyWindSpeed,Departure_delay, Wheeloff_Time    
               From [dbo].[predictionData2019]
               where Flight_Date = '${flightDate}' and Destination_Airport = '${destinationAirport}'; `,
              (err, rowCount) => {
                if (err) {
                  console.error(err.message);
                } else {
                  console.log(`${rowCount} row(s) returned`);
                }
              }
            );
          
            request.on("row", columns => {
              var a_row = {}
              columns.forEach(column => {
                // Get key/value of each column for each row
                console.log(column.metadata.colName, column.value )
                if( column.metadata.colName === "Scheduled_Dep_Time") {
                  var time = (column.value).split(":")
                  var hours = time[0]
                  var minutes = time[1]
                  var finalTime = (hours.length == 1) ? ("0" + hours + ":" + minutes) : (hours + ":" + minutes)
                  console.log("formatted time: ", finalTime)
                  a_row[column.metadata.colName] = finalTime
                } else {
                  a_row[column.metadata.colName] = column.value
                }
               
              });
              
              // Add each result to array of results
              flightsArr.push(a_row)
             
            });
          
            // When request is completed
            request.on("requestCompleted", () => {
              console.log("here we are: ", flightsArr)

              // Send search results back to the client
              res.send({ value: flightsArr, success: true}); 
          
            })

            request.setTimeout(0)

            connection.execSql(request);
          
          }
        });

    } catch(e) {
        res.status(500).send({error: e})
    }
})


// Route for flight delay prediction
app.post("/delayPrediction", (req, res) => {
  try {
      const {body}  = req
      const data = {...body}
      console.log("data prediction from browser", data )

      if (!data) {
          return res.send({success: false, message: "Invalid flight selection"})
      }

      var config = {
        method: 'post',
        url: 'http://b7d1ef00-818e-4ae7-91dc-f5b8da95bab9.eastus.azurecontainer.io/score',
        headers: { 
          'Content-Type': 'application/json', 
          'Authorization': 'Bearer DtSOqFlkrNVgvl2qY40V8rjQJ1Xgbifz'
        },
        data : JSON.stringify(data)
      };

      axios(config)
          .then(function (response) {
            var result = response.data.Results.WebServiceOutput0[0]
            console.log(result);
            res.send({ value: result, success: true}); 
          })
          .catch(function (error) {
            console.log("error making call to azure web service: ",error);
          });

      
  } catch(e) {
      res.status(500).send({error: e})
  }
})


// This displays message that the server running and listening to specified port
app.listen(port, () => console.log(`Server Running on port ${port}`)); 






// Query the SQL database using the user search criteria





