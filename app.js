const argv = require('yargs').options({
    nombre:{
        alias: 'n',
        desc: 'Commando para ingresar un nombre',
        demand: true
    }
}).argv;


let bd =  [ "Argos.S.A.S", "Argon S.aS", "Brayan Castaño","Carolina Montoya"]
let nombre = argv.nombre;

let calcularCoincidencias = async ( nombre ) => {
    let totalBd = 0; // almacena la cantidad de letras de la palabra almacenada en la bd
    let totalNom = 0; // almacena la cantidad de letras de la palabra a ingresar
    //Al momento de analizar todas las palabras se debe determinar cual contiene una mayor coincidencia
    let coincidenciaMayor = {
        porc: 0,
        palabra: '',
        index: null,
        coincidencias: 0
    }; 
    //Contador de coincidencias por cada letra de cada palabra
    let contCoincidencias = 0;
    //Almacena la palabra de la bd descompuesta por letras
    let arrBd = [];
    //Almacena la palabra ingresada descompuesta por letras
    let arrNom = [];
    //Almacena la palabra de la bd pero procesada quitandole los espacios en blanco
    let supBd = '';
    //Almacena la palabra ingresada pero procesada quitandole los espacios en blanco
    let supNom = '';
    //Valido primero si son exactamente iguales para evitar procesar las palabras
    for( let i = 0; i < bd.length; i++ ){
        if(nombre.toLowerCase() === bd[i].toLowerCase()){
            return `${nombre} coincide en un 100% con el nombre ${bd[i]} almacenado en la base de datos. \nEs posible que las palabras solo se diferencien entre mayúsculas y minúsculas por lo que recomendamos se verifique esto`
        }
    }
    //Si no son iguales proceso cada palabra
    for( let i = 0; i < bd.length; i++ ){
        supBd = bd[i]; 
        supBd = supBd.replace(/ /g, "");//quito los espacion en blanco por medio de una expresion regular
        supNom = nombre;
        supNom = supNom.replace(/ /g, "");
        /**
         * Obtengo la cantidad de letras para lograr sacar un porcentaje de coincidencias.
         * Es importante saber que la busqueda consiste en encontrar la mejor coincidencia de la palabra en la base de datos
         * por lo que el calculo de coincidencias se halla haciendo el 100% la cantidad de letras de la palabra en bd
         * y el porcentaje a hallar es la cantidad de letras de la palabra ingresada
         * */
        totalBd = supBd.length;
        totalNom = supNom.length;
        //Creo un array con las palabras descompuestas en letras
        arrBd = supBd.split("");
        arrNom = supNom.split("");
        //if(totalBd <= totalNom){
            for(let i  = 0; i < totalBd; i++){
                //Para evitar errores siempre pregunto si existe la letra 
                console.log("-------------");
                if(arrNom[i] != undefined){
                    
                    console.log(arrBd[i].toLowerCase(),arrNom[i].toLowerCase())
                    if(arrBd[i].toLowerCase() === arrNom[i].toLowerCase()){
                        contCoincidencias++;
                    }
                }
            }
        //}
        /* else if(totalBd > totalNom){
            for(let i  = 0; i < totalNom; i++){
                if(arrBd[i].toLowerCase() === arrNom[i].toLowerCase()){
                    contCoincidencias++;
                }
            }
        } */
        if(contCoincidencias > coincidenciaMayor.coincidencias ){
            coincidenciaMayor.coincidencias = contCoincidencias;
            coincidenciaMayor.palabra = bd[i];
            coincidenciaMayor.porc = ( coincidenciaMayor.coincidencias * 100 ) / totalBd;
            coincidenciaMayor.index = i;
        }
        contCoincidencias = 0;
        
    }
    //Retorno la mejor coincidencia pero tambien podria retornar un array con todas las coindicencias
    return coincidenciaMayor;
}

calcularCoincidencias( nombre )
.then( resp =>{
    //console.log(resp)
   if(resp.porc > 0){
    console.log(`La palabra ${argv.nombre} coincide en un ${resp.porc}% con ${resp.palabra}`);
   }else{
       console.log(`${argv.nombre} no está creada en la bd, será ingresada`);
   }
} )
.catch( e  => {
    console.log(e);
})