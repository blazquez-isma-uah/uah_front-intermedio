// Esperar a que el DOM esté cargado antes de ejecutar la carga de productos
$(document).ready(function () {
    cargarProductos();

    // Evento para mostrar/ocultar el carrito al hacer clic en el botón
    $("#cart-button").click(function () {
        $("#cart-section").slideToggle();

        // //Si el carrito esta oculto, mostrar 4 productos por fila
        // if ($("#cart-section").is(":hidden")) {
        //     $(".cart-item").removeClass("col-md-3").addClass("col-md-4");
        // } else {
        //     $(".cart-item").removeClass("col-md-4").addClass("col-md-3");
        // }
    });
});

// Función para cargar productos en la tienda
function cargarProductos() {
    const productList = $("#product-list"); // Contenedor de productos
    productList.empty(); // Limpia el contenido antes de cargar nuevos datos

    // Recorrer las categorías y productos para agruparlos
    categories.forEach(category => {
        // Título con el nombre de la categoría
        const categoryHeader = $(`
            <h3 class="category-title" data-category="${category.id}">
                ${category.name} 
            </h3>
        `);
        productList.append(categoryHeader);

        // Contenedor de los productos de esta categoría
        const categoryDiv = $(`<div class="row category-container" id="category-${category.id}"></div>`);
        productList.append(categoryDiv);

        // Filtrar los productos por categoría y los agregar al contenedor correspondiente usando un card de Bootstrap
        products.filter(p => p.categoryId === category.id).forEach(product => {
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
            categoryDiv.append(productCard);
        });
    });

    // Evento para ocultar/mostrar productos de una categoría al hacer clic en el título
    $(".category-title").click(function () {
        const categoryId = $(this).data("category");
        $(`#category-${categoryId}`).slideToggle();
    });
}
