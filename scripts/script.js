let products = [];

function isIdUnique(id) {
    return !products.some(product => product.id === id);
}

function addProduct() {
    let id = prompt("Enter product ID:");
    if (id === null){
        return false; // Exit if user cancels
    } 
    id = parseInt(id);

    if (isNaN(id)) {
        alert("Please enter a valid number for ID");
        return false;
    }

    if (!isIdUnique(id)) {
        alert("This ID already exists. Please use a unique ID.");
        return false;
    }

    let name = prompt("Enter product name:");
    if (name === null){
        return false; // Exit if user cancels
    } 
    if (name.trim() === "") {
        alert("Product name cannot be empty");
        return false;
    }

    let price = prompt("Enter product price:");
    if (price === null) {
        return false; // Exit if user cancels
    }
    price = parseFloat(price);

    if (isNaN(price) || price < 0) {
        alert("Please enter a valid price");
        return false;
    }

    products.push({ id, name, price });
    alert("Product added successfully!");
    return true;
}

function displayProducts() {
    if (products.length === 0) {
        alert("No products to display");
        return false;
    }

    let message = "Products List:\n\n";
    products.forEach(product => {
        message += `ID: ${product.id}\nName: ${product.name}\nPrice: $${product.price.toFixed(2)}\n\n`;
    });
    alert(message);
    return true;
}

// Main menu function
function mainMenu() {
    let choice = prompt("Choose an option:\n1. Add Product\n2. Display Products\n(Cancel to exit)");

    if (choice === null) {
        alert("Application closed.");
        return;
    }

    switch (choice) {
        case "1":
        if (addProduct()) {
            setTimeout(mainMenu, 0); // Continue after successful add
        } else {
            setTimeout(mainMenu, 0); // Continue even if add fails
        }
        break;

        case "2":
        if (displayProducts()) {
            setTimeout(mainMenu, 0); // Continue after display
        } else {
            setTimeout(mainMenu, 0); // Continue even if no products
        }
        break;

        default:
        alert("Invalid option. Please choose 1 or 2.");
        setTimeout(mainMenu, 0); // Continue after invalid input
    }
}

// Start the program
mainMenu();