const products = [
  { id: 1, name: "Kalung Kucing", price: 30000, image: "https://via.placeholder.com/150" },
  { id: 2, name: "Mainan Kucing", price: 50000, image: "https://via.placeholder.com/150" },
  { id: 3, name: "Tempat Makan Kucing", price: 70000, image: "https://via.placeholder.com/150" },
  { id: 4, name: "Baju Kucing", price: 90000, image: "https://via.placeholder.com/150" },
];

let cart = [];

// Render produk
function renderProducts() {
  const productList = document.getElementById("product-list");
  products.forEach((product) => {
    const productItem = document.createElement("div");
    productItem.classList.add("product-item");
    productItem.innerHTML = `
      <img src="${product.image}" alt="${product.name}" />
      <h3>${product.name}</h3>
      <p>Harga: Rp ${product.price}</p>
      <button onclick="addToCart(${product.id})">Tambah ke Keranjang</button>
    `;
    productList.appendChild(productItem);
  });
}

// Tambahkan ke keranjang
function addToCart(productId) {
  const product = products.find((p) => p.id === productId);
  cart.push(product);
  updateCart();
}

// Update tampilan keranjang
function updateCart() {
  const cartItems = document.getElementById("cart-items");
  const totalPriceElement = document.getElementById("total-price");
  cartItems.innerHTML = "";

  let totalPrice = 0;
  cart.forEach((item, index) => {
    totalPrice += item.price;
    const cartItem = document.createElement("div");
    cartItem.innerHTML = `
      <p>${item.name} - Rp ${item.price}</p>
      <button onclick="removeFromCart(${index})">Hapus</button>
    `;
    cartItems.appendChild(cartItem);
  });

  totalPriceElement.innerText = `Rp ${totalPrice}`;
}

// Hapus dari keranjang
function removeFromCart(index) {
  cart.splice(index, 1);
  updateCart();
}

// Checkout
document.getElementById("checkout-button").addEventListener("click", () => {
  document.getElementById("checkout-modal").classList.remove("hidden");
});

document.getElementById("pay-button").addEventListener("click", () => {
  const paymentInput = document.getElementById("payment-input").value;
  const totalPrice = cart.reduce((sum, item) => sum + item.price, 0);

  if (paymentInput >= totalPrice) {
    const change = paymentInput - totalPrice;
    alert(`Pembayaran berhasil! Kembalian Anda: Rp ${change}`);
    cart = [];
    updateCart();
    document.getElementById("checkout-modal").classList.add("hidden");
  } else {
    alert("Uang yang dimasukkan kurang!");
  }
});

document.getElementById("close-modal").addEventListener("click", () => {
  document.getElementById("checkout-modal").classList.add("hidden");
});

renderProducts();
