const inquirer = require('inquirer');
require('colors');

const preguntas = [
    {
        type: 'list',
        name: 'opcion',
        message: '¿Qué desea hacer?',
        choices: [
            {
                value: 1,
                name: `${'1.'.cyan} Buscar ciudad`
            },
            {
                value: 2,
                name: `${'2.'.cyan} Historial`
            },
            {
                value: 0,
                name: `${'0.'.cyan} Salir`
            },
        ]
    }
]


const inquirerMenu = async() => {
    
    console.clear();
    console.log('=============================='.cyan);
    console.log('    Seleccione una opción:'.white);
    console.log('==============================\n'.cyan);
    
    const { opcion } = await inquirer.prompt(preguntas);
    console.log();

    return opcion;

}

const pausa = async() => {

    const question = [
        { 
            type: 'input',
            name: 'enter',
            message: `Presione ${ 'Enter'.cyan } para continuar`
        }
    ]

    await inquirer.prompt(question)

}

const leerInput = async( message ) => {

    const question = [{
        type: 'input',
        name: 'desc',
        message,
        validate( value ) {
            if ( value.length === 0 ) {
                return 'Por favor ingrese un valor';
            }
            return true;
        }
    }];

    const { desc } = await inquirer.prompt(question);
    return desc;
}

const listadoTareasBorrar = async( tareas = []) => {

    const choices = tareas.map( (tarea, i) => {

        const idx = `${i + 1}.`.cyan;

        return {
            value: tarea.id,
            name: `${idx} ${tarea.descripcion}`
        }

    })

    choices.unshift({
        value: '0',
        name: '0.'.cyan + ' Cancelar'
    })

    const preguntas = [
        {
            type: 'list',
            name: 'id',
            message: 'borrar',
            choices
        }
    ]

    const { id } = await inquirer.prompt(preguntas);
    return id;

}

const confirmar = async (message) => {

    const question = [
        {
            type: 'cofirm',
            name: 'ok',
            message
        }
    ];


    const { ok } = await inquirer.prompt(question); 
    return ok;
}

const mostrarListadoChecklist = async( tareas = []) => {

    const choices = tareas.map( (tarea, i) => {

        const idx = `${i + 1}.`.cyan;

        return {
            value: tarea.id,
            name: `${idx} ${tarea.descripcion}`,
            checked: (tarea.completadoEn) ? true : false,
        }

    })

    const pregunta = [
        {
            type: 'checkbox',
            name: 'ids',
            message: 'Selecciones',
            choices
        }
    ]

    const { ids } = await inquirer.prompt(pregunta);
    return ids;

}


module.exports = {
    inquirerMenu,
    pausa,
    leerInput,
    listadoTareasBorrar, 
    confirmar,
    mostrarListadoChecklist,
};