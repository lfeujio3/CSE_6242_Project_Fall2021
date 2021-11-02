import React, {useState, useEffect} from 'react';
import axios from "axios";


function Homepage() {

    const [data, setData] = useState(null)
    const [hasChanged, setHasChanged] = useState(false)
    const [originAirport, setOriginAirport] = useState("")
    const [destinationAirport, setDestinationAirport] = useState("")

    // Get result from test 
    async function callBackendAPI() {

        // Body of the request
        try {
            const searchInfo = {originAirport: originAirport, destinationAirport: destinationAirport}
            console.log("report search info:", searchInfo)
            const response = await axios.post("/getData", searchInfo)

            const success = response.data.success
            
            if (success) {
                console.log("response from server", response)
                setHasChanged(true)
                setData(response.data.value)
            } else {
                console.log(response.data.message)
            }

        } catch(e) {
            console.log("There was an error with axios call", e)
        }

    }
    

    // Update origin airport when selected
    function onChangeOrigin(e) {
        setOriginAirport(e.target.value)
    }

    // Update destination airport when selected
    function onChangeDestination(e) {
        setDestinationAirport(e.target.value)
    }

    // Call function when button is clicked on
    function onSearch(e) {
        e.preventDefault()
        callBackendAPI()
    }
  
    return (
        <>
           <div className="homepage-container">

               <div className="homepage-title">
               <h2>Search a Flight</h2>
               </div>
               <div className="homepage-body">
                 
                  <form>
                    <div className="homepage-body-item1">
                       <div>
                            <label>Origin Airport &nbsp;</label>
                            <input 
                            type="text"
                            value={originAirport}
                            onChange={onChangeOrigin}
                            placeholder="Flying from"
                            size="40"
                            />
                       </div>
                       <div>
                            <label>Destination Airport &nbsp;</label>
                            <input 
                            type="text"
                            value={originAirport}
                            onChange={onChangeDestination}
                            placeholder="Flying to"
                            size="40"
                            />
                       </div>
                        <div>
                           <button
                             className="btn"
                             onClick={onSearch}
                           >search</button>
                        </div>
                    </div>
                  </form>
               </div>
           </div>
        
        </>
    )

}

export default Homepage