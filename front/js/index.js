// 1- Toutes mes variables sont en camel case --> const myVar, const totalPrice, const jeSuisAlain
// 2- Tous les noms de fonctions doivent etre explicites et le nom de la fonction doit définir ce qu'elle fait 
//  et elle ne doit faire que ce que son nom dit qu'elle fait --> function sumPrices()
// 3- Le nom d'une fonction commence par un  verbe d'action ! pour envoyer un email à un client mon nom de fonction sera : sendEmailToClient
// 4- INDENTATION !!!! Un code mal indenté est un code qui ne sera corrigé
// 5- Pas de code hors des fonctions
// 6- On code en ANGLAIS ou FRANGLAIS


// 3 functions minimum !
// 1- aller chercher les canapés
// 2- formater les canapés pour le html
// 3- afficher les canapés

function getProducts() {
    const products = fetch('http://localhost:3000/api/products/')
        .then(function (response) {
            return response.json();
        }).then(function (jsonResponse) {
            return jsonResponse;
        });
    return products;
}

function formatProducts(products) {
    // 1- je vais voir dans index.html le dom que je dois récupérer (const items = document.querySelector('#items');)
    // 2- je fais une boucle sur ma liste de produits (boucle for)
    // 3- je modifie le dom dans la boucle pour chaque produit
    const items = document.querySelector('#items');
    for(const product of products) {
        items.innerHTML += `<a href="./product.html?id=${product._id}">
        <article>
          <img src="${product.imageUrl}" alt="${product.altTxt}">
          <h3 class="productName">${product.name}</h3>
          <p class="productDescription">${product.description}</p>
        </article>
      </a>`;
    }
}

async function displayProducts() {
    const products = await getProducts();
    formatProducts(products);
}

displayProducts();

