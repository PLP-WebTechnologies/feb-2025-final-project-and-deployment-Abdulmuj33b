// Mobile Navigation Toggle
document.getElementById('mobileNavBtn').addEventListener('click', function() {
    const nav = document.getElementById('mainNav').querySelector('ul');
    nav.classList.toggle('show-nav');
});

// Update cart count
function updateCartCount() {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    document.getElementById('cart-count').textContent = cart.length;
}

// Initialize cart count
updateCartCount();

// Add to cart functionality
document.addEventListener('DOMContentLoaded', function() {
    const addToCartButtons = document.querySelectorAll('.addToCart');
    
    addToCartButtons.forEach(button => {
        button.addEventListener('click', function() {
            const productElement = this.parentElement;
            const name = productElement.querySelector('p').textContent.split(' - ')[0];
            const price = parseFloat(productElement.querySelector('p').textContent.split(' - $')[1]);
            
            let cart = JSON.parse(localStorage.getItem('cart')) || [];
            cart.push({ name, price });
            localStorage.setItem('cart', JSON.stringify(cart));
            
            updateCartCount();
            
            // Visual feedback
            this.textContent = 'Added!';
            this.style.backgroundColor = '#2ecc71';
            setTimeout(() => {
                this.textContent = 'Add to Cart';
                this.style.backgroundColor = '#3498db';
            }, 1000);
        });
    });

    // Video background effect
    document.querySelector('video')?.addEventListener('play', function() {
        document.body.style.backgroundColor = '#f4f4f4';
    });
    
    document.querySelector('video')?.addEventListener('pause', function() {
        document.body.style.backgroundColor = '';
    });

    // Search functionality
    document.getElementById('searchBtn').addEventListener('click', searchProducts);
    document.getElementById('priceFilter').addEventListener('change', searchProducts);
    document.getElementById('categoryFilter').addEventListener('change', searchProducts);
});

function searchProducts() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    const priceRange = document.getElementById('priceFilter').value;
    const category = document.getElementById('categoryFilter').value;
    
    const products = document.querySelectorAll('.product');
    
    products.forEach(product => {
        const name = product.querySelector('p').textContent.toLowerCase();
        const price = parseFloat(product.getAttribute('data-price'));
        const productCategory = product.getAttribute('data-category');
        
        let matchesSearch = name.includes(searchTerm) || searchTerm === '';
        let matchesPrice = true;
        let matchesCategory = true;
        
        if (priceRange) {
            const [min, max] = priceRange.split('-').map(Number);
            matchesPrice = (max ? price >= min && price <= max : price >= min);
        }
        
        if (category) {
            matchesCategory = productCategory === category;
        }
        
        if (matchesSearch && matchesPrice && matchesCategory) {
            product.style.display = 'block';
        } else {
            product.style.display = 'none';
        }
    });
}