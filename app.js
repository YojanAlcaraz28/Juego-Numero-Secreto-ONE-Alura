// Permite acceder a cada elemento  - Puente o forma de conectar el JS con los elementos que se tienen en el HTML
// No es un texto es un objeto
// let titulo = document.querySelector('h1'); 
// titulo.innerHTML = "Juego del número secreto"; // Para deninir el texto del objeto

// let parrafo = document.querySelector('p');
// parrafo.innerHTML = "Indica un número del 1 al 10";

// Eventos en JS: mover el cursor. clickear un botón. Todos los eventos en JS empiezan con "on".

let numeroSecreto = 0;
let intentos = 1;
let listaNumerosSorteados = [];
let numeroMaximo = 10;


function asignarTextoElemento(elemento, texto){
    let elementoHTML = document.querySelector(elemento); 
    elementoHTML.innerHTML = texto; // Para deninir el texto del objeto
    return;
}

// Definición de una función en JS: Esta es llamada en el archivo HTML al clickear en el botón "Intentar"
function verificarIntento(){
    let numeroDeUsuario =  parseInt(document.getElementById('valorUsuario').value);
    /// console.log(numeroDeUsuario === numeroSecreto); // Tripe igual se usa para verificar si los valores son iguales tanto en valor como en tipo
    if (numeroDeUsuario === numeroSecreto){
        asignarTextoElemento('p', `Acertaste el número en ${intentos} ${(intentos === 1) ? "intento" : "intentos"}`);
        document.getElementById('reiniciar').removeAttribute('disabled');
    }else{
        // El usuario no acertó:
        if(numeroDeUsuario > numeroSecreto){
            asignarTextoElemento('p', "El número secreto es menor");
        }else{
            asignarTextoElemento('p', "El número secreto es mayor");
        }
        intentos++;
        limpiarCaja();
    }
    return;
} 

// Función para limpiar campo de texto (input):
function limpiarCaja(){
    document.querySelector("#valorUsuario").value = ''; // Cuando se usa el selector genérico, se debe poner # antes del ID, cuando se usa getElementById no se pone #.
}

// Función que retorna un valor:
function generarNumeroSecreto() {
    let numeroGenerado = Math.floor(Math.random()*numeroMaximo) + 1;
    console.log(numeroGenerado);
    console.log(listaNumerosSorteados);
    // Ya se sortearon todos los números:
    if(listaNumerosSorteados.length == numeroMaximo){
        asignarTextoElemento('p', "Ya se sortearon todos los números posibles");
    }else{
        if (listaNumerosSorteados.includes(numeroGenerado)){
            return generarNumeroSecreto();
        }else{
            listaNumerosSorteados.push(numeroGenerado)
            return numeroGenerado;
        }

    }
    // Si el numero generado esta incluido en la lista 
     
    // return numeroSecreto;
}

function condicionesIniciales() {
    // La función asignarTextoElemento y las llamadas a continuación reemplaza las líneas comentadas arriba.
    asignarTextoElemento('h1', "Juego del número secreto");
    asignarTextoElemento('p', `Indica un número del 1 al ${numeroMaximo}`);
    numeroSecreto = generarNumeroSecreto();
    // Inicializar el número de intentos:
    intentos = 1;
}

// Función para reiniciar el juego:
function reiniciarJuego() {
    // Limpiar la caja
    limpiarCaja();
    condicionesIniciales();
    // Deshabilitar el botón de Nuevo juego:
    document.querySelector('#reiniciar').setAttribute('disabled', 'true');
    
}

condicionesIniciales();
