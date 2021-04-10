const container_card = document.querySelector(".container_panier");

// Prix total des articles du panier
const totalPrice = (product) =>
{
    let count = 0;

    product.forEach(element => 
    {
        count += element.totalPrice;
    });
    
    const displayPrice = document.createElement('p');
    displayPrice.classList.add('price');
    displayPrice.innerHTML = `Prix : <span id="price">${count}</span>€`;
    container_card.appendChild(displayPrice);
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

// Créer le tableau products qui sera envoyé au back-end par la suite
let products = [];
const arrProducts = (storage) =>
{
    for (let i = 0; i < storage.length; i++)
    {
        products.push(storage[i].id);
    };
    return products;
}

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

    arrProducts(productStorage); // Renvoie un tableau contenant les produits du panier
    totalPrice(productStorage); // Prix total
    removeItems(); // Bouton pour vider le panier
}
else
{
    tagHtml("h3", "Votre panier est vide", ".container_panier");
    document.querySelector('h3').style.fontSize = "25px";
}

// Formulaire
/*
    Fonctionnement de la validation du formulaire :

    Pour la validation des champs il existe 2 fonctions (error et success), ces fonctions servent uniquement à gérer les indications visuel grâce à un code couleur et des icons.
    Pour les RegExp il existe 3 fonctions (regExpNumber, regExpEmail, regExpScript), ces fonctions sont là pour gérer les valeurs des champs (email valide ou non ? etc...)
    Si la valeur du champ est valide alors sa valeur sera stocker dans l'objet "contact", si toutes les valeurs sont valides et que le panier n'est pas vide alors le formulaire sera envoyer au back-end
*/
const form = document.getElementById('form');
// "contact" Objet qui va contenir les données du formulaire
let contact = {}; 

form.addEventListener('submit', (e) =>
{
    e.preventDefault();
    checkInput();

    if (checkInput() == true) 
    { 
        if (!products.length < 1) 
        {
            let forms = {contact, products};
            fetchPost(forms);
        } 
    }
});

// Envoi les données (articles, formulaire) au serveur
const fetchPost = (forms) =>
{
    const options = 
    {
        method : "POST",
        headers : 
        { 
            'Accept': 'application/json',
            'Content-Type' : 'application/json' 
        },
        body : JSON.stringify(forms)
    }

    fetch("http://localhost:3000/api/cameras/order", options)
    .then(response => response.json())
    .then(data => 
        {
            // Récupère l'identifiant et le prix de la commande qui seront transmis via l'URL
            const inputOrderID = document.querySelector('input[name="inputOrderId"]');
            const inputPrice = document.querySelector('input[name="inputPrice"]');
            let priceTotal = document.getElementById('price').textContent;
            priceTotal = Number(priceTotal);

            inputOrderID.value = data.orderId;
            inputPrice.value = priceTotal;

            form.submit();
        })
};

// Vérifie les données saisie par l'utilisateur
const checkInput = () =>
{
    const prenom = form.prenom.value.trim();
    const nom = form.nom.value.trim();
    const adresse = form.adresse.value.trim();
    const ville = form.ville.value.trim();
    const email = form.email.value.trim();

    // Vérifie le prénom
    const checkFirstName = () =>
    {
        if (prenom === "") {
            error(form.prenom, "Renseigner votre prénom");
        } else if(regExpNumber(prenom)) {
            error(form.prenom, "Ce champ ne peut pas contenir de chiffre");
        } else if(!regExpScript(prenom)) {
            error(form.prenom, "Script détecter");
        } else {
            contact['firstName'] = prenom;
            success(form.prenom);
            return true;
        } 
    }
    checkFirstName();

    // Vérifie le Nom
    const checkLastName = () =>
    {
        if (nom === "") {
            error(form.nom, "Renseigner votre nom");
        } else if(regExpNumber(nom)) {
            error(form.nom, "Ce champ ne peut pas contenir de chiffre");
        } else if(!regExpScript(nom)) {
            error(form.nom, "Script détecter");
        } else {
            contact['lastName'] = nom;
            success(form.nom);
            return true;
        }
    }
    checkLastName();

    // Vérifie l'adresse postal 
    const checkAddress = () =>
    {
        if (adresse === "") {
            error(form.adresse, "Renseigner votre adresse postale")
        } else if(!regExpNumber(adresse)) {
            error(form.adresse, "Renseigner votre numéro, exemple : <strong>24</strong> rue Albert duc");
        } else if(!regExpScript(adresse)) {
            error(form.adresse, "Script détecter");
        } else {
            contact['address'] = adresse;
            success(form.adresse);
            return true;
        }
    }
    checkAddress();

    // Vérifie la ville
    const checkCity = () =>
    {
        if (ville === "") {
            error(form.ville, "Renseigner votre ville");
        } else if(regExpNumber(ville)){
            error(form.ville, "Ce champ ne peut pas contenir de chiffre");
        } else if(!regExpScript(ville)) {
            error(form.ville, "Script détecter");
        } else {
            contact["city"] = ville;
            success(form.ville);
            return true;
        }
    }
    checkCity();

    // Vérifie l'adresse email
    const checkEmail = () =>
    {
        if (email === "") {
            error(form.email, "Renseigner votre adresse email");
        } else if(!regExpEmail(email)){
            error(form.email, "Adresse email invalide, format pris en charge : <b>prenom@exemple.com</b>");
        } else if(!regExpScript(email)) {
            error(form.email, "Script détecter");
        } else {
            contact['email'] = email;
            success(form.email);
            return true;
        }
    }
    checkEmail();

    // Retourne "true" si les données du formulaire sont valide
    if (checkFirstName() == true && checkLastName() == true && checkAddress() == true && checkCity() == true && checkEmail() == true)
    {
        return true;
    }  
}

// Gère l'affichage des erreurs
const error = (input, message) =>
{
    const formControl = input.parentElement;
    const smallError = formControl.querySelector('small');

    smallError.innerHTML = message;

    formControl.className = "form-control error";
};

// Gère l'affichage de la validation des informations
const success = (input) =>
{
    const formControl = input.parentElement;
    formControl.className = "form-control success";
};

// Expression régulière (3)
const regExpNumber = (input) =>
{
    const re = /[0-9]/.test(input); 
    return re;
};

const regExpEmail = (email) =>
{
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);
    return re;
};

const regExpScript = (inputScript) =>
{
    const re = /^[^\\\/&]*$/.test(inputScript);
    return re;
};