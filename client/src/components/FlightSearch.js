import React, {useState, useEffect, useContext} from 'react';
import ServiceContext from '../ServiceContext';
import axios from "axios";
import FlightCard from "./FlightCard"
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import Alert from '@mui/material/Alert';
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';
import * as data from '../airport_codes.json'
import homepage_logo from '../images/flight_homepage.png'
import no_result_logo from "../images/no_result.png"
// Import airport names and code
const airports = data.default.airports

function FlightSearch() {

  const { cardSelected, setIsFlightSelected } = useContext(ServiceContext);

  const startDate = new Date("01/01/2019")
  const endDate = new Date("12/31/2019")
  const [hasChanged, setHasChanged] = useState(false)
  const [originAirport, setOriginAirport] = useState("")
  const [originAirportValue, setOriginAirportValue] = useState("")
  const [destinationAirport, setDestinationAirport] = useState("")
  const [destinationAirportValue, setDestinationAirportValue] = useState("")
  const [date, setDate] = useState(null);
  const [isSearching, setIsSearching] = useState(false)
  const [isFlightsLoading, setIsFlightsLoading] = useState(false)
  const [inputMissing, setInputMissing] = useState(false)
  const [errorMsg, setErrorMsg] = useState("")
  const [searchResults, setSearchResults] = useState([])
  const nonSelected = "flight-search-card-element-item1"
  const selected = "flight-search-card-element-item1-selected"

  // Data for destination airports
  const options = airports.map((option) => {
    const firstLetter = option.label[0].toUpperCase();
    return {
      firstLetter: /[0-9]/.test(firstLetter) ? '0-9' : firstLetter,
      ...option,
    };
  });

  // Only provide 1 value for origin airport (Atlanta)
  const originData = [{
    Code: "ATL",
    Name: "Atlanta International Airport",
    City: "Atlanta",
    State: "GA",
    label: "Atlanta International Airport (ATL)"
  }]


  // Update origin airport when selected
  function onChangeOrigin(event, newValue) {
      setOriginAirport(newValue)
  }

  // Update destination airport when selected
  function onChangeDestination(event, newValue) {
      setDestinationAirport(newValue)
  }

  // Update the date
  function onChangeDate(newDate) {
    setDate(newDate)
    console.log("orgin value: ", originAirport)
    console.log("destination value: ",destinationAirport)
  }

  useEffect(() => {
    if (errorMsg) {
      setInputMissing(true)
    }
  }, [errorMsg])

  useEffect(() => {
    if (hasChanged) {
     console.log("Search has changed")
    }
  }, [hasChanged])


  // Function to sort array of flight search
  function compare(a, b) {
    // Use toUpperCase() to ignore character casing
    const flightA = a.Scheduled_Dep_Time
    const flightB = b.Scheduled_Dep_Time
  
    let comparison = 0;
    if (flightA > flightB) {
      comparison = 1;
    } else if (flightA < flightB) {
      comparison = -1;
    }
    return comparison;
  }


  // Call function when button is clicked on
  
  // Get result from test 
  async function getSearchFlights() {
    setErrorMsg("")

    // Check if inputs values are missing 
    if (!originAirport) {
      setErrorMsg(prev => prev + "origin airport;")
    } 
    
    if (!destinationAirport) {
      setErrorMsg(prev => prev + " destination airport;")
    } 
    if (!date) {
      setErrorMsg(prev => prev + " date;")
    } 
    
    if (originAirport && destinationAirport && date) {
      
      // Remove error message if existing
      setInputMissing(false)
      setErrorMsg("")

      // Set isSearching to true
      setIsSearching(true)

      // Reset the change state tracker
      setHasChanged(false)

      // set isLoading to true
      setIsFlightsLoading(true)

      // Body of the request
      try {
        var newDate = new Date(date)
        // var formattedDate = newDate.toISOString().split('Z')[0]  //FIXME: properly format date
        var formattedDate = newDate.toLocaleDateString()
        const searchInfo = {originAirport: originAirport, destinationAirport: destinationAirport, date: formattedDate}
        console.log("report search info:", searchInfo)
        localStorage.setItem("searchInfo", JSON.stringify(searchInfo))
        const response = await axios.post("/searchFlights", searchInfo)


        const success = response.data.success
        
        if (success) {
            // stop loading
            setIsFlightsLoading(false)
            setIsFlightSelected(false)
            console.log("response from server", response.data.value)
            var sortedFlights = (response.data.value).sort(compare)
            setSearchResults(sortedFlights)
            setHasChanged(true)
        } else {
            console.log(response.data.message)
        }

    } catch(e) {
        console.log("There was an error with axios call", e)
    }

    }

}


  return (

    <div className="search-container">

      <div className="search">
        <div className="search-title">
          <h2>Search Flights</h2>
        </div>
        <div className="search-body">
            
            <div className="search-body-item1">
              <Box
                component="form"
                sx={{'& > :not(style)': { m: 1, width: '25ch' },display: 'flex'}}
                // noValidate
                autoComplete="off"
              >
                  <Autocomplete
                  id="origin-airport"
                  options={originData}
                  value={originAirport}
                  onChange={onChangeOrigin}
                  inputValue={originAirportValue}
                  onInputChange={(event, newInputValue) => {
                    setOriginAirportValue(newInputValue);
                  }}
                  required
                  renderInput={(params) => <TextField {...params} label="Origin airport" />}
                />
                <Autocomplete
                  id="destination-airport"
                  // options={airports}
                  options={options.sort((a, b) => -b.firstLetter.localeCompare(a.firstLetter))}
                  groupBy={(option) => option.firstLetter}
                  value={destinationAirport}
                  onChange={onChangeDestination}
                  inputValue={destinationAirportValue}
                  onInputChange={(event, newInputValue) => {
                    setDestinationAirportValue(newInputValue);
                  }}
                  required
                  renderInput={(params) => <TextField {...params} label="Destination airport" />}
                />
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DatePicker
                    label="Departing"
                    value={date}
                    onChange={onChangeDate}
                    minDate={startDate}
                    maxDate = {endDate}
                    required
                    renderInput={(params) => <TextField {...params} />}
                  />
                </LocalizationProvider>
                <Button 
                  variant="outlined" 
                  onClick={getSearchFlights}
                >
                    {isFlightsLoading ? "Searching..." : "Search"}
                </Button>
              </Box>
            </div>
            {inputMissing ? (
              <div className="search-body-errors">
                  <Alert variant="outlined" severity="error">
                    The following fields are missing: {`${errorMsg}`}
                  </Alert>
              </div>
            ) : (null)}
          </div>
      </div>
      <div className="search_results">
       {isSearching ? (
         <div >
            {isFlightsLoading ? (
              <div className="search_results_loading">
                  <Stack spacing={0.75}>
                    {/* <Skeleton variant="circular" width={40} height={40} /> */}
                    {/* <Skeleton variant="text" /> */}
                    <Skeleton variant="rectangular" height={80} />
                    <Skeleton variant="text" width="30%" />
                  </Stack>
                  <br/>
                  <Stack spacing={0.75}>
                  {/* <Skeleton variant="text" /> */}
                  <Skeleton variant="rectangular" height={80} />
                  <Skeleton variant="text" width="30%" />
                  </Stack>
                  <br/>
                  <Stack spacing={0.75}>
                    {/* <Skeleton variant="text" /> */}
                    <Skeleton variant="rectangular" height={80} />
                    <Skeleton variant="text" width="30%" />
                  </Stack>
                  <br/>
                  <Stack spacing={0.75}>
                    {/* <Skeleton variant="text" /> */}
                    <Skeleton variant="rectangular" height={80} />
                    <Skeleton variant="text" width="30%" />
                  </Stack>
              </div>
            ) : (
              <div className="search_results_actual">
                {(searchResults && searchResults.length >= 1) ? (
                  
                   searchResults.map((item, i) => {
                    return (
                      <div className="flight-search-card-element" key={`${parseInt(item.Flight_Number)}`}>
                        <FlightCard 
                          key = {parseInt(item.Flight_Number)}
                          item = {JSON.stringify(item)}
                          origin = {JSON.stringify(originAirport)}
                          destination = {JSON.stringify(destinationAirport)}
                          cardClass = {cardSelected == item.Flight_Number ? selected : nonSelected}
                        />
                      </div>
                    )
                  })
                ) : (
                  <div className="no_search">
                    <div className="no_search-text">
                        <p> No flights found! Please search another flight. </p>
                    </div>
                    <div className="no_search-img2">
                        <img src={no_result_logo}  alt="no_result_logo" />
                    </div>
                  </div>

                )}
              </div>
            )}
         </div>
       ) : (
         <div className="no_search">
             <div className="no_search-text">
                <h4>No flights to display. Please search a flight!</h4>
             </div>
             <div className="no_search-img">
                 <img src={homepage_logo}  alt="homepage_logo" />
             </div>
         </div>
       )}

      </div>
   </div>
  )
}


export default FlightSearch