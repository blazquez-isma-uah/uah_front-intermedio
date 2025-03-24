// Array para almacenar los productos añadidos al carrito
let cart = [];
// Variable global para almacenar los productos
// Se va a utilizar para actualizar el stock de los productos
let allProducts = [];

// Esperar a que el DOM esté listo
$(document).ready(function () {
    // Cargar productos desde localStorage
    loadAllProducts();

    // Evento para agregar productos al carrito
    $(document).on("click", ".add-to-cart", function () {
        const productId = $(this).data("id");
        addToCart(productId);
    });

    // Evento para eliminar productos del carrito
    $(document).on("click", ".remove-from-cart", function () {
        const productId = $(this).data("id");
        removeFromCart(productId);
    });

    // Evento para finalizar la compra
    $("#checkout-button").click(function () {
        checkoutCart();
    });
    updateCartUI(); // Inicializar la vista del carrito
});

// Función para cargar productos desde localStorage
function loadAllProducts() {
    allProducts = JSON.parse(localStorage.getItem("products")) || [];
}

// Función para agregar un producto al carrito
function addToCart(productId) {
    const product = allProducts.find(p => p.id === productId); // Buscar producto
    
    // Asegurar que el stock es un número y no un string
    product.stock = Number(product.stock);

    // Si no hay stock, mostrar un mensaje y salir de la función
    if (!product || product.stock <= 0) {
        alert("No hay más stock disponible");
        return;
    }

    // Si hay stock, lo agrega al carrito o incrementa su cantidad si ya está en el carrito
    const cartItem = cart.find(item => item.id === productId);
    if (cartItem) {
        cartItem.quantity++;
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            quantity: 1
        });
    }

    // Reducir stock del producto
    product.stock--; 
    // Actualizar el contenido del span del stock visualmente
    $(`#stock-${product.id}`).text(product.stock);

    if (product.stock === 0) {
        // Deshabilitar el botón y cambiar el texto a "Agotado"
        $(`[data-id="${product.id}"]`).prop("disabled", true).text("Agotado");
        // Hacer la imagen más transparente
        $(`[data-id="${product.id}"]`).closest(".card").find(".product-img").css("opacity", "0.5");
    }

    showNotification("Producto agregado a la cesta");
    updateCartUI(); // Actualizar interfaz del carrito
}

// Función para eliminar un producto del carrito
function removeFromCart(productId) {
    const cartItem = cart.find(item => item.id === productId);
    if (cartItem) {
        cartItem.quantity--;
        // Si la cantidad es 0 o menos, eliminar el producto del carrito
        if (cartItem.quantity <= 0) {
            cart = cart.filter(item => item.id !== productId);
        }
        // Devolver una unidad al stock original
        const product = allProducts.find(p => p.id === productId);
        if (product) {
            product.stock++;

            // Actualizar el contenido del span del stock visualmente
            $(`#stock-${product.id}`).text(product.stock);

            // Si el stock estaba agotado
            if (product.stock === 1) {
                // Habilitar el botón y cambiar el texto a "Agregar a la cesta"
                $(`[data-id="${product.id}"]`).prop("disabled", false).text("Agregar a la cesta");
                // Restarurar la imagen a su opacidad original
                $(`[data-id="${product.id}"]`).closest(".card").find(".product-img").css("opacity", "1");
            }
        }
    }    

    updateCartUI(); // Actualizar carrito
}

// Función para actualizar la interfaz del carrito
function updateCartUI() {
    const cartList = $("#cart-list");
    const cartTotal = $("#cart-total");

    // Limpiar el carrito antes de actualizarlo
    cartList.empty(); 

    let total = 0;
    // Recorrer los productos del carrito y mostrarlos en la lista con su cantidad y precio
    cart.forEach(item => {
        const product = allProducts.find(p => p.id === item.id);

        const totalItemPrice = item.price * item.quantity;
        total += totalItemPrice;
        
        // Crear elemento del carrito 
        const cartItem = $(`
            <li class="list-group-item d-flex align-items-center">
                <img src="${product.image}" class="cart-img me-2">
                <span><strong>${item.id}</strong> ${item.name} (x${item.quantity}) - $${totalItemPrice.toFixed(2)}</span>
                <button class="btn btn-danger btn-sm remove-from-cart ms-auto" data-id="${item.id}"><i class="bi bi-trash3"></i> Eliminar</button>
            </li>
        `);

        cartList.append(cartItem);
    });

    // Mostrar total de la compra
    cartTotal.text(total.toFixed(2)); 
}

// Función para finalizar la compra
function checkoutCart() {
    if (cart.length === 0) {
        alert("El carrito está vacío");
        return;
    }

    // Calcular el total de la compra
    const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
    alert(`Compra realizada. Total: $${total.toFixed(2)}`);

    // Limpiar el carrito y actualizar la interfaz
    cart = [];
    updateCartUI();
}

// Función para mostrar notificaciones al agregar productos al carrito
function showNotification(message) {
    const notification = $(`
        <div class="alert alert-success notification">
            ${message}
        </div>
    `);
    $("body").append(notification);
    notification.fadeIn(300).delay(1000).fadeOut(500, function() {
        $(this).remove();
    });
}