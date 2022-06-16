const axios = require('axios');

class Busquedas {

    historial = ['Bogota', 'Madrid', 'San Jose'];

    constructor() {
        // TODO: if DB exists, read the DB
    }

    async getCoordenadas(){
        
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
                baseURL: `https://api.openweathermap.org/data/2.5/weather?lat=${ lat }&lon=${ lon }`,
                params: {
                    'languaje': 'es',
                    'units': 'metric',
                    'appid': process.env.OPENWEATHER_KEY
                }
            });

            // resp.data
            const resp = await instance.get();
            const respWeather = resp.data.weather.map( obj => {
                let desc = Object.values(obj)
                let text = desc[2]
                return text
            });

            const respTemperatures = resp.data.main;

            return {
                desc: respWeather.toString(),
                min: respTemperatures.temp_min,
                max: respTemperatures.temp_max,
                temp: respTemperatures.temp,
            }

        } catch (error) {
            console.error(error);
        }
    }


}

module.exports = Busquedas;