console.log("Product JavaScript is connected!");


const productDetails =
    document.getElementById("productDetails");


const urlParams =
    new URLSearchParams(window.location.search);


const productId =
    urlParams.get("id");


function loadProduct() {

    if (!productId) {

        productDetails.innerHTML = `
            <p>Product ID not found.</p>
        `;

        return;
    }


    fetch(
    `https://wholesale-cloth-store.onrender.com/products/${productId}`
    )

        .then(function (response) {

            return response.json();

        })

        .then(function (product) {

            if (product.message) {

                productDetails.innerHTML = `
                    <p>${product.message}</p>
                `;

                return;
            }


            productDetails.innerHTML = `

                <div class="product-image">

                    <div class="image-placeholder">
                        Product Image
                    </div>

                </div>


                <div class="product-info">

                    <p class="product-category">
                        ${product.category}
                    </p>

                    <h2>
                        ${product.name}
                    </h2>

                    <p class="product-price">
                        ₹${product.price}
                    </p>

                    <p class="product-stock">
                        Available Stock:
                        ${product.stock} pieces
                    </p>


                    <div class="quantity-container">

                        <label for="quantity">
                            Quantity:
                        </label>

                        <input
                            type="number"
                            id="quantity"
                            value="1"
                            min="1"
                            max="${product.stock}"
                        >

                    </div>


                    <div class="product-action-buttons">

                        <button
                            class="add-to-cart-button"
                            id="addToCartButton"
                        >
                            Add to Cart
                        </button>


                        <button
                            class="buy-now-button"
                            id="buyNowButton"
                        >
                            Buy Now
                        </button>

                    </div>

                </div>

            `;


            // =========================================
            // ADD TO CART
            // =========================================

            const addToCartButton =
                document.getElementById(
                    "addToCartButton"
                );


            addToCartButton.addEventListener(
                "click",
                function () {

                    const quantityInput =
                        document.getElementById(
                            "quantity"
                        );


                    const quantity =
                        Number(
                            quantityInput.value
                        );


                    if (
                        quantity < 1 ||
                        quantity > product.stock
                    ) {

                        alert(
                            "Please enter a valid quantity."
                        );

                        return;
                    }


                    // Get existing cart

                    const existingCart =
                        localStorage.getItem(
                            "cart"
                        );


                    let cart = [];


                    if (existingCart) {

                        cart =
                            JSON.parse(
                                existingCart
                            );

                    }


                    // Check if product already exists

                    const existingProduct =
                        cart.find(function (item) {

                            return (
                                item.id ===
                                product.id
                            );

                        });


                    if (existingProduct) {

                        const newQuantity =
                            existingProduct.quantity +
                            quantity;


                        if (
                            newQuantity >
                            product.stock
                        ) {

                            alert(
                                "You cannot add more than available stock."
                            );

                            return;
                        }


                        existingProduct.quantity =
                            newQuantity;

                    } else {

                        cart.push({

                            id: product.id,

                            name: product.name,

                            category:
                                product.category,

                            price: product.price,

                            stock: product.stock,

                            quantity: quantity

                        });

                    }


                    // Save cart

                    localStorage.setItem(
                        "cart",
                        JSON.stringify(cart)
                    );


                    alert(
                        `${product.name} added to cart!`
                    );

                }
            );


            // =========================================
            // BUY NOW
            // =========================================

            const buyNowButton =
                document.getElementById(
                    "buyNowButton"
                );


            buyNowButton.addEventListener(
                "click",
                function () {

                    const quantityInput =
                        document.getElementById(
                            "quantity"
                        );


                    const quantity =
                        Number(
                            quantityInput.value
                        );


                    if (
                        quantity < 1 ||
                        quantity > product.stock
                    ) {

                        alert(
                            "Please enter a valid quantity."
                        );

                        return;
                    }


                    // Create Buy Now item

                    const buyNowItem = {

                        id: product.id,

                        name: product.name,

                        category:
                            product.category,

                        price: product.price,

                        stock: product.stock,

                        quantity: quantity

                    };


                    // Save temporary Buy Now item

                    localStorage.setItem(
                        "buyNowItem",
                        JSON.stringify(
                            buyNowItem
                        )
                    );


                    // Go directly to checkout

                    window.location.href =
                        "checkout.html?buyNow=true";

                }
            );

        })

        .catch(function (error) {

            console.error(
                "Error loading product:",
                error
            );


            productDetails.innerHTML = `
                <p>
                    Unable to load product.
                </p>
            `;

        });

}


loadProduct();
