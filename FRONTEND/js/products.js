console.log("Products JavaScript is connected!");


const productsContainer =
    document.getElementById("productsContainer");

const searchInput =
    document.getElementById("searchInput");

const searchButton =
    document.getElementById("searchButton");

const sortButton =
    document.getElementById("sortButton");


let currentProducts = [];


function displayProducts(products) {

    if (!productsContainer) {
        return;
    }

    productsContainer.innerHTML = "";


    if (products.length === 0) {

        productsContainer.innerHTML = `
            <p class="no-products">
                No products found.
            </p>
        `;

        return;
    }


    products.forEach(function (product) {

        const productCard =
            document.createElement("div");

        productCard.className =
            "product-card";


        productCard.innerHTML = `

            <div class="product-card-image">
                Product Image
            </div>

            <div class="product-card-content">

                <p class="product-category">
                    ${product.category}
                </p>

                <h2>
                    ${product.name}
                </h2>

                <p>
                    Price: ₹${product.price}
                </p>

                <p>
                    Stock: ${product.stock}
                </p>

                <a
                    href="product.html?id=${product.id}"
                    class="view-product-button"
                >
                    View Product
                </a>

            </div>

        `;


        productsContainer.appendChild(
            productCard
        );

    });

}


function loadProducts() {

    fetch(
        "http://127.0.0.1:8000/products"
    )

        .then(function (response) {

            return response.json();

        })

        .then(function (products) {

            currentProducts = products;

            displayProducts(products);

        })

        .catch(function (error) {

            console.error(
                "Error loading products:",
                error
            );

        });

}


function searchProducts() {

    const keyword =
        searchInput.value.trim();


    if (keyword === "") {

        loadProducts();

        return;
    }


    fetch(
        `http://127.0.0.1:8000/products/search?keyword=${encodeURIComponent(keyword)}`
    )

        .then(function (response) {

            return response.json();

        })

        .then(function (products) {

            currentProducts = products;

            displayProducts(products);

        })

        .catch(function (error) {

            console.error(
                "Error searching products:",
                error
            );

        });

}


function sortProducts() {

    fetch(
        "http://127.0.0.1:8000/products/sort?order=asc"
    )

        .then(function (response) {

            return response.json();

        })

        .then(function (products) {

            currentProducts = products;

            displayProducts(products);

        })

        .catch(function (error) {

            console.error(
                "Error sorting products:",
                error
            );

        });

}


if (searchButton) {

    searchButton.addEventListener(
        "click",
        searchProducts
    );

}


if (sortButton) {

    sortButton.addEventListener(
        "click",
        sortProducts
    );

}


loadProducts();