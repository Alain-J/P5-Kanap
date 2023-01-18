const productsInLocalStorage =
  JSON.parse(localStorage.getItem("products")) || [];

let price = 0;

function getProduct(productId) {
  const product = fetch("http://localhost:3000/api/products/" + productId)
    .then(function (response) {
      return response.json();
    })
    .then(function (jsonResponse) {
      return jsonResponse;
    });
  return product;
}

async function formatLocalStorage() {
  const cartItems = document.querySelector("#cart__items");
  if (productsInLocalStorage.length === 0) {
    const seeCart = `<p>Le panier est vide<p> `;
    cart__items.innerHTML = seeCart;
  } else {
    let productsCart = [];

    for (i = 0; i < productsInLocalStorage.length; i++) {
      const product = await getProduct(productsInLocalStorage[i]._id);
      productsCart =
        productsCart +
        `<article class="cart__item" data-id="${productsInLocalStorage[i]._id}" data-color="${productsInLocalStorage[i].color}">
					  <div class="cart__item__img">
						<img src="${product.imageUrl}" alt="${product.altTxt}">
					  </div>
					  <div class="cart__item__content">
						<div class="cart__item__content__description">
						  <h2>${product.name}</h2>
						  <p>${productsInLocalStorage[i].color}</p>
						  <p>${product.price} €</p>
						</div>
						<div class="cart__item__content__settings">
						  <div class="cart__item__content__settings__quantity">
							<p>Qté : </p>
							<input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${productsInLocalStorage[i].quantity}">
						  </div>
						  <div class="cart__item__content__settings__delete">
							<p class="deleteItem">Supprimer</p>
						  </div>
						</div>
					  </div>
					</article>`;
      getTotalPrice(product.price, productsInLocalStorage[i].quantity);
    }
    if (i === productsInLocalStorage.length) {
      cartItems.innerHTML = productsCart;
    }
  }
}

async function display() {
  await formatLocalStorage();
  getTotalQuantity();
  displayTotalPrice();
  initDeleteListeners();
  initQuantityListeners();
}

display();

function getTotalPrice(productPrice, quantity) {
  price += productPrice * quantity;
}

function displayTotalPrice() {
  document.querySelector("#totalPrice").innerText = price;
}

function getTotalQuantity() {
  const getQuantity = document.querySelector("#totalQuantity");
  let totalQuantity = 0;
  for (i = 0; i < productsInLocalStorage.length; i++) {
    totalQuantity += productsInLocalStorage[i].quantity;
  }
  getQuantity.innerText = totalQuantity;
}

function initDeleteListeners() {
  const deleteBtns = document.querySelectorAll(".deleteItem");

  for (let k = 0; k < deleteBtns.length; k++) {
    initDeleteBtn(deleteBtns[k]);
  }
}

function initDeleteBtn(btn) {
  btn.addEventListener("change", (e) => {
    e.preventDefault();
    const article = e.target.closest(".cart__item");
    const productId = article.dataset.id;
    const color = article.dataset.color;
    const index = productsInLocalStorage.findIndex(
      (p) => p._id === productId && p.color === color
    );
    if (index !== -1) {
      productsInLocalStorage.splice(index, 1);
      localStorage.setItem("products", JSON.stringify(productsInLocalStorage));
      alert("L'article a été supprimé");
      location.reload();
    }
  });
}

function initQuantityListeners() {
  const quantityBtns = document.querySelectorAll(".itemQuantity");

  for (let m = 0; m < quantityBtns.length; m++) {
    initQuantityBtn(quantityBtns[m]);
  }
}

function initQuantityBtn(btn) {
  btn.addEventListener("click", (e) => {
    e.preventDefault();
    const div = e.target.closest(".cart__item");
    const productId = div.dataset.id;
    const color = div.dataset.color;
    const quantity = btn.valueAsNumber;
    const index = productsInLocalStorage.findIndex(
      (p) => p._id === productId && p.color === color
    );
    if (index !== -1) {
      if (quantity === 0) {
        productsInLocalStorage.splice(index, 1);
        localStorage.setItem(
          "products",
          JSON.stringify(productsInLocalStorage)
        );
      }  if(quantity < 1 || quantity > 100) {
        alert('La quantité maximum est de 100');
    }  
      else if (quantity > 0) {
        productsInLocalStorage[index].quantity = quantity;
        localStorage.setItem(
          "products",
          JSON.stringify(productsInLocalStorage)
        );
        alert("La quantité a été modifiée ");
        window.location.reload();
      }
    }
  });
}

function controlFirstName() {
  const firstName = document.querySelector("#firstName").value;
  if (firstName.match(/^[a-zA-Z\-]+$/)) {
    document.querySelector("#firstNameErrorMsg").innerText = "";
    return true;
  } else {
    document.querySelector("#firstNameErrorMsg").innerText =
      "Veuillez ecrire un prenom valable";
    return false;
  }
}

function controlLastName() {
  const lastName = document.querySelector("#lastName").value;
  if (lastName.match(/^[a-zA-Z\-]+$/)) {
    document.querySelector("#lastNameErrorMsg").innerText = "";
    return true;
  } else {
    document.querySelector("#lastNameErrorMsg").innerText =
      "Veuillez ecrire un nom valable";
    return false;
  }
}

function controlCity() {
  const city = document.querySelector("#city").value;
  if (city.match(/^[a-zA-Z\-]+$/)) {
    document.querySelector("#cityErrorMsg").innerText = "";
    return true;
  } else {
    document.querySelector("#cityErrorMsg").innerText =
      "Veuillez ecrire une ville valable";
    return false;
  }
}

function controlAddress() {
  const address = document.querySelector("#address").value;
  if (address.match(/^[a-zA-Z0-9\s,'-]*$/)) {
    document.querySelector("#addressErrorMsg").innerText = "";
    return true;
  } else {
    document.querySelector("#addressErrorMsg").innerText =
      "Veuillez ecrire une adresse valable";
    return false;
  }
}

function controlEmail() {
  const email = document.querySelector("#email").value;
  if (
    email.match(
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    )
  ) {
    document.querySelector("#emailErrorMsg").innerText = "";
    return true;
  } else {
    document.querySelector("#emailErrorMsg").innerText =
      "Veuillez ecrire un email valable";
    return false;
  }
}

function validFirstName() {
  let firstName = document.querySelector("#firstName");
  firstName.addEventListener("change", (e) => {
    e.preventDefault();
    controlFirstName();
  });
}

function validLastName() {
  let lastName = document.querySelector("#lastName");
  lastName.addEventListener("change", (e) => {
    e.preventDefault();
    controlLastName();
  });
}

function validCity() {
  let city = document.querySelector("#city");
  city.addEventListener("change", (e) => {
    e.preventDefault();
    controlCity();
  });
}

function validEmail() {
  let email = document.querySelector("#email");
  email.addEventListener("change", (e) => {
    e.preventDefault();
    controlEmail();
  });
}

function validAddress() {
  let address = document.querySelector("#address");
  address.addEventListener("change", (e) => {
    e.preventDefault();
    controlAddress();
  });
}

validFirstName();
validLastName();
validCity();
validAddress();
validEmail();

function listennerOrderBtn() {
  const btnValidate = document.querySelector("#order");
  btnValidate.addEventListener("click", (e) => {
    e.preventDefault();
    const productsInLocalStorage =
      JSON.parse(localStorage.getItem("products")) || [];
    const isFirstNameValid = controlFirstName();
    const isLastNameValid = controlLastName();
    const isCityValid = controlCity();
    const isAddressValid = controlAddress();
    const isEmailValid = controlEmail();
    if (
      productsInLocalStorage.length &&
      isFirstNameValid &&
      isLastNameValid &&
      isCityValid &&
      isAddressValid &&
      isEmailValid
    ) {
      const body = {};
      const firstName = document.querySelector("#firstName").value;
      const lastName = document.querySelector("#lastName").value;
      const city = document.querySelector("#city").value;
      const address = document.querySelector("#address").value;
      const email = document.querySelector("#email").value;
      body.contact = { firstName, lastName, city, address, email };
      body.products = productsInLocalStorage.map((p) => p._id);
      // j'envoie le body sur order
      fetch("http://localhost:3000/api/products/order" , {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      })
      .then(function (response) {
        return response.json();
      }) 
      .then(function (data) {
        localStorage.clear();
        window.location.href = 'confirmation.html?orderId='+data.orderId;
      });
    }
  });
}
listennerOrderBtn();