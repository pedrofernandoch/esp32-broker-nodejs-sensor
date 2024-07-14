import React, { useState, useEffect } from "react";
import axios from "axios";
import { baseApiUrl } from "../common/utils/systemConstants";
import { toastr } from "react-redux-toastr";
import './temp-hum.css'
import {locale} from '../common/utils/textLocale'
import RefreshIcon from '@mui/icons-material/Refresh'
import IconButton from '@mui/material/IconButton';

function TempHumView(props) {
    const [temperature, setTemperature] = useState(null);
    const [humidity, setHumidity] = useState(null);
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

    async function fetchTemperature() {
        try {
            const response = await axios.get(`${baseApiUrl}/temperature`);
            setTemperature(response.data);
            return 0;
        } catch (e) {
            toastr.error("Error", e);
            return -1;
        }
    }

    async function fetchHumidity() {
        try {
            const response = await axios.get(`${baseApiUrl}/humidity`);
            setHumidity(response.data);
            return 0;
        } catch (e) {
            toastr.error("Error", e);
            return -1;
        }
    }

    useEffect(() => {
        fetchTemperature();
        fetchHumidity();
    }, []);

    return (
        <div>
            <div className="app">
                <div className="dashboard">
                    <div className="Title-box">
                        <div className="title">{locale[props.locale].tempHum.title}</div>
                        <div className="date">{new Date().toLocaleDateString(locale[props.locale].tempHum.date, options)}</div>
                        <div className="refresh"><IconButton onClick={() => {fetchTemperature();fetchHumidity()}}><RefreshIcon/></IconButton></div>
                    </div>
                    <div className="weather-box">
                        <div className="monitor">
                            {temperature}°
                        </div>
                        <div className="monitor">
                            {humidity}%
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TempHumView;
