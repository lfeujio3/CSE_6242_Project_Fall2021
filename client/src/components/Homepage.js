import React, {useState, useEffect} from 'react';
import axios from "axios";
import Navbar from "./Navbar"
import Dashboard from './Dashboard';


function Homepage() {

  
    return (
        <>
           <Navbar />
           <Dashboard />  
        </>
    )

}

export default Homepage