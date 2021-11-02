import React, {useState} from 'react';
import { Route, BrowserRouter, Switch, withRouter } from 'react-router-dom';
import "./App.css"
import ServiceContext from "./ServiceContext"

// Import components
import Homepage from "./components/Homepage"

require("dotenv").config();

function App(props) {
  return (
    <>
      <ServiceContext.Provider
        value = {{
          
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
