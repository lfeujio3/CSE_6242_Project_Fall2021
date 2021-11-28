const mongoose = require("mongoose");

// Define schema
var Schema = mongoose.Schema;

var predictionResultsSchema = new Schema(
  {
      HourlyAltimeterSetting: {type:Number},
      HourlyDewPointTemperature: {type:Number},
      HourlyDryBulbTemperature: {type:Number},
      HourlyPrecipitation: {type:Number},
      HourlyRelativeHumidity: {type:Number},
      HourlySeaLevelPressure: {type:Number},
      HourlyStationPressure: {type:Number},
      HourlyVisibility: {type:Number},
      HourlyWetBulbTemperature: {type:Number},
      HourlyWindDirection: {type:Number},
      HourlyWindSpeed: {type:Number},
      Flight_date: {type:String},
      Flight_Number: {type:Number},
      Destination_Airport: {type:String},
      Scheduled_Dep_Time: {type:String},
      Departure_delay: {type:Number},
      Delay_Ind: {type:Boolean},
      Hour_Weather: {type:Number},
      Hour_Scheduled_Flight: {type:Number},
      Winter: {type:Number},
      Spring: {type:Number},
      Summer: {type:Number},
      Fall: {type:Number},
      Scored_Labels: {type:Boolean},
      Scored_Probabilities: {type:Number}
}
);

// Compile model from schema
var predictionResults = mongoose.model('FlightDelayForecast', predictionResultsSchema );

module.exports = predictionResults;