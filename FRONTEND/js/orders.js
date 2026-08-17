console.log("Orders JavaScript is connected!");


const ordersContainer =
    document.getElementById("ordersContainer");


// =========================================
// LOAD ALL ORDERS
// =========================================

function loadOrders() {

    const orders =
        JSON.parse(
            localStorage.getItem("orders")
        ) || [];


    // =========================================
    // NO ORDERS
    // =========================================

    if (orders.length === 0) {

        ordersContainer.innerHTML = `

            <div class="no-orders">

                <h2>
                    No Orders Yet
                </h2>

                <p>
                    You haven't placed any orders yet.
                </p>

                <a
                    href="products.html"
                    class="view-products-button"
                >
                    Browse Products
                </a>

            </div>

        `;

        return;
    }


    // Clear container

    ordersContainer.innerHTML = "";


    // =========================================
    // DISPLAY ORDERS
    // =========================================

    orders
        .slice()
        .reverse()
        .forEach(
            function (order) {


                let itemsHTML = "";


                let total = 0;


                // =========================================
                // ORDER ITEMS
                // =========================================

                order.items.forEach(
                    function (item) {

                        const quantity =
                            item.quantity || 1;


                        const price =
                            Number(item.price);


                        const subtotal =
                            price * quantity;


                        total += subtotal;


                        itemsHTML += `

                            <div class="order-item">

                                <div>

                                    <h3>
                                        ${item.name}
                                    </h3>

                                    <p>
                                        ₹${price}
                                        ×
                                        ${quantity}
                                    </p>

                                </div>


                                <strong>
                                    ₹${subtotal}
                                </strong>

                            </div>

                        `;

                    }
                );


                // =========================================
                // ORDER DATE
                // =========================================

                const orderDate =
                    new Date(
                        order.createdAt
                    );


                // =========================================
                // CREATE ORDER CARD
                // =========================================

                const orderCard =
                    document.createElement(
                        "div"
                    );


                orderCard.className =
                    "order-card";


                orderCard.innerHTML = `

                    <div class="order-header">

                        <div>

                            <p class="order-label">
                                Order ID
                            </p>

                            <h2>
                                ${order.orderId}
                            </h2>

                        </div>


                        <span class="order-status">
                            Processing
                        </span>

                    </div>


                    <div class="order-date">

                        Ordered on:
                        ${orderDate.toLocaleDateString()}

                    </div>


                    <div class="order-items">

                        ${itemsHTML}

                    </div>


                    <div class="order-total">

                        <span>
                            Total Amount
                        </span>

                        <strong>
                            ₹${total}
                        </strong>

                    </div>


                    <div class="delivery-info">

                        <h3>
                            Delivery Details
                        </h3>

                        <p>
                            <strong>
                                Name:
                            </strong>

                            ${order.customer.name}

                        </p>


                        <p>
                            <strong>
                                Phone:
                            </strong>

                            ${order.customer.phone}

                        </p>


                        <p>
                            <strong>
                                Address:
                            </strong>

                            ${order.customer.address},
                            ${order.customer.city}
                            -
                            ${order.customer.pincode}

                        </p>

                    </div>

                    <a
                        href="order-details.html?id=${order.orderId}"
                        class="view-order-button">
                        View Details
                    </a>

                `;


                ordersContainer.appendChild(
                    orderCard
                );

            }
        );

}


// =========================================
// LOAD ORDERS
// =========================================

loadOrders();