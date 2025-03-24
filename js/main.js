// Esperar a que el DOM esté cargado antes de ejecutar la carga de productos
$(document).ready(async function () {
    // Si localStorage está vacío, guardar las categorías y productos de data.js
    if (!localStorage.getItem("categories") || !localStorage.getItem("products")) {
        try {
            // Carga el archivo files/data.json para guardar las categorías y productos en localStorage
            const response = await fetch("files/data.json");
            const data = await response.json();

            localStorage.setItem("categories", JSON.stringify(data.categories));
            localStorage.setItem("products", JSON.stringify(data.products));
            
            cargarProductos();
        } catch (error) {
            console.error("Error cargando data.json:", error);
        }
    } else {
        cargarProductos();
    }


    // Evento para mostrar/ocultar el carrito al hacer clic en el botón
    // y ajustar el ancho de la sección de productos
    $("#cart-button").click(function () {
        $("#cart-section").slideToggle(300, function () {
            if ($("#cart-section").is(":visible")) {
                $("#product-section").removeClass("col-md-12").addClass("col-md-7");
            } else {
                $("#product-section").removeClass("col-md-7").addClass("col-md-12");
            }
        });
    });
});

// Función para cargar productos en la tienda desde localStorage
function cargarProductos() {
    // Recuperar datos guardados en localStorage
    const loadedCategories = JSON.parse(localStorage.getItem("categories")) || [];
    const loadedProducts = JSON.parse(localStorage.getItem("products")) || [];

    // Asegurar que el stock es un número y no un string
    loadedProducts.forEach(p => {
        p.stock = Number(p.stock);
    });

    const productList = $("#product-list");
    productList.empty();

    // Por cada categoría, crear un título y un contenedor de productos
    loadedCategories.forEach(category => {
        const categoryHeader = $(`
            <h3 class="category-title" data-category="${category.id}">
                ${category.name}
            </h3>
        `);
        productList.append(categoryHeader);

        // Contenedor de productos de la categoría
        const categoryContainer = $(`<div class="row category-container" id="category-${category.id}"></div>`);
        productList.append(categoryContainer);

        // Por cada producto de la categoría, crear una tarjeta con su información
        loadedProducts.filter(p => p.categoryId === category.id).forEach(product => {
            const productCard = $(`
                <div class="col-md-4 product-card">
                    <div class="card">
                        <img src="${product.image}" class="card-img-top product-img" alt="${product.name}">
                        <div class="card-body">
                            <h5 class="card-title">${product.name}</h5>
                            <p class="text-muted">Código: <strong>${product.id}</strong></p>
                            <p class="card-text">${product.description}</p>
                            <p class="text-success"><strong>$${product.price.toFixed(2)}</strong></p>
                            <p class="text-muted">Stock: <span id="stock-${product.id}">${product.stock}</span></p>
                            <button class="btn btn-primary add-to-cart" data-id="${product.id}">Agregar a la cesta</button>
                        </div>
                    </div>
                </div>
            `);
            categoryContainer.append(productCard);
        });
    });


    // Evento para ocultar/mostrar productos de una categoría al hacer clic en el título
    $(".category-title").click(function () {
        const categoryId = $(this).data("category");
        $(`#category-${categoryId}`).slideToggle();
    });
}
