
let cart = [];
let totalAmount = 0;
let discount = 0;

function addProduct() {
    const productName = document.getElementById('product-name').value;
    const productPrice = parseFloat(document.getElementById('product-price').value);
    const productQuantity = parseInt(document.getElementById('product-quantity').value);

    if (productName && !isNaN(productPrice) && !isNaN(productQuantity) && productQuantity > 0) {
        const product = {
            name: productName,
            price: productPrice,
            quantity: productQuantity,
            total: productPrice * productQuantity
        };

        
        cart.push(product);
        totalAmount += product.total;

        
        document.getElementById('product-name').value = '';
        document.getElementById('product-price').value = '';
        document.getElementById('product-quantity').value = '';

        
        displayCart();
    } else {
        alert("Please enter valid product details.");
    }
}


function displayCart() {
    const cartItemsList = document.getElementById('cart-items');
    cartItemsList.innerHTML = '';

    cart.forEach(item => {
        const li = document.createElement('li');
        li.innerHTML = `${item.name} (x${item.quantity}): $${item.total.toFixed(2)}`;
        cartItemsList.appendChild(li);
    });

    document.getElementById('total-amount').textContent = totalAmount.toFixed(2);
}


function applyDiscount() {
    discount = parseFloat(document.getElementById('discount').value);
    if (isNaN(discount) || discount < 0) {
        discount = 0;
        document.getElementById('discount').value = '';
    }
    displayCart();
}


function generateReceipt() {
    let receiptDetails = `Receipt\n\n`;
    cart.forEach(item => {
        receiptDetails += `${item.name} (x${item.quantity}): $${item.total.toFixed(2)}\n`;
    });

    const discountAmount = (totalAmount * discount) / 100;
    const finalAmount = totalAmount - discountAmount;

    receiptDetails += `\nTotal: $${totalAmount.toFixed(2)}\n`;
    if (discount > 0) {
        receiptDetails += `Discount: -$${discountAmount.toFixed(2)} (${discount}%)\n`;
    }
    receiptDetails += `Final Amount: $${finalAmount.toFixed(2)}`;

    
    document.getElementById('receipt-details').textContent = receiptDetails;
    document.getElementById('receipt').style.display = 'block';
    document.getElementById('cart-items').style.display = 'none';
}


function resetSystem() {
    cart = [];
    totalAmount = 0;
    discount = 0;
    document.getElementById('discount').value = '';
    document.getElementById('receipt').style.display = 'none';
    document.getElementById('cart-items').style.display = 'block';
    displayCart();
}
