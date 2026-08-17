console.log("Checkout JavaScript is connected!");


// =========================================
// GET ELEMENTS
// =========================================

const checkoutItems =
    document.getElementById("checkoutItems");

const checkoutTotal =
    document.getElementById("checkoutTotal");

const checkoutForm =
    document.getElementById("checkoutForm");

const checkoutMessage =
    document.getElementById("checkoutMessage");


// =========================================
// CHECK CHECKOUT TYPE
// =========================================

const urlParams =
    new URLSearchParams(
        window.location.search
    );

const isBuyNow =
    urlParams.get("buyNow") === "true";


// =========================================
// GET PRODUCTS
// =========================================

let checkoutProducts = [];


// Buy Now

if (isBuyNow) {

    const buyNowItem =
        JSON.parse(
            localStorage.getItem("buyNowItem")
        );

    if (buyNowItem) {

        checkoutProducts = [
            buyNowItem
        ];

    }

}


// Normal Cart Checkout

else {

    checkoutProducts =
        JSON.parse(
            localStorage.getItem("cart")
        ) || [];

}


// =========================================
// DISPLAY CHECKOUT ITEMS
// =========================================

function displayCheckoutItems() {

    if (
        checkoutProducts.length === 0
    ) {

        checkoutItems.innerHTML = `
            <p>
                Your cart is empty.
            </p>
        `;

        checkoutTotal.textContent =
            "₹0";

        return;
    }


    checkoutItems.innerHTML = "";

    let total = 0;


    checkoutProducts.forEach(
        function (item) {

            const quantity =
                item.quantity || 1;

            const price =
                Number(item.price);

            const subtotal =
                price * quantity;


            total += subtotal;


            const itemElement =
                document.createElement(
                    "div"
                );


            itemElement.className =
                "checkout-item";


            itemElement.innerHTML = `

                <div>

                    <h3>
                        ${item.name}
                    </h3>

                    <p>
                        ₹${price} × ${quantity}
                    </p>

                </div>

                <strong>
                    ₹${subtotal}
                </strong>

            `;


            checkoutItems.appendChild(
                itemElement
            );

        }
    );


    checkoutTotal.textContent =
        `₹${total}`;

}


// =========================================
// PLACE ORDER
// =========================================

checkoutForm.addEventListener(
    "submit",
    function (event) {

        event.preventDefault();


        if (
            checkoutProducts.length === 0
        ) {

            checkoutMessage.textContent =
                "Your cart is empty.";

            return;
        }


        const name =
            document.getElementById(
                "name"
            ).value;

        const email =
            document.getElementById(
                "email"
            ).value;

        const phone =
            document.getElementById(
                "phone"
            ).value;

        const address =
            document.getElementById(
                "address"
            ).value;

        const city =
            document.getElementById(
                "city"
            ).value;

        const pincode =
            document.getElementById(
                "pincode"
            ).value;


        // =========================================
        // CREATE ORDER
        // =========================================

        const order = {

            orderId:
                "ORD-" +
                Date.now(),

            customer: {

                name: name,

                email: email,

                phone: phone,

                address: address,

                city: city,

                pincode: pincode

            },

            items:
                checkoutProducts,

            createdAt:
                new Date().toISOString()

        };


        // =========================================
        // GET EXISTING ORDERS
        // =========================================

        let orders =
            JSON.parse(
                localStorage.getItem("orders")
            ) || [];


        // =========================================
        // ADD NEW ORDER
        // =========================================

        orders.push(order);


        // =========================================
        // SAVE ALL ORDERS
        // =========================================

        localStorage.setItem(
            "orders",
            JSON.stringify(orders)
        );


        // =========================================
        // CLEAR DATA
        // =========================================

        if (isBuyNow) {

            localStorage.removeItem(
                "buyNowItem"
            );

        } else {

            localStorage.removeItem(
                "cart"
            );

        }


        // =========================================
        // SUCCESS MESSAGE
        // =========================================

        checkoutMessage.textContent =
            "Order placed successfully!";


        checkoutMessage.style.color =
            "#68704a";


        // =========================================
        // REDIRECT
        // =========================================

        setTimeout(
            function () {

                window.location.href =
                    "orders.html";

            },
            1500
        );

    }
);


// =========================================
// LOAD CHECKOUT
// =========================================

displayCheckoutItems();