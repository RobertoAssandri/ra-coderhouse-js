document.addEventListener('DOMContentLoaded', () => {
    const productForm = document.getElementById('productForm');
    const productTable = document.getElementById('productTable');
    const cancelEditBtn = document.getElementById('cancelEdit');
    let products = [];
    let editId = null;

    // Load products from JSON file
    async function loadProducts() {
        try {
            const response = await fetch('products.json');
            products = await response.json();
            renderProducts();
        } catch (error) {
            console.error('Error loading products:', error);
        }
    }

    // Save products to JSON file (simulated, as browsers can't write files directly)
    async function saveProducts() {
        console.log('Saving products:', products);
        // In a real scenario, you'd send this to a server
        // await fetch('products.json', {
        //     method: 'POST',
        //     body: JSON.stringify(products),
        //     headers: { 'Content-Type': 'application/json' }
        // });
    }

    // Render products in table
    function renderProducts() {
        productTable.innerHTML = '';
        products.forEach(product => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${product.id}</td>
                <td>${product.name}</td>
                <td>$${parseFloat(product.price).toFixed(2)}</td>
                <td>${product.description}</td>
                <td>
                    <button class="edit" onclick="editProduct(${product.id})">Edit</button>
                    <button class="delete" onclick="deleteProduct(${product.id})">Delete</button>
                </td>
            `;
            productTable.appendChild(row);
        });
    }

    // Add or update product
    productForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const name = document.getElementById('name').value;
        const price = parseFloat(document.getElementById('price').value);
        const description = document.getElementById('description').value;

        if (editId === null) {
            // Create new product
            const newId = products.length > 0 ? Math.max(...products.map(p => p.id)) + 1 : 1;
            products.push({ id: newId, name, price, description });
        } else {
            // Update existing product
            const product = products.find(p => p.id === editId);
            product.name = name;
            product.price = price;
            product.description = description;
            editId = null;
            cancelEditBtn.style.display = 'none';
        }

        await saveProducts();
        renderProducts();
        productForm.reset();
    });

    // Edit product
    window.editProduct = function(id) {
        const product = products.find(p => p.id === id);
        if (product) {
            document.getElementById('productId').value = product.id;
            document.getElementById('name').value = product.name;
            document.getElementById('price').value = product.price;
            document.getElementById('description').value = product.description;
            editId = id;
            cancelEditBtn.style.display = 'inline-block';
        }
    };

    // Delete product
    window.deleteProduct = async function(id) {
        if (confirm('Are you sure you want to delete this product?')) {
            products = products.filter(p => p.id !== id);
            await saveProducts();
            renderProducts();
        }
    };

    // Cancel edit
    cancelEditBtn.addEventListener('click', () => {
        productForm.reset();
        editId = null;
        cancelEditBtn.style.display = 'none';
    });

    // Initial load
    loadProducts();
});