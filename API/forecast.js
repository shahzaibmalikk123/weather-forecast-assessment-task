import axios from "axios";
import { apiKey } from "../constants";

const foreCastEndPoint = (params) =>
    `http://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${params.location}&days=${params.days}&aqi=no&alerts=no`;
const LocationEndPoint = (params) =>
    `http://api.weatherapi.com/v1/search.json?key=${apiKey}&q=${params.cityName}`;

const getAPI = async (endpoint) => {
    const options = {
        method: "GET",
        url: endpoint,
        JSON: true,
    };
    try {
        const response = await axios.request(options);
        return response.data;
    } catch (err) {
        console.log("error: ", err);
        return null;
    }
};

export const fetchWeatherForecast = (params) => {
    const param = {
        location:
            params.latitude && params.longitude
                ? `${params.latitude},${params.longitude}`
                : params.cityName,
        days: params.days,
    };
    let forecastURL = foreCastEndPoint(param);
    return getAPI(forecastURL);
};
export const fetchLocation = (params) => {
    let forecastURL = LocationEndPoint(params);
    return getAPI(forecastURL);
};
