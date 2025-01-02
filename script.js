const products = [
  { id: 1, name: "Kalung Kucing", price: 50000, img: "images/item1.jpg" },
  { id: 2, name: "Mainan Bola", price: 30000, img: "images/item2.jpg" },
  { id: 3, name: "Tempat Tidur", price: 150000, img: "images/item3.jpg" },
  { id: 4, name: "Mangkuk Makan", price: 45000, img: "images/item4.jpg" },
  { id: 5, name: "Tas Kucing", price: 200000, img: "images/item5.jpg" },
  { id: 6, name: "Sisir Kucing", price: 35000, img: "images/item6.jpg" },
  { id: 7, name: "Baju Kucing", price: 80000, img: "images/item7.jpg" },
  { id: 8, name: "Climber", price: 250000, img: "images/item8.jpg" },
];

const cart = [];

// Render produk
function renderProducts() {
  const productList = document.getElementById("product-list");
  products.forEach((product) => {
    const productDiv = document.createElement("div");
    productDiv.className = "product";
    productDiv.innerHTML = `
      <img src="${product.img}" alt="${product.name}">
      <h3>${product.name}</h3>
      <p>${product.price} IDR</p>
      <button onclick="addToCart(${product.id})">Tambah ke Keranjang</button>
    `;
    productList.appendChild(productDiv);
  });
}

// Tambah ke keranjang
function addToCart(productId) {
  const product = products.find((p) => p.id === productId);
  cart.push(product);
  updateCart();
}

// Perbarui keranjang
function updateCart() {
  const cartItems = document.getElementById("cart-items");
  const totalPrice = document.getElementById("total-price");
  cartItems.innerHTML = "";
  let total = 0;

  cart.forEach((item) => {
    total += item.price;
    const li = document.createElement("li");
    li.textContent = `${item.name} - ${item.price} IDR`;
    cartItems.appendChild(li);
  });

  totalPrice.textContent = total;
}

// Checkout
document.getElementById("checkout-btn").addEventListener("click", () => {
  document.getElementById("payment").style.display = "block";
});

// Bayar
document.getElementById("pay-btn").addEventListener("click", () => {
  const paymentAmount = parseInt(document.getElementById("payment-amount").value);
  const total = parseInt(document.getElementById("total-price").textContent);

  if (paymentAmount >= total) {
    alert(`Pembayaran berhasil! Kembalian Anda: ${paymentAmount - total} IDR`);
  } else {
    alert("Nominal tidak mencukupi.");
  }
});

// Jalankan saat halaman dimuat
renderProducts();
