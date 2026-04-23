// Data for product pricing
const pricingData = {
    "single": {
        price: "₱120.00", // Adjust this to your actual price
        text: "Single 330ml Amber Glass Bottle"
    },
    "four-pack": {
        price: "₱450.00", // Adjust this to your actual price
        text: "4-Pack (Corrugated Carrier)"
    }
};

// Function to update price based on radio button selection
function updatePrice() {
    const selectedOption = document.querySelector('input[name="pack-size"]:checked').value;
    const priceDisplay = document.getElementById('product-price');
    
    // Animate price change slightly for polish
    priceDisplay.style.opacity = 0;
    
    setTimeout(() => {
        priceDisplay.textContent = pricingData[selectedOption].price;
        priceDisplay.style.opacity = 1;
        priceDisplay.style.transition = "opacity 0.3s ease";
    }, 150);
}

// Basic cart function stub
function addToCart() {
    const selectedOption = document.querySelector('input[name="pack-size"]:checked').value;
    const itemText = pricingData[selectedOption].text;
    
    // Once you connect to a backend or PayMongo/payment links, this is where you redirect.
    alert(`Added ${itemText} to your cart!\n\nNote: E-commerce checkout integration required for final processing.`);
}