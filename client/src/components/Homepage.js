import React, {useState, useEffect} from 'react';
import axios from "axios";


function Homepage() {

    const [data, setData] = useState(null)
    const [hasChanged, setHasChanged] = useState(false)
    const [reportSuite, setReportSuite] = useState("")

    // Get result from test 
    async function callBackendAPI() {

        // Body of the request
        try {
            console.log("report suite entered:", reportSuite)
            const response = await axios.post("/getData", {reportSuite: reportSuite})

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
    

    // Update report suite name when entered
    function onChangeReportSuite(e) {
        setReportSuite(e.target.value)
    }

    // Call function when button is clicked on
    function onRunTest(e) {
        e.preventDefault()
        callBackendAPI()
    }
  
    return (
        <>
           <div className="homepage-container">

               <div className="homepage-title">
               <h2>Display Results of Omega QA Tests</h2>
               </div>
               <div className="homepage-body">
                 
                  <form>
                    <div className="homepage-body-item1">
                       <div>
                       <label>Report Suite &nbsp;</label>
                        <input 
                          type="text"
                          value={reportSuite}
                          onChange={onChangeReportSuite}
                          placeholder="Enter the report suite name"
                          size="40"
                        />
                       </div>
                        <div>
                           <button
                             className="btn"
                             onClick={onRunTest}
                           >Run test</button>
                        </div>
                    </div>
                  </form>
               </div>
           </div>
        
        </>
    )

}

export default Homepage