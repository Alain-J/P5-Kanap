// Sur la page des canapé une fois avoir cliquer sur le canapé en question,
// Afficher le canapé demandée sur la page produit 
// Récupérer l'id de chaque canapé

const productId = new URL(location.href).searchParams.get("id");

function getProduct() {
    const product = fetch('http://localhost:3000/api/products/'+productId)
        .then(function (response) {
            return response.json();
        }).then(function (jsonResponse) {
            return jsonResponse;
        });
    return product;
}

function renderProduct(product) {
    document.querySelector(".item__img").innerHTML += `<img src="${product.imageUrl}" alt="${product.altTxt}">`;
    document.querySelector("#title").innerHTML += `${product.name}`;
    document.querySelector("#price").innerHTML += `${product.price}`;
    document.querySelector("#description").innerHTML += `${product.description}`;
    document.querySelector("#colors").insertAdjacentHTML('beforeend', product.colors.map(color => `<option value="${color}">${color}</option>`))
    document.querySelector("title").title.innerHTML += `${product.name}`; 
    const title = document.querySelector('title');
    title.innerHTML = `${product.name}`;
}

async function displayProduct() {
    const product = await getProduct();
    renderProduct(product);
}

displayProduct();

function addToCart() {
    document.querySelector("#addToCart").addEventListener('click', e => {
        e.preventDefault();
        // Récupérer productId
        // Récupérer quantite
        // Récupérer color
        // Faire object et le mettre dans le localStorage
        const quantity = document.querySelector('#quantity').valueAsNumber;
        const color = document.querySelector("#colors").value;
        if(quantity < 1 || quantity > 100) {
            alert('Veuillez choisir une quantité comprise entre 1 et 100');
            return;
        } 
        if(!color) {
            alert('Veuillez choisir une couleur');
            return;
        }

        let productsInLocalStorage = JSON.parse( localStorage.getItem('products'));
        if(!productsInLocalStorage) productsInLocalStorage = [];
        // productsInLocalStorage est un tableau dans tous les cas !
        const index = productsInLocalStorage.findIndex(productInLocalStorage => productInLocalStorage._id === productId && productInLocalStorage.color === color);
        if(index === -1) {
            // Je dois ajouter mon élément dans le tableau
           const productObject = formatProduct(productId, color, quantity );
           productsInLocalStorage.push(productObject);

        } else {
            if (productsInLocalStorage[index].quantity + quantity > 100) {
                productsInLocalStorage[index].quantity = productsInLocalStorage[index].quantity + quantity;
                alert('La quantité est depasser');
                return;
} 
productsInLocalStorage[index].quantity = productsInLocalStorage[index].quantity + quantity;
}
// Je sauvegarde productsInLocalStorage dans mon localStorage
    
        // Je sauvegarde productsInLocalStorage dans mon localStorage
        saveLocalStorage(productsInLocalStorage);
        alert('Le canapé a été ajouter au panier ');
    });
}

addToCart();


// Il faut mettre en place un listener
// Object dans le localStorage => { _id: PRODUCT_ID, color: PRODUCT_COLOR, quantite: PRODUCT_QUANTITE } -> UN ELEMENT DANS LOCALSTORAGE
// localStorage => [{ _id: PRODUCT_ID, color: PRODUCT_COLOR, quantite: PRODUCT_QUANTITE }] ==> Tableau de éléments

function formatProduct(productId, productColor, productQuantite) {
   let product = {
        _id: productId,
        color: productColor,
        quantity: productQuantite
    };
    return product;
}

function saveLocalStorage(productsInLocalStorage) {
    localStorage.setItem('products', JSON.stringify(productsInLocalStorage));
}

