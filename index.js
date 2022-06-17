require('dotenv').config()

const { inquirerMenu, pausa, leerInput, listadoLugares } = require("./helpers/inquirer");
const Busquedas = require('./models/busquedas');

const main = async() => {
    
    const busquedas = new Busquedas();

    console.clear();

    let opt;

    do {
        opt = await inquirerMenu(); 

        switch (opt) {
            case 1:
            
            // Buscar lugares
                const busqueda = await leerInput('Ciudad: ');

                // Seleccionar el lugar
                const lugares = await busquedas.ciudad( busqueda );
                const id = await listadoLugares(lugares);
                if (id === '0') continue;

                const lugarSeleccionado = lugares.find(lugar => lugar.id === id);

                busquedas.agregarHistorial(lugarSeleccionado.nombre);


                // Clima 
                const clima = await busquedas.climaLugar( lugarSeleccionado.lat, lugarSeleccionado.lng );

                console.clear();
                console.log('\nInformación de la ciudad\n'.cyan);
                console.log('Ciudad:', lugarSeleccionado.nombre); 
                console.log('Lat:', lugarSeleccionado.lat); 
                console.log('Lng:', lugarSeleccionado.lng);
                console.log('Temperatura:', clima.temp)
                console.log('Temp Min:', clima.min)
                console.log('Temp Max:', clima.max)
                console.log('El clima esta:', clima.desc)

            break;
         
            case 2:

                busquedas.historialCapitalizado.forEach( ( lugar, i ) => {
                    const idx = `${i + 1}.`.cyan;
                    console.log(`${idx} ${lugar}`)
                })

            break;

        }

        if( opt !== 0 ) await pausa();
        
    } while ( opt !== 0 );

}

main();