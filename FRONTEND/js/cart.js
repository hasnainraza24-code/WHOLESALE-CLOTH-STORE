console.log("Cart JavaScript is connected!");


const cartContainer =
    document.getElementById("cartContainer");

const totalItemsElement =
    document.getElementById("totalItems");

const totalPriceElement =
    document.getElementById("totalPrice");

const checkoutButton =
    document.getElementById("checkoutButton");


// Get cart from localStorage

function getCart() {

    const cart =
        localStorage.getItem("cart");

    if (!cart) {
        return [];
    }

    return JSON.parse(cart);
}


// Save cart

function saveCart(cart) {

    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );

}


// Display cart

function displayCart() {

    const cart = getCart();


    cartContainer.innerHTML = "";


    if (cart.length === 0) {

        cartContainer.innerHTML = `
            <p class="empty-cart">
                Your cart is empty.
            </p>
        `;

        totalItemsElement.textContent = "0";
        totalPriceElement.textContent = "0";

        return;
    }


    let totalItems = 0;
    let totalPrice = 0;


    cart.forEach(function (item, index) {

        const quantity =
            item.quantity;

        const itemTotal =
            item.price * quantity;


        totalItems += quantity;

        totalPrice += itemTotal;


        const cartItem =
            document.createElement("div");

        cartItem.className =
            "cart-item";


        cartItem.innerHTML = `

            <div class="cart-item-info">

                <h3>
                    ${item.name}
                </h3>

                <p>
                    Category: ${item.category}
                </p>

                <p>
                    Price: ₹${item.price}
                </p>

            </div>


            <div class="cart-item-quantity">

                <label>
                    Quantity:
                </label>

                <input
                    type="number"
                    min="1"
                    max="${item.stock}"
                    value="${quantity}"
                    data-index="${index}"
                    class="cart-quantity"
                >

            </div>


            <div class="cart-item-total">

                <p>
                    ₹${itemTotal}
                </p>

                <button
                    class="remove-cart-item"
                    data-index="${index}"
                >
                    Remove
                </button>

            </div>

        `;


        cartContainer.appendChild(cartItem);

    });


    totalItemsElement.textContent =
        totalItems;

    totalPriceElement.textContent =
        totalPrice;


    addCartEventListeners();

}


// Quantity + Remove buttons

function addCartEventListeners() {


    const quantityInputs =
        document.querySelectorAll(
            ".cart-quantity"
        );


    quantityInputs.forEach(function (input) {

        input.addEventListener(
            "change",
            function () {

                const index =
                    Number(input.dataset.index);

                const newQuantity =
                    Number(input.value);


                const cart =
                    getCart();


                if (newQuantity < 1) {

                    input.value = 1;

                    return;
                }


                if (
                    newQuantity >
                    cart[index].stock
                ) {

                    input.value =
                        cart[index].stock;

                    cart[index].quantity =
                        cart[index].stock;

                } else {

                    cart[index].quantity =
                        newQuantity;

                }


                saveCart(cart);

                displayCart();

            }
        );

    });


    const removeButtons =
        document.querySelectorAll(
            ".remove-cart-item"
        );


    removeButtons.forEach(function (button) {

        button.addEventListener(
            "click",
            function () {

                const index =
                    Number(button.dataset.index);


                const cart =
                    getCart();


                cart.splice(index, 1);


                saveCart(cart);

                displayCart();

            }
        );

    });

}


// Checkout button

checkoutButton.addEventListener(
    "click",
    function () {

        const cart =
            getCart();


        if (cart.length === 0) {

            alert(
                "Your cart is empty."
            );

            return;
        }


        checkoutButton.addEventListener(
            "click",
            function () {

                window.location.href =
                    "checkout.html";

            }
        );

    }
);


// Load cart

displayCart();