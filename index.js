import readline from 'readline';

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});
let productos = [
    { Nombre: "Naranja", precioUnidad: 1000, cantidad: 10, categoria: "FRUTAS" },
    { Nombre: "Fresa", precioUnidad: 2000, cantidad: 5, categoria: "FRUTAS" },
    { Nombre: "Mango", precioUnidad: 3000, cantidad: 8, categoria: "FRUTAS" },
    { Nombre: "Manzana", precioUnidad: 1500, cantidad: 12, categoria: "FRUTAS" },
    { Nombre: "Banano", precioUnidad: 1200, cantidad: 15, categoria: "FRUTAS" },
    { Nombre: "Zanahoria", precioUnidad: 800, cantidad: 20, categoria: "VERDURAS" },
    { Nombre: "Tomate", precioUnidad: 1000, cantidad: 25, categoria: "VERDURAS" },
    { Nombre: "Papa", precioUnidad: 900, cantidad: 30, categoria: "VERDURAS" },
    { Nombre: "Lechuga", precioUnidad: 1200, cantidad: 10, categoria: "VERDURAS" },
    { Nombre: "Cebolla", precioUnidad: 1100, cantidad: 18, categoria: "VERDURAS" },
    { Nombre: "Leche", precioUnidad: 3500, cantidad: 20, categoria: "LACTEOS" },
    { Nombre: "Queso", precioUnidad: 8000, cantidad: 15, categoria: "LACTEOS" },
    { Nombre: "Yogur", precioUnidad: 4500, cantidad: 10, categoria: "LACTEOS" },
    { Nombre: "Mantequilla", precioUnidad: 6000, cantidad: 8, categoria: "LACTEOS" },
    { Nombre: "Crema de leche", precioUnidad: 5000, cantidad: 12, categoria: "LACTEOS" }
]

function mostrarProductosPorCategoria(categoria) {
    let productosCategoria = productos.filter(p => p.categoria === categoria)
    console.log(productosCategoria)
}

async function preguntar(mensaje) {
    return new Promise((resolve) => {
        rl.question(mensaje, (respuesta) => {
            resolve(respuesta)
        })
    })
}

async function menuPrincipal() {
    let salir = false
    while (!salir) {
        console.log("1️⃣ Comprar")
        console.log("2️⃣ Ver mi Carrito")
        console.log("3️⃣ Editar mi Carrito")
        console.log("4️⃣ Generar Factura")
        console.log("5️⃣ Finalizar compra")

        let opcion = await preguntar(`Elija una opción segun lo que desee realizar`)
        switch (opcion) {
            case "1":
                console.log("Opcion para comprar")
                break;
            case "2":
                console.log("Opción para ver el carrito")
                break;
            case "3":
                console.log("Opción para editar mi carrito")
                break;
            case "4":
                console.log("Opción para generar factura")
                break;
            case "5":
                console.log("Gracias por comprar con nosotros vuelva pronto")
                salir = true
                break;
            default:
                console.log("Eligio una opción erronea, por favor intentelo nuevamente")
                break;
        }
    }
    rl.close(); 
}
async function datos() {
    let persona = {
        nombre: "",
        edad: 0
    }
    persona.nombre = await preguntar("Bienvenid@, ¿Cómo te llamas?: ")
    persona.edad = parseInt(await preguntar(`¿Cuantos años tienes ${persona.nombre}?: `), 10)

    return persona;
}

async function main(params) {
    let info = await datos()

    console.log(`¡Hola! ${info.nombre} Es un gusto tenerte por acá 😊` )
    await menuPrincipal()
    rl.close();

}

async function comprar() {
    console.log("1️⃣ Frutas")
    console.log("2️⃣ Verduras")
    console.log("3️⃣ Lácteos")
    console.log("4️⃣ Volver al menu principal")
    let opcion = parseInt(await preguntar("Tenemos gran variedad de productos, elija el que desee agregar a su compra")
)
    switch (opcion) {
        case "1":
            console.log("Muestra Frutas")
            mostrarProductosPorCategoria(FRUTAS)

            let pregunta1 = await preguntar("¿Deseas comprar algunas de estas deliciosas frutas🍊? (Y/N)")
            if (pregunta1 == y || pregunta1 == Y) {
                let productoSeleccionado = await preguntar("Ingrese el nombre del producto que desea comprar")
                productoSeleccionado = productoSeleccionado.toUpperCase();
                for (let i = 0; i < productosCategoria.length; i++) {
                    
                }
            }else{
                comprar();
            }
            

            break;
        case "2":
            console.log("Muestra verduras")
            mostrarProductosPorCategoria(Verduras)
            break;
        case "3":
            console.log("Muestra lacteos")
            mostrarProductosPorCategoria(Lacteos)
            break;
        case "4":
            break;        
        default:
            console.log("Elijo una opción incorrecta ❎, Por favor, intentelo nuevamente")
            break;
    }
}
main()