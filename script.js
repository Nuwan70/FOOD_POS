// ================================
// FOOD DATA
// ================================

const foods = [

    {
        id: 1,
        name: "Classic Burger",
        category: "Burger",
        price: 850,
        image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500"
    },

    {
        id: 2,
        name: "Cheese Burger",
        category: "Burger",
        price: 950,
        image: "https://images.unsplash.com/photo-1572802419224-296b0aeee0d9?w=500"
    },

    {
        id: 3,
        name: "Chicken Burger",
        category: "Burger",
        price: 900,
        image: "https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?w=500"
    },

    {
        id: 4,
        name: "Beef Pizza",
        category: "Pizza",
        price: 1800,
        image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=500"
    },

    {
        id: 5,
        name: "Chicken Pizza",
        category: "Pizza",
        price: 1700,
        image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=500"
    },

    {
        id: 6,
        name: "Margherita Pizza",
        category: "Pizza",
        price: 1500,
        image: "https://images.unsplash.com/photo-1579751626657-72bc17010498?w=500"
    },

    {
        id: 7,
        name: "Coca Cola",
        category: "Drinks",
        price: 250,
        image: "https://images.unsplash.com/photo-1629203849820-fdd70d49c38e?w=500"
    },

    {
        id: 8,
        name: "Fresh Orange Juice",
        category: "Drinks",
        price: 450,
        image: "https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=500"
    },

    {
        id: 9,
        name: "Iced Coffee",
        category: "Drinks",
        price: 500,
        image: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=500"
    },

    {
        id: 10,
        name: "Chocolate Cake",
        category: "Dessert",
        price: 600,
        image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=500"
    },

    {
        id: 11,
        name: "Ice Cream",
        category: "Dessert",
        price: 450,
        image: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=500"
    },

    {
        id: 12,
        name: "Brownie",
        category: "Dessert",
        price: 550,
        image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=500"
    }

];


// ================================
// VARIABLES
// ================================

let cart = [];

let orderNumber = 1001;


// ================================
// HTML ELEMENTS
// ================================

const foodGrid = document.getElementById("foodGrid");

const checkoutItems =
    document.getElementById("checkoutItems");

const itemCount =
    document.getElementById("itemCount");

const subtotal =
    document.getElementById("subtotal");

const tax =
    document.getElementById("tax");

const total =
    document.getElementById("total");

const clearOrder =
    document.getElementById("clearOrder");

const checkoutBtn =
    document.getElementById("checkoutBtn");

const successModal =
    document.getElementById("successModal");

const newOrderBtn =
    document.getElementById("newOrderBtn");


// ================================
// DISPLAY FOOD
// ================================

function displayFoods(category = "All") {

    foodGrid.innerHTML = "";

    const filteredFoods =
        category === "All"
            ? foods
            : foods.filter(food => food.category === category);


    filteredFoods.forEach(food => {

        const card = document.createElement("div");

        card.className = "food-card";

        card.innerHTML = `

            <img
                class="food-image"
                src="${food.image}"
                alt="${food.name}"
            >

            <div class="food-info">

                <div class="food-category">
                    ${food.category}
                </div>

                <h3 class="food-name">
                    ${food.name}
                </h3>

                <div class="food-price">
                    Rs. ${food.price.toFixed(2)}
                </div>

                <button
                    class="add-btn"
                    onclick="addToCart(${food.id})"
                >
                    + Add to Order
                </button>

            </div>

        `;

        foodGrid.appendChild(card);

    });

}


// ================================
// ADD TO CART
// ================================

function addToCart(foodId) {

    const food =
        foods.find(item => item.id === foodId);

    const existingItem =
        cart.find(item => item.id === foodId);


    if (existingItem) {

        existingItem.quantity++;

    } else {

        cart.push({
            ...food,
            quantity: 1
        });

    }

    renderCart();

}


// ================================
// RENDER CART
// ================================

function renderCart() {

    checkoutItems.innerHTML = "";


    if (cart.length === 0) {

        checkoutItems.innerHTML = `

            <div class="empty-cart">

                <div class="empty-icon">
                    🛒
                </div>

                <h3>No items yet</h3>

                <p>
                    Select food items to add them
                    to the order.
                </p>

            </div>

        `;

        updateSummary();

        return;
    }


    cart.forEach(item => {

        const cartItem =
            document.createElement("div");

        cartItem.className = "cart-item";


        cartItem.innerHTML = `

            <img
                class="cart-image"
                src="${item.image}"
                alt="${item.name}"
            >

            <div class="cart-info">

                <h4>
                    ${item.name}
                </h4>

                <div class="cart-price">
                    Rs. ${item.price.toFixed(2)}
                </div>

                <div class="quantity-controls">

                    <button
                        onclick="decreaseQuantity(${item.id})"
                    >
                        −
                    </button>

                    <span>
                        ${item.quantity}
                    </span>

                    <button
                        onclick="increaseQuantity(${item.id})"
                    >
                        +
                    </button>

                    <button
                        class="remove-btn"
                        onclick="removeFromCart(${item.id})"
                    >
                        Remove
                    </button>

                </div>

            </div>

            <strong>
                Rs. ${(item.price * item.quantity).toFixed(2)}
            </strong>

        `;

        checkoutItems.appendChild(cartItem);

    });


    updateSummary();

}


// ================================
// INCREASE QUANTITY
// ================================

function increaseQuantity(foodId) {

    const item =
        cart.find(item => item.id === foodId);

    if (item) {

        item.quantity++;

    }

    renderCart();

}


// ================================
// DECREASE QUANTITY
// ================================

function decreaseQuantity(foodId) {

    const item =
        cart.find(item => item.id === foodId);


    if (!item) return;


    if (item.quantity > 1) {

        item.quantity--;

    } else {

        cart =
            cart.filter(item => item.id !== foodId);

    }

    renderCart();

}


// ================================
// REMOVE ITEM
// ================================

function removeFromCart(foodId) {

    cart =
        cart.filter(item => item.id !== foodId);

    renderCart();

}


// ================================
// UPDATE SUMMARY
// ================================

function updateSummary() {

    let totalItems = 0;

    let subtotalValue = 0;


    cart.forEach(item => {

        totalItems += item.quantity;

        subtotalValue +=
            item.price * item.quantity;

    });


    const taxValue = 0;

    const totalValue =
        subtotalValue + taxValue;


    itemCount.textContent =
        totalItems;

    subtotal.textContent =
        subtotalValue.toFixed(2);

    tax.textContent =
        taxValue.toFixed(2);

    total.textContent =
        totalValue.toFixed(2);

}


// ================================
// CATEGORY BUTTONS
// ================================

const categoryButtons =
    document.querySelectorAll(".category-btn");


categoryButtons.forEach(button => {

    button.addEventListener("click", () => {

        categoryButtons.forEach(btn => {
            btn.classList.remove("active");
        });


        button.classList.add("active");


        const category =
            button.dataset.category;


        displayFoods(category);

    });

});


// ================================
// CLEAR ORDER
// ================================

clearOrder.addEventListener("click", () => {

    if (cart.length === 0) {
        return;
    }


    const confirmClear =
        confirm("Are you sure you want to clear the order?");


    if (confirmClear) {

        cart = [];

        renderCart();

    }

});


// ================================
// COMPLETE PAYMENT
// ================================

checkoutBtn.addEventListener("click", () => {

    if (cart.length === 0) {

        alert("Please add at least one item.");

        return;
    }


    const selectedPayment =
        document.querySelector(
            'input[name="payment"]:checked'
        ).value;


    const totalAmount =
        cart.reduce(
            (sum, item) =>
                sum + item.price * item.quantity,
            0
        );


    const totalItems =
        cart.reduce(
            (sum, item) =>
                sum + item.quantity,
            0
        );


    // Receipt details

    document.getElementById(
        "receiptOrderId"
    ).textContent =
        "#" + orderNumber;


    document.getElementById(
        "receiptDate"
    ).textContent =
        new Date().toLocaleString();


    document.getElementById(
        "receiptItems"
    ).textContent =
        totalItems;


    document.getElementById(
        "receiptPayment"
    ).textContent =
        selectedPayment;


    document.getElementById(
        "receiptTotal"
    ).textContent =
        totalAmount.toFixed(2);


    // Show success modal

    successModal.classList.add("show");

});


// ================================
// NEW ORDER
// ================================

newOrderBtn.addEventListener("click", () => {

    cart = [];

    orderNumber++;

    document.getElementById(
        "orderNumber"
    ).textContent =
        orderNumber;


    successModal.classList.remove("show");


    renderCart();

});


// ================================
// INITIAL LOAD
// ================================

displayFoods();

renderCart();