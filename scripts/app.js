// Initialize products from local storage or empty array
let products = JSON.parse(localStorage.getItem('products')) || [];

// DOM elements
const productForm = document.getElementById('productForm');
const productIdInput = document.getElementById('productId');
const productNameInput = document.getElementById('productName');
const productDescriptionInput = document.getElementById('productDescription');
const submitBtn = document.getElementById('submitBtn');
const cancelBtn = document.getElementById('cancelBtn');
const productList = document.getElementById('productList');

// Generate unique ID
function generateId() {
  const maxId = products.length > 0 ? Math.max(...products.map(p => p.id)) : 0;
  return maxId + 1;
}

// Save products to local storage
function saveProducts() {
  localStorage.setItem('products', JSON.stringify(products));
}

// Render product list
function renderProducts() {
  productList.innerHTML = '';
  products.forEach(product => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${product.id}</td>
      <td>${product.name}</td>
      <td>${product.description}</td>
      <td>
        <button class="edit-btn" data-id="${product.id}">Edit</button>
        <button class="delete-btn" data-id="${product.id}">Delete</button>
      </td>
    `;
    productList.appendChild(row);
  });
}

// Reset form
function resetForm() {
  productForm.reset();
  productIdInput.value = '';
  submitBtn.textContent = 'Add Product';
  cancelBtn.style.display = 'none';
}

// Add or update product
productForm.addEventListener('submit', e => {
  e.preventDefault();
  const id = productIdInput.value ? parseInt(productIdInput.value) : null;
  const name = productNameInput.value.trim();
  const description = productDescriptionInput.value.trim();

  if (name && description) {
    if (id) {
      // Update existing product
      const product = products.find(p => p.id === id);
      product.name = name;
      product.description = description;
    } else {
      // Add new product
      const newProduct = {
        id: generateId(),
        name,
        description
      };
      products.push(newProduct);
    }
    saveProducts();
    renderProducts();
    resetForm();
  }
});

// Edit product
productList.addEventListener('click', e => {
  if (e.target.classList.contains('edit-btn')) {
    const id = parseInt(e.target.dataset.id);
    const product = products.find(p => p.id === id);
    if (product) {
      productIdInput.value = product.id;
      productNameInput.value = product.name;
      productDescriptionInput.value = product.description;
      submitBtn.textContent = 'Update Product';
      cancelBtn.style.display = 'inline-block';
    }
  }
});

// Delete product
productList.addEventListener('click', e => {
  if (e.target.classList.contains('delete-btn')) {
    const id = parseInt(e.target.dataset.id);
    products = products.filter(p => p.id !== id);
    saveProducts();
    renderProducts();
  }
});

// Cancel edit
cancelBtn.addEventListener('click', resetForm);

// Initial render
renderProducts();