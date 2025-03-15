document.addEventListener("DOMContentLoaded", function () {
    const cartItemsContainer = document.getElementById("cart-items");
    const cartTotalSpan = document.getElementById("cart-total");
    const cartCountSpan = document.getElementById("cart-count");
    const clearCartBtn = document.getElementById("clear-cart");

    let cart = JSON.parse(localStorage.getItem("cart")) || {};

    function renderCart() {
        cartItemsContainer.innerHTML = ""; 
        let total = 0;
        let totalItems = 0;

        Object.entries(cart).forEach(([productName, item]) => {
            let itemTotal = item.price * item.quantity;
            total += itemTotal;
            totalItems += item.quantity;

            let cartItem = document.createElement("div");
            cartItem.classList.add("cart-item");
            cartItem.innerHTML = `
                <h4>${productName}</h4>
                <p>$${item.price} x ${item.quantity} = <strong>$${itemTotal.toFixed(2)}</strong></p>
                <button class="decrease" data-name="${productName}">-</button>
                <span>${item.quantity}</span>
                <button class="increase" data-name="${productName}">+</button>
                <button class="remove" data-name="${productName}">Remove</button>
            `;
            cartItemsContainer.appendChild(cartItem);
        });

        cartTotalSpan.textContent = total.toFixed(2);
        cartCountSpan.textContent = totalItems;

        attachEventListeners();
        setupPayPalButton(total);
    }

    function attachEventListeners() {
        document.querySelectorAll(".increase").forEach((button) => {
            button.addEventListener("click", () => {
                let name = button.getAttribute("data-name");
                cart[name].quantity++;
                localStorage.setItem("cart", JSON.stringify(cart));
                renderCart();
            });
        });

        document.querySelectorAll(".decrease").forEach((button) => {
            button.addEventListener("click", () => {
                let name = button.getAttribute("data-name");
                if (cart[name].quantity > 1) {
                    cart[name].quantity--;
                } else {
                    delete cart[name];
                }
                localStorage.setItem("cart", JSON.stringify(cart));
                renderCart();
            });
        });

        document.querySelectorAll(".remove").forEach((button) => {
            button.addEventListener("click", () => {
                let name = button.getAttribute("data-name");
                delete cart[name];
                localStorage.setItem("cart", JSON.stringify(cart));
                renderCart();
            });
        });

        clearCartBtn.addEventListener("click", () => {
            localStorage.removeItem("cart");
            cart = {};
            renderCart();
        });
    }

    //Paypal button
    function setupPayPalButton(total) {
        document.getElementById("paypal-button-container").innerHTML = ""; 

        paypal.Buttons({
            createOrder: function (data, actions) {
                return actions.order.create({
                    purchase_units: [{
                        amount: {
                            value: total.toFixed(2)
                        }
                    }]
                });
            },
            onApprove: function (data, actions) {
                return actions.order.capture().then(function (details) {
                    alert("Transaction completed by " + details.payer.name.given_name);
                    localStorage.removeItem("cart");
                    cart = {};
                    renderCart();
                });
            }
        }).render("#paypal-button-container");
    }

    renderCart();
});

//check out page total add up

document.addEventListener("DOMContentLoaded", function () {
    const orderSummaryContainer = document.getElementById("order-summary");
    const checkoutTotalSpan = document.getElementById("checkout-total");

    // Retrieve cart data from localStorage
    let cart = JSON.parse(localStorage.getItem("cart")) || {};
    let total = 0;

    function renderOrderSummary() {
        orderSummaryContainer.innerHTML = "";

        if (Object.keys(cart).length === 0) {
            orderSummaryContainer.innerHTML = "<p>Your cart is empty.</p>";
            checkoutTotalSpan.textContent = "0.00";
            return;
        }

        Object.entries(cart).forEach(([productName, item]) => {
            let itemTotal = item.price * item.quantity;
            total += itemTotal;

            let orderItem = document.createElement("div");
            orderItem.classList.add("order-item");
            orderItem.innerHTML = `
                <h4>${productName}</h4>
                <p>$${item.price} x ${item.quantity} = <strong>$${itemTotal.toFixed(2)}</strong></p>
            `;
            orderSummaryContainer.appendChild(orderItem);
        });

        checkoutTotalSpan.textContent = total.toFixed(2);
    }

    renderOrderSummary();

    // Handle form submission
    document.getElementById("checkout-form").addEventListener("submit", function (event) {
        event.preventDefault();
        
        // Collect shipping info
        const name = document.getElementById("name").value.trim();
        const address = document.getElementById("address").value.trim();
        const email = document.getElementById("email").value.trim();

        if (!name || !address || !email) {
            alert("Please fill in all the required fields.");
            return;
        }

        alert("Order placed successfully!");

        // Clear cart after order is placed
        localStorage.removeItem("cart");

        // Redirect to thank you page (optional)
        window.location.href = "thank_you.html";
    });
});