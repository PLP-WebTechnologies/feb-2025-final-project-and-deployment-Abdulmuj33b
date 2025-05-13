document.addEventListener("DOMContentLoaded", function() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    function updateCart() {
        const cartContainer = document.getElementById("cart-items");
        const cartTotal = document.getElementById("cart-total");
        cartContainer.innerHTML = "";
        let total = 0;

        if (cart.length === 0) {
            cartContainer.innerHTML = "<p>Your cart is empty</p>";
            cartTotal.textContent = "$0.00";
            return;
        }

        cart.forEach((item, index) => {
            let div = document.createElement("div");
            div.classList.add("cart-item");
            div.innerHTML = `
                <span>${item.name}</span>
                <span>$${item.price.toFixed(2)}</span>
                <button onclick="removeItem(${index})">Remove</button>
            `;
            cartContainer.appendChild(div);
            total += item.price;
        });

        cartTotal.textContent = `$${total.toFixed(2)}`;
        localStorage.setItem("cart", JSON.stringify(cart));
    }

    window.removeItem = function(index) {
        cart.splice(index, 1);
        updateCart();
    };

    window.checkout = function() {
        if (cart.length === 0) {
            alert("Your cart is empty!");
        } else {
            alert("Proceeding to checkout...");
            localStorage.removeItem("cart");
            cart = [];
            updateCart();
            // In a real app, you would redirect to a checkout page
        }
    };

    updateCart();
});