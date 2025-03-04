$(document).ready(function () {
    loadCategories(); // Cargar categorías al inicio

    // Manejo del acceso con contraseña
    $("#admin-login-btn").click(function () {
        const password = $("#admin-password").val();
        if (password === "123456") {
            $("#admin-login").hide();
            $("#admin-panel").show();
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
        const newCategoryId = categories.length + 1;
        savedCategories.push({ id: newCategoryId, name: categoryName });

        localStorage.setItem("categories", JSON.stringify(savedCategories)); // Guardar en localStorage

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
            alert("Todos los campos son obligatorios.");
            return;
        }

        // Verificar que el código del producto sea único
        const savedProducts = JSON.parse(localStorage.getItem("products")) || [];
        if (savedProducts.some(p => p.id === productCode)) {
            alert("El código del producto ya existe. Introduce uno diferente.");
            return;
        }

        // Crear un objeto URL para la imagen seleccionada
        // const imageURL = URL.createObjectURL(imageFile);

        // Convertir la imagen a Base64
        const imageBase64 = await getBase64(imageFile);

        savedProducts.push({
            id: productCode,
            name: productName,
            description: productDescription,
            price: productPrice,
            stock: productStock,
            categoryId: categoryId,
            image: imageBase64
        });

        localStorage.setItem("products", JSON.stringify(savedProducts)); // Guardar en localStorage

        alert("Producto agregado con éxito.");
        $("#new-product-name").val("");
        $("#new-product-code").val("");
        $("#new-product-description").val("");
        $("#new-product-price").val("");
        $("#new-product-stock").val("");
        $("#new-product-image").val("");

        loadProducts(); // Actualizar productos guardados
    });

    // Función para convertir la imagen a Base64
    function getBase64(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = error => reject(error);
        });
    }

});
