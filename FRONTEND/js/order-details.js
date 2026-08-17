console.log("Order Details JavaScript is connected!");


// =========================================
// GET ELEMENT
// =========================================

const orderDetailsContainer =
    document.getElementById(
        "orderDetailsContainer"
    );


// =========================================
// GET ORDER ID FROM URL
// =========================================

const urlParams =
    new URLSearchParams(
        window.location.search
    );


const orderId =
    urlParams.get("id");


// =========================================
// LOAD ORDER
// =========================================

function loadOrderDetails() {

    if (!orderId) {

        orderDetailsContainer.innerHTML = `
            <p>
                Order ID not found.
            </p>
        `;

        return;
    }


    // =========================================
    // GET ALL ORDERS
    // =========================================

    const orders =
        JSON.parse(
            localStorage.getItem("orders")
        ) || [];


    // =========================================
    // FIND ORDER
    // =========================================

    const order =
        orders.find(
            function (item) {

                return (
                    item.orderId ===
                    orderId
                );

            }
        );


    // =========================================
    // ORDER NOT FOUND
    // =========================================

    if (!order) {

        orderDetailsContainer.innerHTML = `
            <div class="no-orders">

                <h2>
                    Order Not Found
                </h2>

                <p>
                    The requested order could not be found.
                </p>

                <a
                    href="orders.html"
                    class="view-products-button"
                >
                    Back to My Orders
                </a>

            </div>
        `;

        return;
    }


    // =========================================
    // CALCULATE TOTAL
    // =========================================

    let total = 0;


    let itemsHTML = "";


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

                <div class="order-detail-item">

                    <div>

                        <h3>
                            ${item.name}
                        </h3>

                        <p>
                            Category:
                            ${item.category}
                        </p>

                        <p>
                            Price:
                            ₹${price}
                        </p>

                        <p>
                            Quantity:
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
    // DISPLAY ORDER
    // =========================================

    orderDetailsContainer.innerHTML = `

        <div class="order-detail-card">


            <!-- Order Header -->

            <div class="order-detail-header">

                <div>

                    <p class="order-label">
                        Order ID
                    </p>

                    <h2>
                        ${order.orderId}
                    </h2>

                </div>


                <span class="order-status">
                    ${order.status || "Processing"}
                </span>

            </div>


            <!-- Order Date -->

            <div class="order-detail-date">

                Ordered on:
                ${orderDate.toLocaleDateString()}

            </div>


            <!-- Products -->

            <div class="order-detail-products">

                <h2>
                    Products
                </h2>

                ${itemsHTML}

            </div>


            <!-- Total -->

            <div class="order-detail-total">

                <span>
                    Total Amount
                </span>

                <strong>
                    ₹${total}
                </strong>

            </div>


            <!-- Customer Information -->

            <div class="order-customer-info">

                <h2>
                    Delivery Details
                </h2>


                <p>

                    <strong>
                        Name:
                    </strong>

                    ${order.customer.name}

                </p>


                <p>

                    <strong>
                        Email:
                    </strong>

                    ${order.customer.email}

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

                    ${order.customer.address}

                </p>


                <p>

                    <strong>
                        City:
                    </strong>

                    ${order.customer.city}

                </p>


                <p>

                    <strong>
                        Pincode:
                    </strong>

                    ${order.customer.pincode}

                </p>

            </div>


            <!-- Back Button -->

            <a
                href="orders.html"
                class="back-orders-button"
            >
                ← Back to My Orders
            </a>


        </div>

    `;

}


// =========================================
// LOAD ORDER DETAILS
// =========================================

loadOrderDetails();