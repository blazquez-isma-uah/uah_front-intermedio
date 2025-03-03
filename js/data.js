// Datos precargados de categorías
const categories = [
    { id: 1, name: "Electrónica" },
    { id: 2, name: "Ropa" },
    { id: 3, name: "Hogar" }
];

// Datos precargados de productos
const products = [
    // Electrónica
    {
        id: 101,
        name: "Auriculares Inalámbricos",
        description: "Auriculares con cancelación de ruido y sonido envolvente.",
        price: 49.99,
        stock: 10,
        categoryId: 1,
        image: "img/auriculares.jpg"
    },
    {
        id: 102,
        name: "Smartphone 5G",
        description: "Última generación con cámara de 108MP y batería de larga duración.",
        price: 799.99,
        stock: 5,
        categoryId: 1,
        image: "img/smartphone.jpg"
    },
    {
        id: 103,
        name: "Laptop Gaming",
        description: "Potente portátil con gráfica RTX y pantalla de 144Hz.",
        price: 1299.99,
        stock: 3,
        categoryId: 1,
        image: "img/laptop.jpg"
    },
    {
        id: 104,
        name: "Tablet Apple",
        description: "Tablet Apple con pantalla retina y 128GB de almacenamiento.",
        price: 599.99,
        stock: 7,
        categoryId: 1,
        image: "img/tablet.jpg"
    },
    {
        id: 105,
        name: "Cámara Deportiva 4K",
        description: "Cámara de acción con estabilización y grabación en 4K UHD.",
        price: 199.99,
        stock: 6,
        categoryId: 1,
        image: "img/camara.jpg"
    },
    {
        id: 106,
        name: "Smartwatch Avanzado",
        description: "Reloj inteligente con monitoreo de salud y GPS.",
        price: 249.99,
        stock: 8,
        categoryId: 1,
        image: "img/smartwatch.jpg"
    },


    // Ropa
    {
        id: 201,
        name: "Camiseta Deportiva",
        description: "Camiseta transpirable y ligera para entrenamientos intensivos.",
        price: 19.99,
        stock: 15,
        categoryId: 2,
        image: "img/camiseta.jpg"
    },


    // Hogar
    {
        id: 301,
        name: "Lámpara LED",
        description: "Lámpara de escritorio con luz ajustable y carga USB.",
        price: 29.99,
        stock: 8,
        categoryId: 3,
        image: "img/lampara.jpg"
    }
];
