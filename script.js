
const products = [
  { id: 1, name: "Квас домашний", price: 70, emoji: "🥤" },
  { id: 2, name: "Вода 0,5 л", price: 18, emoji: "💧" },
  { id: 3, name: "Халва сахарная", price: 8, emoji: "🍬" },
  { id: 4, name: "Халва подсолнечная", price: 8, emoji: "🌻" },
  { id: 5, name: "Халва арахисовая", price: 8, emoji: "🥜" },
  { id: 6, name: "Шоколадка «Спринт»", price: 12, emoji: "🍫" }
];

const cart = [];

function renderProducts() {
  document.getElementById("products").innerHTML =
    products.map(p => `
      <article class="product">
        <div class="emoji">${p.emoji}</div>
        <h3>${p.name}</h3>
        <p class="price">${p.price} грн</p>
        <button onclick="addToCart(${p.id})">
          Добавить в корзину
        </button>
      </article>
    `).join("");
}

function addToCart(id) {
  const product = products.find(p => p.id === id);
  if (product) cart.push(product);
  renderCart();
}

function removeFromCart(index) {
  cart.splice(index, 1);
  renderCart();
}

function renderCart() {
  document.getElementById("count").textContent = cart.length;

  document.getElementById("cartItems").innerHTML =
    cart.length
      ? cart.map((p, i) => `
          <div class="cart-item">
            <span>${p.emoji} ${p.name} — ${p.price} грн</span>
            <button class="remove" onclick="removeFromCart(${i})">
              Удалить
            </button>
          </div>
        `).join("")
      : "Корзина пуста";

  document.getElementById("total").textContent =
    cart.reduce((sum, p) => sum + p.price, 0);
}

function showCart() {
  document.getElementById("cart").scrollIntoView({
    behavior: "smooth"
  });
}

function checkout() {
  if (cart.length === 0) {
    alert("Сначала добавь товары в корзину!");
    return;
  }

  const total = cart.reduce((sum, p) => sum + p.price, 0);
  const method = document.getElementById("payment").value;

  if (method === "qr") {
    document.getElementById("paymentTotal").textContent =
      `Сумма заказа: ${total} грн.`;

    document.getElementById("paymentBox").hidden = false;
    document.getElementById("paymentBox").scrollIntoView({
      behavior: "smooth"
    });
    return;
  }

  alert(
    `Заказ магазина «ВЕРА»\n` +
    `Товаров: ${cart.length}\n` +
    `Сумма: ${total} грн\n` +
    `Оплата наличными при получении.\n\n` +
    `Это демонстрация: заказ ещё не отправлен продавцу.`
  );
}

renderProducts();
renderCart();

function openProducts() {
  document.getElementById("productsSection").scrollIntoView({
    behavior: "smooth",
    block: "start"
  });
}
