const config = require('./config.js');
const axios = require('axios');

module.exports = class WeatherAPI {
    constructor() {
        this.key = config.key;
        this.host = config.host;
        this.url = config.url;
    }

    async PerformGetRequest(headers, params) {
        let options = {
            method: 'GET',
            url: this.url,
            params: params,
            headers: headers
        };
        // executes an axios GET request with error catch
        try { 
            let response = await axios.request(options);
            // return successful query results to calling function
                return response.data;
        }
        catch(error) {
            console.error(error);
        };
    }

    async GetDailyWeather(params) {
        const headers = { 'X-RapidAPI-Key': config.key, 'X-RapidAPI-Host': config.host }
        let result = await this.PerformGetRequest(headers, params);
        return result;
    }
}