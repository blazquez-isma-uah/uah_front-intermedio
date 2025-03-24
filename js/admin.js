$(document).ready(function () {
    loadCategories(); // Cargar categorías al inicio

    // Manejo del acceso con contraseña
    $("#admin-login-btn").click(function () {
        const password = $("#admin-password").val();
        if (password === "123456") {
            $("#admin-login").hide();
            $("#admin-panel").show();
            $("#reset-data-btn").show();
            $("#extract-data-btn").show();
            loadCategories(); // Cargar categorías en el select
        } else {
            alert("Contraseña incorrecta");
        }
    });

    // Función para cargar categorías desde localStorage
    function loadCategories() {
        const savedCategories = JSON.parse(localStorage.getItem("categories")) || [];
        
        // Limpiar y llenar el select de categorías en el formulario
        const categorySelect = $("#product-category");
        categorySelect.empty();
        savedCategories.forEach(category => {
            categorySelect.append(`<option value="${category.id}">${category.name}</option>`);
        });
    }

    // Agregar nueva categoría y guardarla en localStorage
    $("#add-category-btn").click(function () {
        const categoryName = $("#new-category-name").val().trim();
        if (categoryName === "") {
            alert("El nombre de la categoría no puede estar vacío.");
            return;
        }

        const savedCategories = JSON.parse(localStorage.getItem("categories")) || [];
        
        // Comprobar que no haya otra categoría con el mismo nombre exacto
        if (savedCategories.some(category => category.name.toLowerCase() === categoryName.toLowerCase())) {
            alert("Ya existe una categoría con ese nombre.");
            return;
        }

        // Buscar el id más alto ya existente y sumarle uno
        const newCategoryId = savedCategories.length > 0 ? Math.max(...savedCategories.map(category => category.id)) + 1 : 1;
        savedCategories.push({ id: newCategoryId, name: categoryName });

        localStorage.setItem("categories", JSON.stringify(savedCategories));

        alert("Categoría agregada con éxito.");
        $("#new-category-name").val("");
        loadCategories();
    });

    // Función para cargar productos desde localStorage
    function loadProducts() {
        const savedProducts = localStorage.getItem("products");
        if (savedProducts) {
            products = JSON.parse(savedProducts);
        }
    }

    // Agregar nuevo producto y guardarlo en localStorage
    $("#add-product-btn").click(async function () {
        const productName = $("#new-product-name").val().trim();
        const productCode = parseInt($("#new-product-code").val().trim());
        const productDescription = $("#new-product-description").val().trim();
        const productPrice = parseFloat($("#new-product-price").val());
        const productStock = parseInt($("#new-product-stock").val());
        const categoryId = parseInt($("#product-category").val());
        const imageFile = $("#new-product-image")[0].files[0];

        if (!productName || !productCode || !productDescription || isNaN(productPrice) || isNaN(productStock) || !imageFile) {
            alert("Todos los campos son obligatorios");
            return;
        }

        // Verificar que el código del producto sea único
        const savedProducts = JSON.parse(localStorage.getItem("products")) || [];
        if (savedProducts.some(p => p.id === productCode)) {
            alert("El código del producto ya existe. Introduce uno diferente");
            return;
        }

        // Guardar solo el nombre del archivo en la propiedad "image"
        // La imagen tiene que ser guardada en la carpeta "img" del proyecto
        const imagePath = `img/${imageFile.name}`;

        savedProducts.push({
            id: productCode,
            name: productName,
            description: productDescription,
            price: productPrice,
            stock: productStock,
            categoryId: categoryId,
            image: imagePath
        });

        localStorage.setItem("products", JSON.stringify(savedProducts));

        alert("Producto agregado con éxito.");
        $("#new-product-name").val("");
        $("#new-product-code").val("");
        $("#new-product-description").val("");
        $("#new-product-price").val("");
        $("#new-product-stock").val("");
        $("#new-product-image").val("");

        // Actualizar productos guardados 
        loadProducts(); 
    });

    // Evento para eliminar todos los productos y categorías guardados
    // Y de esta manera poder empezar de nuevo con los datos iniciales del archivo data.js
    $("#reset-data-btn").click(function () {
        if (confirm("¿Seguro que quieres eliminar todos los productos y categorías guardados?")) {
            localStorage.removeItem("products");
            localStorage.removeItem("categories");
            alert("Datos eliminados. Recarga la página para ver los cambios.");
            location.reload();
        }
    });
    
    // Evento para extraer los datos de productos y categorías guardados en localStorage
    // y guardarlos en fichero data.js descargable
    $("#extract-data-btn").click(function () {
        const savedCategories = JSON.parse(localStorage.getItem("categories")) || [];
        const savedProducts = JSON.parse(localStorage.getItem("products")) || [];
    
        const data = {
            categories: savedCategories,
            products: savedProducts
        };
    
        const blob = new Blob([JSON.stringify(data, null, 4)], { type: "application/json" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "data.json";
        a.click();
    });
    

});
