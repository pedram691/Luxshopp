// شماره واتساپ کلی (اگه میخوای عوض کن)
const globalWhatsApp = "971500000000";

let lang = "fa";
const langSwitcher = document.getElementById("langSwitcher");

langSwitcher.addEventListener("change", () => {
  lang = langSwitcher.value;
  loadProducts();
});

async function loadProducts() {
  const res = await fetch("products.json");
  const data = await res.json();
  renderProducts(data);
}

function renderProducts(products) {
  const list = document.getElementById("product-list");
  list.innerHTML = "";

  products.forEach(p => {
    if (!p.active) return;
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
      <img src="${p.images[0]}" alt="${p.translations.title[lang]}">
      <h3>${p.translations.title[lang]}</h3>
      <p>${p.translations.desc[lang]}</p>
      <p><b>${p.price} AED</b></p>
      <button onclick="buyNow('${p.translations.title[lang]}', '${p.whatsapp || globalWhatsApp}')">
        سفارش در واتساپ
      </button>
    `;
    list.appendChild(card);
  });

  document.getElementById("contact").textContent =
    lang === "fa" ? "برای خرید در واتس‌اپ پیام دهید" :
    lang === "ar" ? "للتواصل على واتساب" :
    "Contact us on WhatsApp";
}

function buyNow(product, number) {
  window.open(`https://wa.me/${number}?text=I want to buy: ${product}`, "_blank");
}

loadProducts();
