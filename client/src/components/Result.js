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
import prediction_logo from '../images/prediction_logo.png'
import { Air, Cloud, WbSunny, Directions } from '@mui/icons-material';
import {FaCloudSun, FaWind, FaCloudRain, FaDirections} from "react-icons/fa"
function Result() {
  const { predictionResult, isFlightSelected, isPredAvailable} = useContext(ServiceContext);

  console.log("Prediction Result: ", predictionResult)
  var predProb = (predictionResult['Scored Probabilities'] * 100).toFixed(2)
  console.log("probability in percentage: ", predProb)
  console.log("is predAvailabe: ", isPredAvailable)
  return (
    <div className="result-container">
      <div className="result">
         {isFlightSelected ? (
           <>
              {isPredAvailable ? (
                <div className="result-prediction">
                   <div className="result-prediction-prob">
                     <div className="result-prediction-prob-text">
                       <h4>Flight Delay Probability</h4>
                     </div>
                     <div className="result-prediction-prob-result">
                     {predProb}%
                     </div>
                   </div>
                  <div className="result-prediction-weather">
                    <div className="result-prediction-weather-text"><h4>Weather</h4></div>
                    <div className="result-prediction-weather-result">
                      <div className="weather-result-temp">
                        <div className="weather-result-temp-city">Atlanta</div>
                        <div className="weather-result-temp-number">{predictionResult["HourlyDryBulbTemperature"]}&#176;</div>
                        <div className="weather-result-temp-icon"><FaCloudSun size="2.5rem"/></div>
                      </div>
                      <div className="weather-result-params">
                        <div className="weather-result-params-item">
                          <div className="weather-result-params-item-text">Wind Speed (mph)</div>
                          <div className="weather-result-params-item-icon"><FaWind size="2rem"/></div>
                          <div className="weather-result-params-item-number">{predictionResult["HourlyWindSpeed"]}</div>
                        </div>
                        <div className="weather-result-params-item">
                          <div className="weather-result-params-item-text">Wind Direction</div>
                          <div className="weather-result-params-item-icon"><FaDirections size="2rem"/></div>
                          <div className="weather-result-params-item-number">{predictionResult["HourlyWindDirection"]}</div>
                        </div>
                        <div className="weather-result-params-item">
                         <div className="weather-result-params-item-text">Precipitation (inch)</div>
                          <div className="weather-result-params-item-icon"><FaCloudRain size="2rem"/></div>
                          <div className="weather-result-params-item-number">{predictionResult["HourlyPrecipitation"]}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                    
                </div>
              ) : (
                <div className="result-loading">
                  <Stack spacing={0.75}>
                    <Skeleton variant="rectangular" height={250} />
                    {/* <Skeleton variant="text" width="100%" /> */}
                  </Stack>
                  <br/>
                  <br/>
                  <Stack spacing={0.75}>
                  <Skeleton variant="rectangular" height={250} />
                  {/* <Skeleton variant="text" width="100%" /> */}
                  </Stack>
            </div>
              )}
           
           </>
         ) : (
           <div className="result_null">
             
             <div className="result_null_text">
                <h4>Prediction results: no flight selected!</h4>
             </div>
             <div className="result_null_img">
                 <img src={prediction_logo}  alt="prediction_logo" />
             </div>
             <div className="result_null_text2">
               Determine the probability of your next flight being delayed due to weather. 
             </div>
           </div>
         )}
      </div>
    </div>
  )



}


export default Result