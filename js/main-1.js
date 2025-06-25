function updateCartPage() {
    let cartItems = JSON.parse(localStorage.getItem('cart')) || [];

    let cartItemsContainer = document.getElementById('cartItems');

    cartItemsContainer.innerHTML = '';

    cartItems.forEach(item => {
        let cartItemDiv = document.createElement('div');
        cartItemDiv.className = 'cart-item';
        cartItemDiv.innerHTML = `
            <img src="${item.imgSrc}" alt="${item.productName}">
            <p class="product-name">${item.productName}</p>
            <p class="product-price">$${item.price.toFixed(2)}</p>
        `;
        cartItemsContainer.appendChild(cartItemDiv);
    });

    let cartTotalElement = document.getElementById('cartTotal');

    let subtotal = cartItems.reduce((sum, item) => sum + item.price, 0);

    cartTotalElement.innerHTML = `<p>Subtotal: $${subtotal.toFixed(2)}</p>`;

    let gst = subtotal * 0.05;

    let qst = subtotal * 0.09975;

    let total = subtotal + gst + qst;

    cartTotalElement.innerHTML += `<p>GST (5%): $${gst.toFixed(2)}</p>`;
    cartTotalElement.innerHTML += `<p>QST (9.975%): $${qst.toFixed(2)}</p>`;
    cartTotalElement.innerHTML += `<p>Total (incl. taxes): $${total.toFixed(2)}</p>`;

    localStorage.setItem('cartTotal', JSON.stringify(total));
}
document.addEventListener('DOMContentLoaded', function () {

    let goToCheckoutButton = document.getElementById('goToCheckout');
    if (goToCheckoutButton) {
        goToCheckoutButton.addEventListener('click', function () {

            window.location.href = "./invoice.html";
        });
    } else {
        console.error("Go To Checkout button not found");
    }
    
    let clearCartButton = document.getElementById('clearCartButton');
    if (clearCartButton) {
        clearCartButton.addEventListener('click', function () {
            localStorage.clear();

            updateCartPage();
        });
    } else {
        console.error("Clear Cart button not found");
    }

    let productContainer = document.querySelector('.productContainer');
    if (productContainer) {
        productContainer.addEventListener('click', function (e) {
            if (e.target.classList.contains('addToCart')) {
                let box = e.target.closest('.box');
                let productName = box.querySelector('h3').textContent;
                let priceText = box.querySelector('h3').nextElementSibling.textContent;
                let price = parseFloat(priceText.replace('$', ''));
                let imgSrc = box.querySelector('img').getAttribute('src');

                addToCart(productName, price, imgSrc);
            }
        });
    } else {
        console.error("Product container not found");
    }

    function addToCart(productName, price, imgSrc) {
        alert("Product added to cart!");

        let cartItems = JSON.parse(localStorage.getItem('cart')) || [];

        cartItems.push({ productName, price, imgSrc });

        localStorage.setItem('cart', JSON.stringify(cartItems));

        updateCartPage();
    }

    updateCartPage();
});