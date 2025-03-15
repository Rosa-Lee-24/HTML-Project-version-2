//Shop function starts

document.addEventListener("DOMContentLoaded", () => {
    const cartAmount = document.querySelector(".cartAmount"); // Total cart quantity display
    let cart = JSON.parse(localStorage.getItem("cart")) || {}; // Retrieve cart from localStorage

    updateCartDisplay(); // Initialize cart display on page load

    document.querySelectorAll(".product").forEach((product) => {
        const decreaseBtn = product.querySelector(".decrease");
        const increaseBtn = product.querySelector(".increase");
        const countSpan = product.querySelector(".count");
        const productName = product.querySelector("h3").textContent;
        const productPrice = parseFloat(product.querySelector(".price").textContent.replace("$", ""));

        let count = cart[productName]?.quantity || 0; // Get quantity from cart
        countSpan.textContent = count; // Display current count

        // Increase button functionality
        increaseBtn.addEventListener("click", () => {
            count++;
            updateCart(productName, productPrice, count);
            countSpan.textContent = count;
        });

        // Decrease button functionality
        decreaseBtn.addEventListener("click", () => {
            if (count > 0) {
                count--;
                updateCart(productName, productPrice, count);
                countSpan.textContent = count;
            }
        });
    });

    function updateCart(productName, productPrice, quantity) {
        if (quantity > 0) {
            cart[productName] = { price: productPrice, quantity: quantity };
        } else {
            delete cart[productName]; // Remove from cart if quantity is 0
        }

        localStorage.setItem("cart", JSON.stringify(cart)); // Save updated cart
        updateCartDisplay();
    }

    function updateCartDisplay() {
        let totalItems = Object.values(cart).reduce((acc, item) => acc + item.quantity, 0);
        cartAmount.textContent = totalItems; // Update cart count
    }
});
// Function to scroll one testimonial at a time to the right
function scrollTestimonials() {
    const testimonials = document.querySelector('.testimonials');
    const firstTestimonial = document.querySelector('.testimonial-item');
    
    // Scroll by the width of one testimonial + the margin to move one item at a time
    testimonials.scrollBy({
      left: firstTestimonial.offsetWidth + 40,  // 40px for the margin-right
      behavior: 'smooth'
    });
  }

  // Automatically scroll every 3 seconds (3000 milliseconds)
  setInterval(scrollTestimonials, 3000); 

  //Chatbox function starts 
  document.getElementById("chatbot-button").addEventListener("click", function() {
    document.getElementById("chatbot").style.display = "flex";
});

document.getElementById("close-chatbot").addEventListener("click", function() {
    document.getElementById("chatbot").style.display = "none";
});

const products = [
    { name: "Dark Chocolate", description: "Rich and smooth dark chocolate for true lovers.", price: "$5.00", taste: "Deep cocoa flavor with a smooth finish." },
    { name: "Almond Crunch", description: "Crunchy roasted almonds covered in smooth chocolate.", price: "$6.00", taste: "Nutty and sweet with a satisfying crunch." },
    { name: "Mint Delight", description: "Refreshing mint paired with decadent chocolate.", price: "$5.00", taste: "Cool minty freshness with rich chocolate." },
    { name: "Hazelnut Truffle", description: "Delicate hazelnut filling in smooth chocolate.", price: "$7.00", taste: "Creamy hazelnut blended with luxurious chocolate." },
    { name: "Coconut Bliss", description: "Tropical coconut and creamy chocolate blend.", price: "$6.00", taste: "Sweet coconut notes with a velvety chocolate texture." },
    { name: "Caramel Swirl", description: "Smooth caramel with rich chocolate coating.", price: "$5.00", taste: "Sweet and buttery caramel wrapped in chocolate." },
    { name: "Berry Burst", description: "A mix of berries with a chocolate finish.", price: "$6.00", taste: "Juicy berry flavors combined with smooth chocolate." },
    { name: "Mint Chocolate", description: "Refreshing mint paired with soft succulent chocolate.", price: "$5.00", taste: "Silky chocolate with a cool minty twist." },
    { name: "Orange Zest", description: "Zesty orange meets luxurious dark chocolate.", price: "$5.00", taste: "Tangy citrus balanced with rich chocolate." }
];

document.getElementById("chatbot-send").addEventListener("click", function() {
    let input = document.getElementById("chatbot-input").value.trim().toLowerCase();
    let response = "I'm not sure. Can you ask about a specific chocolate type?";

    for (let product of products) {
        if (input.includes(product.name.toLowerCase())) {
            if (input.includes("how much") || input.includes("cost") || input.includes("price")) {
                response = `The price of ${product.name} is ${product.price}.`;
            } else if (input.includes("taste") || input.includes("flavor")) {
                response = `${product.name} tastes ${product.taste}.`;
            } else {
                response = `Our ${product.name}: ${product.description}`;
            }
            break;
        }
    }

    let chatbox = document.getElementById("chatbot-messages");
    chatbox.innerHTML += `<p><strong>You:</strong> ${input}</p>`;
    chatbox.innerHTML += `<p><strong>Bot:</strong> ${response}</p>`;

    document.getElementById("chatbot-input").value = "";
    chatbox.scrollTop = chatbox.scrollHeight;
});

//Chatbox function ends

 // Dark mode toggle
// Dark mode toggle function
function myFunction() {
    let body = document.body;
    body.classList.toggle("dark-mode");

    // Save user preference in local storage
    if (body.classList.contains("dark-mode")) {
        localStorage.setItem("theme", "dark");
    } else {
        localStorage.setItem("theme", "light");
    }
}

// Apply saved theme when page loads
document.addEventListener("DOMContentLoaded", () => {
    if (localStorage.getItem("theme") === "dark") {
        document.body.classList.add("dark-mode");
    }
});


//Pop up for newsletter
document.addEventListener("DOMContentLoaded", function () {
    setTimeout(() => {
        document.getElementById("newsletter-popup").style.display = "block";
    }, 3000); // Show popup after 3 seconds
});

function closePopup() {
    document.getElementById("newsletter-popup").style.display = "none";
}

function subscribe() {
    let email = document.getElementById("email").value;
    if (email) {
        alert("Thank you for subscribing!");
        closePopup();
    } else {
        alert("Please enter a valid email.");
    }
}

