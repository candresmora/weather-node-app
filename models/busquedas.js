const axios = require('axios');

class Busquedas {

    historial = ['Bogota', 'Madrid', 'San Jose'];

    constructor() {
        // TODO: if DB exists, read the DB
    }

    get paramsWeather(){
        return {
            appid: process.env.OPENWEATHER_KEY,
            lang: 'es',
            units: 'metric',
        }
    } 

    async ciudad( lugar = '' ) {

        try {
            
            const instance = axios.create({
                baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${ lugar }.json`,
                params: {
                    'language' : 'es',
                    'access_token' : process.env.MAPBOX_KEY,
                    'limit' : '5',
                }
            });
    
            const resp = await instance.get();
            return resp.data.features.map( lugar => ({
                id: lugar.id,
                nombre: lugar.place_name,
                lng: lugar.center[0],
                lat: lugar.center[1],
            }))

        } catch (error) {
            return [];
        }

    }

    async climaLugar( lat, lon ) {
        try {
            // instance axios.create
            const instance = axios.create({
                baseURL: `https://api.openweathermap.org/data/2.5/weather`,
                params: { ...this.paramsWeather, lat, lon }
            });

            // resp.data
            const resp = await instance.get();
            const { weather, main } = resp.data;

            return {
                desc: weather[0].description,
                min: main.temp_min,
                max: main.temp_max,
                temp: main.temp,
            }

        } catch (error) {
            console.error(error);
        }
    }


}

module.exports = Busquedas;