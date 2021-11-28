
import React, {useState, useEffect} from 'react';
import axios from "axios";
import FlightSearch from './FlightSearch';
import Result from './Result';


function Dashboard() {

  return (

    <div className="dashboard-container">
      <FlightSearch />
      <Result />
    </div>
  )
}


export default Dashboard