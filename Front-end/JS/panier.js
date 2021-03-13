const container_card = document.querySelector(".container_panier");

// Fonction qui indique le prix total de la commande
const totalPrice = (product) =>
{
    let count = 0;

    product.forEach(element => 
    {
        count += element.totalPrice;
    });
    
    console.log(count);

    const btnRemoveCart = document.createElement('p');
    btnRemoveCart.innerHTML = `<strong>Prix : ${count}€</strong>`;
    container_card.appendChild(btnRemoveCart);
};

// Vider le panier
const removeItems = () =>
{
    const btnRemoveCart = document.createElement('button');
    btnRemoveCart.textContent = "Vider le panier"
    btnRemoveCart.classList.add('btnSupprimer');
    container_card.appendChild(btnRemoveCart);    
    
    const btnRemoveAllItem = document.querySelector('.btnSupprimer');

    btnRemoveAllItem.addEventListener('click', () =>
    {
        localStorage.removeItem('panier');
        location.reload();
    });
};

// Parcourir le tableau d'objets contenant les produits pour ensuite les afficher dans le panier
if (localStorage.getItem("panier")) 
{
    const productStorage = JSON.parse(localStorage.getItem("panier"));
  
    productStorage.forEach(element => 
    {
        container_card.innerHTML += `<div class="carte">
                                        <p>${element.name}</p>
                                        <p>${element.price}€</p>
                                        <p>x ${element.quantity}</p>
                                    </div>`;
    });

    totalPrice(productStorage); // Prix total
    removeItems(); // Btn pour vider le panier
}
else
{
    tagHtml("h3", "Votre panier est vide", ".container_panier");
    document.querySelector('h3').style.fontSize = "25px";
}
