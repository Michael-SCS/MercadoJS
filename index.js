import readline from 'readline';

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

function preguntar(mensaje) {
    return new Promise((resolve) => {
        rl.question(mensaje, (respuesta) => {
            resolve(respuesta);
        });
    });
}

let productos = [
    { Nombre: "Naranja", precioUnidad: 1000, cantidad: 10, categoria: "Frutas" },
    { Nombre: "Fresa", precioUnidad: 2000, cantidad: 5, categoria: "Frutas" },
    { Nombre: "Mango", precioUnidad: 3000, cantidad: 8, categoria: "Frutas" },
    { Nombre: "Manzana", precioUnidad: 1500, cantidad: 12, categoria: "Frutas" },
    { Nombre: "Banano", precioUnidad: 1200, cantidad: 15, categoria: "Frutas" },
    { Nombre: "Zanahoria", precioUnidad: 800, cantidad: 20, categoria: "Verduras" },
    { Nombre: "Tomate", precioUnidad: 1000, cantidad: 25, categoria: "Verduras" },
    { Nombre: "Papa", precioUnidad: 900, cantidad: 30, categoria: "Verduras" },
    { Nombre: "Lechuga", precioUnidad: 1200, cantidad: 10, categoria: "Verduras" },
    { Nombre: "Cebolla", precioUnidad: 1100, cantidad: 18, categoria: "Verduras" },
    { Nombre: "Leche", precioUnidad: 3500, cantidad: 20, categoria: "Lacteos" },
    { Nombre: "Queso", precioUnidad: 8000, cantidad: 15, categoria: "Lacteos" },
    { Nombre: "Yogur", precioUnidad: 4500, cantidad: 10, categoria: "Lacteos" },
    { Nombre: "Mantequilla", precioUnidad: 6000, cantidad: 8, categoria: "Lacteos" },
    { Nombre: "Crema de leche", precioUnidad: 5000, cantidad: 12, categoria: "Lacteos" }
];

let carrito = [];

async function datos() {
    let persona = {
        nombre: "",
        edad: 0
    };

    // 🔹 Validación del nombre (solo letras y espacios)
    while (true) {
        persona.nombre = await preguntar("¿Cuál es tu nombre? ");
        if (persona.nombre.match(/^[a-zA-Z\s]+$/)) break;
        console.log("❌ Nombre inválido. Solo se permiten letras y espacios.");
    }

    // 🔹 Validación de la edad (solo números mayores a 0)
    while (true) {
        let entrada = await preguntar(`¿Cuántos años tienes, ${persona.nombre}? `);
        persona.edad = parseInt(entrada, 10);
        if (!isNaN(persona.edad) && persona.edad > 0) break;
        console.log("❌ Edad inválida. Ingresa un número mayor a 0.");
    }

    return persona;
}


async function menuPrincipal(persona) {
    console.log(`\n🛒 Bienvenido ${persona.nombre} a Minimercados Evolver Express`);

    let salir = false;
    while (!salir) {
        console.log("\n📄 Menú:");
        console.log("1️⃣ Ver productos");
        console.log("2️⃣ Comprar productos");
        console.log("3️⃣ Ver carrito");
        console.log("4️⃣ Eliminar producto del carrito");
        console.log("5️⃣ Finalizar compra");
        console.log("6️⃣ Salir");

        let opcion = await preguntar("Seleccione una opción: ");

        switch (opcion) {
            case "1":
                await verProductos();
                break;
            case "2":
                await comprarProducto();
                break;
            case "3":
                await verCarrito(persona);
                break;
            case "4":
                await eliminarProductoCarrito();
                break;
            case "5":
                await finalizarCompra(persona);
                break;
            case "6":
                console.log("👋 ¡Gracias por usar Minimercados Evolver Express!");
                salir = true;
                break;
            default:
                console.log("❌ Opción inválida. Intente de nuevo.");
        }
    }

    rl.close();
}

async function verProductos() {
    console.log("\n📦 Categorías disponibles:");
    let categorias = [...new Set(productos.map(p => p.categoria))];
    categorias.forEach((categoria, index) => console.log(`${index + 1}. ${categoria}`));

    let seleccion = await preguntar("Seleccione una categoría: ");
    let categoriaSeleccionada = categorias[parseInt(seleccion) - 1];

    if (!categoriaSeleccionada) {
        console.log("❌ Opción inválida.");
        return;
    }

    console.log(`\n📜 Productos en la categoría: ${categoriaSeleccionada}`);
    let productosCategoria = productos.filter(p => p.categoria === categoriaSeleccionada);
    productosCategoria.forEach((p, index) => {
        console.log(`${index + 1}. ${p.Nombre} - Precio: ${p.precioUnidad} - Stock: ${p.cantidad}`);
    });
}

async function comprarProducto() {
    await verProductos();

    let productoSeleccionado;
    while (true) {
        let nombreProducto = await preguntar("Ingrese el nombre del producto que desea comprar: ");
        productoSeleccionado = productos.find(p => p.Nombre.toLowerCase() === nombreProducto.toLowerCase());

        if (!productoSeleccionado) {
            console.log("❌ Producto no encontrado. Intente de nuevo.");
            continue; // Vuelve a preguntar si el producto no existe
        }

        if (productoSeleccionado.cantidad === 0) {
            console.log(`❌ El producto "${productoSeleccionado.Nombre}" está agotado y no se puede comprar.`);
            return; // Sale de la función sin permitir la compra
        }

        break; // Sale del bucle cuando el producto es válido y tiene stock
    }

    let cantidadComprar;
    while (true) {
        cantidadComprar = parseInt(await preguntar(`¿Cuántas unidades de ${productoSeleccionado.Nombre} desea comprar?: `));

        if (!isNaN(cantidadComprar) && cantidadComprar > 0 && cantidadComprar <= productoSeleccionado.cantidad) {
            break; // Salimos del bucle si la cantidad es válida
        }
        console.log("❌ Cantidad inválida. Intente de nuevo.");
    }

    let productoEnCarrito = carrito.find(p => p.Nombre === productoSeleccionado.Nombre);
    if (productoEnCarrito) {
        productoEnCarrito.cantidad += cantidadComprar;
    } else {
        carrito.push({
            Nombre: productoSeleccionado.Nombre,
            precioUnidad: productoSeleccionado.precioUnidad,
            cantidad: cantidadComprar
        });
    }

    productoSeleccionado.cantidad -= cantidadComprar;
    console.log(`✅ Se agregaron ${cantidadComprar} unidades de ${productoSeleccionado.Nombre} al carrito.`);
}



async function verCarrito(persona) {
    if (carrito.length === 0) {
        console.log("🛒 El carrito está vacío.");
        return;
    }

    console.log("\n🛒 Productos en el carrito:");
    carrito.forEach((p, index) => {
        console.log(`${index + 1}. ${p.Nombre} - Precio: ${p.precioUnidad} - Cantidad: ${p.cantidad}`);
    });

    let totalAPagar = carrito.reduce((total, p) => total + p.precioUnidad * p.cantidad, 0);
    let descuento = persona.edad < 18 ? totalAPagar * 0.10 : persona.edad > 60 ? totalAPagar * 0.20 : 0;
    let totalConDescuento = totalAPagar - descuento;

    console.log(`💰 Total: ${totalAPagar}`);
    if (descuento > 0) console.log(`🎉 Descuento aplicado: -${descuento}\n💸 Total final: ${totalConDescuento}`);
}

async function eliminarProductoCarrito() {
    if (carrito.length === 0) {
        console.log("🛒 El carrito está vacío.");
        return;
    }

    console.log("\n🛒 Productos en el carrito:");
    carrito.forEach((producto, index) => {
        console.log(`${index + 1}. ${producto.Nombre} - Precio: ${producto.precioUnidad} - Cantidad: ${producto.cantidad}`);
    });

    let productoEliminar = await preguntar("Ingrese el número del producto que desea eliminar: ");
    let indiceEliminar = parseInt(productoEliminar) - 1;

    if (isNaN(indiceEliminar) || indiceEliminar < 0 || indiceEliminar >= carrito.length) {
        console.log("❌ Opción inválida.");
        return;
    }

    let productoSeleccionado = carrito[indiceEliminar];

    let cantidadEliminar = await preguntar(`¿Cuántas unidades de ${productoSeleccionado.Nombre} desea eliminar? `);
    cantidadEliminar = parseInt(cantidadEliminar);

    if (isNaN(cantidadEliminar) || cantidadEliminar <= 0 || cantidadEliminar > productoSeleccionado.cantidad) {
        console.log("❌ Cantidad inválida.");
        return;
    }

    // Devolver stock al inventario original
    let productoInventario = productos.find(p => p.Nombre === productoSeleccionado.Nombre);
    if (productoInventario) {
        productoInventario.cantidad += cantidadEliminar;
    }

    // Si eliminamos todas las unidades, quitamos el producto del carrito
    if (productoSeleccionado.cantidad === cantidadEliminar) {
        carrito.splice(indiceEliminar, 1);
        console.log(`✅ Se eliminó ${productoSeleccionado.Nombre} del carrito y se devolvió el stock.`);
    } else {
        // Si solo eliminamos una parte, reducimos la cantidad en el carrito
        productoSeleccionado.cantidad -= cantidadEliminar;
        console.log(`✅ Se eliminaron ${cantidadEliminar} unidades de ${productoSeleccionado.Nombre}.`);
    }
}


async function finalizarCompra(persona) {
    await verCarrito(persona);
    if (carrito.length === 0) return console.log("❌ No puede finalizar la compra sin productos.");
    console.log("🎉 Compra realizada con éxito.");
    carrito = [];
}

async function main() {
    let persona = await datos();
    await menuPrincipal(persona);
}

main();
