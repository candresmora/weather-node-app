const axios = require('axios');

class Busquedas {

    historial = ['Bogota', 'Madrid', 'San Jose'];

    constructor() {
        // TODO: if DB exists, read the DB
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


}

module.exports = Busquedas;