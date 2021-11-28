import React, {useState, useEffect, useContext} from 'react';
import ServiceContext from '../ServiceContext';
import axios from "axios";
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import ButtonBase from '@material-ui/core/ButtonBase';
import Avatar from '@mui/material/Avatar';
import CardHeader from '@mui/material/CardHeader';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import aa_logo from '../images/aa_logo.jpg'
import { makeStyles } from "@material-ui/core/styles"

const useStyles = makeStyles({
  root: {
    flexGrow: 1
  },
  logo: {
    width: 40,
    height: 40
  }
});


function FlightCard(props) {

  const { setCardSelected, setPredictionResult, setIsFlightSelected,  setIsPredAvailable } = useContext(ServiceContext);

  const searchInfo = JSON.parse(localStorage.getItem("searchInfo"))
  
  const item = JSON.parse( props.item)
  //console.log("item selected: ", item)
  const originAirport = JSON.parse(props.origin) ? JSON.parse(props.origin) : searchInfo.originAirport
  const destinationAirport = JSON.parse(props.destination) ? JSON.parse(props.destination) : searchInfo.destinationAirport
  const origin = originAirport.City + " (" + originAirport.Code + ")" 
  const destination = destinationAirport.City + " (" + destinationAirport.Code + ")" 
  const cardClass = props.cardClass

  // Format time
  const time = (item.Scheduled_Dep_Time).split(":")
  const hours = time[0]
  const minutes = time[1]
  const finalTime = (parseInt(hours) <= 12) ? ((parseInt(hours) == 12) ? (hours + ":" + minutes + "pm"): (hours + ":" + minutes + "am")) : (String(parseInt(hours) - 12) + ":" + minutes + "pm")

  const classes = useStyles();

  // Get seasons from date

  function getSeasons(date) {
    console.log("item selected: ", date)
    var month = parseInt(date.split("/")[1])
    var spring = 0
    var summer = 0
    var fall = 0
    var winter = 0

    if (month <= 2 || month >= 12) {
      spring = 0
      summer = 0
      fall = 0
      winter = 1
    } else if (month >= 3 && month <= 6) {
      spring = 1
      summer = 0
      fall = 0
      winter = 0
    } else if (month > 6 && month <= 9) {
      spring = 0
      summer = 1
      fall = 0
      winter = 0
    } else {
      spring = 0
      summer = 0
      fall = 1
      winter = 0
    }

    return {spring, summer, fall, winter}
  }

 

  async function getPrediction(e) {
    //TODO: code to get prediction
    // console.log("all Seasonssssss: ", getSeasons(item.Flight_date))
    
    var seasons = getSeasons(item.Flight_Date)
    console.log("all seasons: ", seasons )

    // Body of the request
    var flightSelectedInfo = {
      "Inputs": {
          "WebServiceInput0":
          [
              {
                  'DATE': "",
                  'HourlyAltimeterSetting': `${item.HourlyAltimeterSetting}`,
                  'HourlyDewPointTemperature': `${item.HourlyDewPointTemperature}`,
                  'HourlyDryBulbTemperature': `${item.HourlyDryBulbTemperature}`,
                  'HourlyPrecipitation':`${item.HourlyPrecipitation}`,
                  'HourlyRelativeHumidity': `${item.HourlyRelativeHumidity}`,
                  'HourlySeaLevelPressure': `${item.HourlySeaLevelPressure}`,
                  'HourlyStationPressure': `${item.HourlyStationPressure}`,
                  'HourlyVisibility': `${item.HourlyVisibility}`,
                  'HourlyWetBulbTemperature': `${item.HourlyWetBulbTemperature}`,
                  'HourlyWindDirection': `${item.HourlyWindDirection}`,
                  'HourlyWindSpeed': `${item.HourlyWindSpeed}`,
                  'Flight_date': `${item.Flight_date}`,
                  'Flight_Number': `${item.Flight_Number}`,
                  'Destination_Airport': `${item.Destination_Airport}`,
                  'Scheduled_Dep_Time':`${item.Scheduled_Dep_Time}`,
                  'Departure_delay': `${item.Wheeloff_Time}`,
                  'Delay_Ind': ``,
                  'Display_Date': ``,
                  'Hour_Weather': `${item.Scheduled_Dep_Time.substring(0,2)}`,
                  'Hour_Scheduled_Flight': `${item.Scheduled_Dep_Time.substring(0,2)}`,
                  'Winter': `${seasons.winter}`,
                  'Spring': `${seasons.spring}`,
                  'Summer': `${seasons.summer}`,
                  'Fall': `${seasons.fall}`,
              },
          ],
      },
      "GlobalParameters": {
      }
  }
    try {
      console.log("flight selected info:", flightSelectedInfo)
      localStorage.setItem("flightSelectedInfo", JSON.stringify(flightSelectedInfo))
      const response = await axios.post("/delayPrediction", flightSelectedInfo)

      const success = response.data.success
      
      if (success) {
          // stop loading
          var finalRes = response.data.value
       
          console.log("response from server", finalRes)

          setPredictionResult(finalRes)
          setIsPredAvailable(true)
     
      } else {
          console.log(response.data.message)
      }

    } catch(e) {
        console.log("There was an error with axios call", e)
    }

  }

  function getResult() {
    // Change border of selected item
    setCardSelected(item.Flight_Number)
    setIsFlightSelected(true)
    setIsPredAvailable(false)
    
    // Scroll to the top of the page
    setTimeout(() => {
      window.scrollTo(0, 0);
    }, 800)

    // Wait for 3s before making api call to get prediction
    setTimeout(() => {
      getPrediction()
    }, 2000)
  }


  return (
    <div className={`${cardClass }`} onClick={getResult}>
          {/* <ButtonBase onClick={getPrediction}  sx={{ minWidth: "100%"}}>
            <Card variant="outlined">
                <CardHeader
                avatar={
                  <Avatar aria-label="logo">
                    <img src={aa_logo}  className={classes.logo} alt="airline_logo" />
                  </Avatar>
                }
            
                title="Shrimp and Chorizo Paella"
                subheader="American Airlines"
              />
              <CardContent>
                <Typography variant="body2" sx={{ mb: 1.5 }} color="text.secondary">
                  well meaning and kindly.
                  <br />
                  {'"a benevolent smile"'}
                </Typography>
              </CardContent>
            </Card>
          </ButtonBase> */}

          
          <div className="card-element-item1-header">
             <div className="card-element-item1-header-logo">
               <img src={aa_logo}  alt="airline_logo" />
             </div>
             <div className="card-element-item1-header-text">
                <div className="card-element-item1-header-text-airline">
                   <span>American Airlines</span>
                </div>
                <div className="card-element-item1-header-text-route"> 
                   {origin}&nbsp;
                   <span style={{ fontSize: "1.25rem" }}>&#8594;</span>
                   &nbsp;{destination}
                </div>
             </div>
          </div>
          <div className="card-element-item1-body">
            <div className="card-element-item1-body-left">
              <span>Flight Number:&nbsp;<strong>{item.Flight_Number}</strong> </span>
            </div>
            <div className="card-element-item1-body-right">
               <span>Scheduled Time:&nbsp;<strong>{finalTime}</strong></span>
            </div>

          </div>
      
    </div>
  );
}

export default FlightCard



