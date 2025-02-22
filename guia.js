let person = {
    name: "Miguel",
    lastName: "Gonzalez",
}; //Esto es un objeto con las propiedades name y lastName

let llaves = Object.keys(person); //Esto es un arreglo que muestra las llaves del objeto
console.log("Estas son las llaves", llaves); //Imprime las llaves del objeto

let valores = Object.values(person); //Esto es un arreglo que muestra el valor de las llaves
console.log(`Estas son los valores ${valores}`); //Imprime los valores del objeto

let entries = Object.entries(person); //Esto es un arreglo que imprime llaves y valores
console.log(`Estas son las llaves y valores ${entries}`); //Imprime las llaves y los valores del objeto

person.dinero = 1000; //Agrega una nueva llave y valor al objeto a la propiedad dinero
console.log(person); //Imprime el objeto con la nueva llave y valor
delete person.dinero; //Elimina la llave y valor de dinero

let { name } = person; //Esto es una destructuración (Abstracción) de objeto, va a persona y busca la llave name

let residencia = {
    //Esto es un objeto con las propiedades
    ciudad: "CDMX",
    pais: "Mexico",
};
let nuevoobjeto = { ...person, residencia }; //Esto es un spread operator, crea un nuevo objeto con las propiedades de person y residencia
console.log(nuevoobjeto); //Imprime el nuevo objeto

// //------------------------- Código asincrono -------------------------
console.log("Inicio");
setTimeout(() => {
    // esto es un callback, una funcion que se ejecuta en una funcion
    console.log("Primer Timeout"); //normalmente se usa para llamar apis
}, 3000);
//Se ejecuta despues de 3 segundos

// //---------------------- Código sincrono -----------------------------
console.log("Fin");
//Imprime ahi mismo

// //----------------------------------------------------------------------

// // ---------------------- Callbacks hell ------------------------------
//Tener un callback dentro de otro callback
setTimeout(() => {
    console.log("Primer Timeout");
    setTimeout(() => {
        console.log("Segundo Timeout");
        setTimeout(() => {
            console.log("Tercer Timeout");
        }, 3000);
    }, 3000);
}, 3000);

//----------------------------------------------------------------------
// ---------------------- Promesas -------------------------------------
// Es una promesa de que algo va a pasar
// Se puede cumplir o rechazar{resolve, reject}
const promesa = new Promise((resolve, reject) => {
    let exito = true;
    setTimeout(() => {
        if(exito){
            resolve('La operación tuvo éxito');
        }else{
            reject('La operación no tuvo éxito');
        }
    }, 3000);
});

promesa
    .then(resultado => console.log(resultado))//si se cumple la promesa
    .catch(error => console.log(error))//si no se cumple la promesa
    .finally(() => console.log('Proceso terminado'));//se ejecuta al final

function Obtenerusuario(){
    return new Promise((resolve, reject) => {
        let exito = true;
        setTimeout(() => {
            if(exito){
                resolve({id: 1, nombre: 'Miguel'});
            }else{
                reject('Usuario no obtenido');
            }
        }, 3000);
    });
}

function Obtenerpedidos(){
    return new Promise((resolve) => {
        setTimeout(() => resolve(["Pedido 1","Pedido 2", "Pedido 3"]), 2000);
    });
}

ObtenerUsuario()
    .then(usuario =>{
        console.log("Usuario", usuario);
        return ObtenerPedidos();
    })
    .then(pedidos =>{
        console.log("Pedidos del usuario", pedidos);
    })
    .catch(error => console.log(error))
    .finally(() => console.log('Proceso terminado'));

// ----------------------------------------------------------------------
// ---------------------- Async Await ----------------------------------
// Es una forma de trabajar con promesas de manera más sencilla

const mipromesa = new Promise((resolve, reject) => {
    let exito = true;
    setTimeout(() => {
        if (exito) {
            resolve("La operación tuvo éxito");
        } else {
            reject("La operación no tuvo éxito");
        }
    }, 3000);
});

async function miFuncion() {
    let contador = 0;
    const animacion = setInterval(() => {
        const puntos = ".".repeat(contador % 4);
        process.stdout.write(`\r ⌛ Cargando${puntos}   `); // Agrega espacios para borrar caracteres anteriores
        contador++;
    }, 500);

    try {
        const resultado = await mipromesa;
        clearInterval(animacion);
        console.log("\n" + resultado); // Agrega un salto de línea para evitar sobrescribir
    } catch (error) {
        clearInterval(animacion);
        console.log("\n" + error);
    }
}

miFuncion();

import readline from 'readline';
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

const persona = {
    nombre: "",
    edad: 0,
};

rl.question("¿Cuál es tu nombre? ", (nombre) => {
    persona.nombre = nombre
    rl.question('Ingrese su edad: ',(edad) =>{
        persona.edad = parseInt(edad);
        console.log(persona)
        rl.close()
    })
})