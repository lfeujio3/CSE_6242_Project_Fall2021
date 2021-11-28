import React, {useState} from 'react';
import { Route, BrowserRouter, Switch, withRouter } from 'react-router-dom';
import "./App.css"
import ServiceContext from "./ServiceContext"

// Import components
import Homepage from "./components/Homepage"

require("dotenv").config();

function App(props) {

  const [cardSelected, setCardSelected] = useState({})
  const [predictionResult, setPredictionResult] = useState({})
  const [isFlightSelected, setIsFlightSelected] = useState(false)
  const [isPredAvailable, setIsPredAvailable] = useState(false)


  return (
    <>
      <ServiceContext.Provider
        value = {{
          cardSelected,
          predictionResult,
          isFlightSelected,
          isPredAvailable,
          setCardSelected,
          setPredictionResult,
          setIsFlightSelected,
          setIsPredAvailable
        }}
      >
        <BrowserRouter>
          <Switch>
            <Route exact path = "/">
              <Homepage />
            </Route>

          </Switch>
      
      </BrowserRouter>
      </ServiceContext.Provider>
    </>
  )
}

export default App;
