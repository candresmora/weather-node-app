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
            
            const busqueda = await leerInput('Ciudad: ');

            const lugares = await busquedas.ciudad( busqueda );
            const id = await listadoLugares(lugares);
            const lugarSeleccionado = lugares.find(lugar => lugar.id === id);
            
            
            console.log('\nInformacion de la ciudad\n'.green);
            console.log('Ciudad:', lugarSeleccionado.nombre); 
            console.log('Lat:', lugarSeleccionado.lat); 
            console.log('Lng:', lugarSeleccionado.lng);
            console.log('Temperatura:', )
            console.log('Temp Min:', )
            console.log('Temp Max:', )
            break;
            
        }

        if( opt !== 0 ) await pausa();
        
    } while ( opt !== 0 );

}

main();