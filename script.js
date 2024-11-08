const $ = require('jquery');  // Import jQuery




$(document).ready(function() {
    console.log("jQuery is now ready and working!");
    // Show Book Table Modal
    $('#bookTable').on('click', function() {
        $('#bookTableModal').modal('show');
    });

    // Show User Login Modal
    $('#userIcon').on('click', function() {
        $('#userModal').modal('show');
    });

    // Function to hide all forms within the modal
    function hideAllForms() {
        $('#loginForm, #forgotPasswordForm, #otpForm, #signUpForm').hide();
    }

    // Show Forgot Password form
    $('#forgotPasswordLink').on('click', function() {
        hideAllForms();
        $('#forgotPasswordForm').show();
    });

    // Show Sign Up form
    $('#signUpLink').on('click', function() {
        hideAllForms();
        $('#signUpForm').show();
    });

    // Show Login form
    $('#loginLink').on('click', function() {
        hideAllForms();
        $('#loginForm').show();
    });

    // Show OTP form on "Next" button click in Forgot Password
    $('#nextButton').on('click', function(e) {
        e.preventDefault();
        hideAllForms();
        $('#otpForm').show();
    });

    // Back button functionality to go back to the login form
    $('.backButton').on('click', function() {
        hideAllForms();
        $('#loginForm').show();
    });

    // Default to show only the login form when the modal opens
    $('#userModal').on('show.bs.modal', function() {
        hideAllForms();
        $('#loginForm').show();
    });
});






function addToCart(name, price) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.push({ name: name, price: price });  
    localStorage.setItem("cart", JSON.stringify(cart));   
    alert(name + " has been added to your cart at Rs " + price);
}

function loadCartItems() {
    const cartItemsDiv = document.getElementById("cartItems");
    const totalPriceDiv = document.getElementById("totalPrice");

    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let total = 0;
    let itemMap = {};

    cartItemsDiv.innerHTML = "";

    cart.forEach(item => {
        if (itemMap[item.name]) {
            itemMap[item.name].count += 1;
        } else {
            itemMap[item.name] = { ...item, count: 1 };
        }
        total += item.price;
    });

    for (let itemName in itemMap) {
        const item = itemMap[itemName];
        const itemDiv = document.createElement("div");
        itemDiv.classList.add("cart-item", "fade-in");

        itemDiv.innerHTML = `
            <span>${item.name} - RS.${item.price} (x${item.count})</span>
            <button class="remove-button" onclick="removeItem('${item.name}')">Remove</button>
        `;

        cartItemsDiv.appendChild(itemDiv);
    }

    totalPriceDiv.textContent = "Total Price: RS." + total;
}

function goToHome() {
    window.location.href = "index.html";
}

function goToMenu() {
    window.location.href = "menu.html";
}

function makePayment() {
    if (confirm("Proceed to payment?")) {
        alert("Payment successful! Thank you for your order.");
        localStorage.removeItem("cart"); 
        loadCartItems(); 
    }
}

function removeItem(itemName) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let newCart = [];

    let itemRemoved = false;
    for (let item of cart) {
        if (item.name === itemName && !itemRemoved) {
            itemRemoved = true;
        } else {
            newCart.push(item);
        }
    }

    localStorage.setItem("cart", JSON.stringify(newCart));
    loadCartItems();
}

window.onload = loadCartItems;


function loadCartItems() {
    const cartItemsDiv = document.getElementById("cartItems");
    const totalPriceDiv = document.getElementById("totalPrice");

    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let total = 0;
    let itemMap = {};

    cartItemsDiv.innerHTML = "";

    if (cart.length === 0) {
        cartItemsDiv.innerHTML = `<p class="empty-message">Your cart is empty. Add some items!</p>`;
        totalPriceDiv.textContent = "Total Price: RS. 0";
        return;
    }

    cart.forEach(item => {
        if (itemMap[item.name]) {
            itemMap[item.name].count += 1;
        } else {
            itemMap[item.name] = { ...item, count: 1 };
        }
        total += item.price;
    });

    // Display each unique item with its count
    for (let itemName in itemMap) {
        const item = itemMap[itemName];
        const itemDiv = document.createElement("div");
        itemDiv.classList.add("cart-item", "fade-in");

        itemDiv.innerHTML = `
            <span>${item.name} - RS.${item.price} (x${item.count})</span>
            <button class="remove-button" onclick="removeItem('${item.name}')">Remove</button>
        `;

        cartItemsDiv.appendChild(itemDiv);
    }

    totalPriceDiv.textContent = "Total Price: RS." + total;
}






// for receipt


function makePayment() {
    if (confirm("Proceed to payment?")) {
        alert("Payment successful! Thank you for your order.");
        
        displayReceipt(); // Show receipt after payment
        
        localStorage.removeItem("cart"); 
        loadCartItems(); 
    }
}

// Function to display the receipt
function displayReceipt() {
    const receiptDiv = document.getElementById("receipt");
    const receiptItemsDiv = document.getElementById("receiptItems");
    const receiptTotal = document.getElementById("receiptTotal");

    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let total = 0;
    let itemMap = {};

    receiptItemsDiv.innerHTML = "";

    // Aggregate items and calculate total
    cart.forEach(item => {
        if (itemMap[item.name]) {
            itemMap[item.name].count += 1;
        } else {
            itemMap[item.name] = { ...item, count: 1 };
        }
        total += item.price;
    });

    // Display each unique item in the receipt
    for (let itemName in itemMap) {
        const item = itemMap[itemName];
        const itemLine = document.createElement("p");
        itemLine.textContent = `${item.name} - RS.${item.price} (x${item.count})`;
        receiptItemsDiv.appendChild(itemLine);
    }

    receiptTotal.textContent = "Total Price: RS." + total;
    receiptDiv.style.display = "block"; // Show the receipt section
}

function loadCartItems() {
    const cartItemsDiv = document.getElementById("cartItems");
    const totalPriceDiv = document.getElementById("totalPrice");

    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let total = 0;
    let itemMap = {};

    cartItemsDiv.innerHTML = "";

    if (cart.length === 0) {
        cartItemsDiv.innerHTML = `<p class="empty-message">Your cart is empty. Add some items!</p>`;
        totalPriceDiv.textContent = "Total Price: RS. 0";
        return;
    }

    cart.forEach(item => {
        if (itemMap[item.name]) {
            itemMap[item.name].count += 1;
        } else {
            itemMap[item.name] = { ...item, count: 1 };
        }
        total += item.price;
    });

    // Display each unique item with its count
    for (let itemName in itemMap) {
        const item = itemMap[itemName];
        const itemDiv = document.createElement("div");
        itemDiv.classList.add("cart-item", "fade-in");

        itemDiv.innerHTML = `
            <span>${item.name} - RS.${item.price} (x${item.count})</span>
            <button class="remove-button" onclick="removeItem('${item.name}')">Remove</button>
        `;

        cartItemsDiv.appendChild(itemDiv);
    }

    totalPriceDiv.textContent = "Total Price: RS." + total;
}







