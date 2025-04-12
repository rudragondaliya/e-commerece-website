
let lastscrollY = window.scrollY
let header = document.getElementById("header")


window.addEventListener("scroll", () => {

    if(window.scrollY > lastscrollY)
    {
        header.style.top = "-70px";
    }
    else
    {
        header.style.top = "0px";
        
    }

    lastscrollY = window.scrollY;
})

let cartContainer = document.querySelector("#table tbody");
let cart = JSON.parse(localStorage.getItem("cart"))||[];

document.querySelectorAll(".cartBtn").forEach((btn) => {
  btn.addEventListener("click", function (e) {
    e.preventDefault();
    const card = btn.closest(".card");
    const itemImg = card.querySelector("img").src;
    const itemTitle = card.querySelector(".card-title").innerText;
    const itemPrice = parseFloat(
      card.querySelector(".card-subtitle").innerText.replace(/[^0-9.]/g, "")
    );

    const existingItem = cart.find((item) => item.name === itemTitle);

    if (existingItem) {
      existingItem.quantity++;
    } else {
      cart.push({
        img: itemImg,
        name: itemTitle,
        price: itemPrice,
        quantity: 1,
      });
    }

    updateCart();
  });
});


function updateCart() {
  cartContainer.innerHTML = "";
  let subtotal = 0;

  cart.forEach((item, index) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${index + 1}</td>
      <td>
        <div class="product-details d-flex align-items-center gap-2">
          <img src="${item.img}" alt="${item.name}" width="50">
          <div>
            <span class="fw-semibold">${item.name}</span>
            <h6 class="text-secondary mt-1">$${item.price.toFixed(2)}</h6>
          </div>
        </div>
      </td>
      <td>
        <div class="qty-count d-flex align-items-center justify-content-center fs-5">
          <button class="btn btn-sm btn-outline-secondary minus" data-index="${index}">-</button>
          <span class="mx-2">${item.quantity}</span>
          <button class="btn btn-sm btn-outline-secondary plus" data-index="${index}">+</button>
        </div>
      </td>
      <td>$${(item.price * item.quantity).toFixed(2)}</td>
    `;
    cartContainer.appendChild(row);
    subtotal += item.price * item.quantity;
  });

  document.querySelectorAll(".totalbill").forEach((el) => {
    el.innerText = `$${subtotal.toFixed(2)}`;
  });

  localStorage.setItem("cart",JSON.stringify(cart));

  qtyCount();
}


function qtyCount() {
  document.querySelectorAll(".plus").forEach((btn) => {
    btn.addEventListener("click", () => {
      const index = btn.getAttribute("data-index");
      cart[index].quantity++;
      updateCart();
    });
  });

  document.querySelectorAll(".minus").forEach((btn) => {
    btn.addEventListener("click", () => {
      const index = btn.getAttribute("data-index");
      if (cart[index].quantity > 1) {
        cart[index].quantity--;
      } else {
        cart.splice(index, 1); 
      }
      updateCart();
    });
  });
}
