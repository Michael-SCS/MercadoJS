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

async function main() {
    let info = await datos()

    console.log(`¡Hola! ${info.nombre} Es un gusto tenerte por acá 😊` )
    await menuPrincipal()
    rl.close();

}

let carrito = []



async function comprarProducto(categoriaSeleccionada) {
    console.log(`📦 Productos en la categoría: ${categoriaSeleccionada}`);
    let productosCategoria = productos.filter(p => p.categoria === categoriaSeleccionada);

    productosCategoria.forEach((producto, index) => {
        console.log(`${index + 1}. ${producto.Nombre} - Precio: ${producto.precioUnidad} - Stock: ${producto.cantidad}`);
    });

    let deseaComprar = await preguntar("¿Desea comprar algún producto? (Si/No): ");
    
    if (deseaComprar.toUpperCase() !== "SI") {
        console.log("Volviendo al menú de compras...");
        return;
    }
    // Preguntar qué producto desea comprar
    let nombreProducto = await preguntar("Ingrese el nombre del producto que desea comprar: ");
    
    let productoSeleccionado = productosCategoria.find(p => p.Nombre.toUpperCase() === nombreProducto.toUpperCase());

    if (!productoSeleccionado) {
        console.log("❌ Producto no encontrado. Inténtelo de nuevo.");
        return comprarProducto(categoriaSeleccionada); // Volver a preguntar
    }

    let cantidadComprar = parseInt(await preguntar(`¿Cuántas unidades de ${productoSeleccionado.Nombre} desea comprar?: `), 10);

    if (isNaN(cantidadComprar) || cantidadComprar <= 0) {
        console.log("❌ Cantidad inválida. Inténtelo de nuevo.");
        return comprarProducto(categoriaSeleccionada);
    }
    // Validar si hay suficiente stock
    if (cantidadComprar > productoSeleccionado.cantidad) {
        console.log(`❌ No hay suficiente stock. Solo quedan ${productoSeleccionado.cantidad} unidades.`);
        return comprarProducto(categoriaSeleccionada);
    }
    //Validar si el producto ya se encuentra en el carrito
    let productoEnCarrito = carrito.find(p => p.Nombre === productoSeleccionado.Nombre)
    if (productoEnCarrito) {
        // Si el producto ya está en el carrito, aumentamos la cantidad
        productoEnCarrito.cantidad += cantidadComprar;
    } else {
        // Si el producto no está en el carrito, lo agregamos
        carrito.push({
            Nombre: productoSeleccionado.Nombre,
            precioUnidad: productoSeleccionado.precioUnidad,
            cantidad: cantidadComprar
        });
    }
    // Actualizar stock del producto
    productoSeleccionado.cantidad -= cantidadComprar;

    console.log(`✅ Se añadieron ${cantidadComprar} unidades de ${productoSeleccionado.Nombre} al carrito.`);
}
main()