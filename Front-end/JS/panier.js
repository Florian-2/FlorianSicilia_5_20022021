/**
 *
 * Expects request to contain:
 * contact: {
 *   firstName: string,
 *   lastName: string,
 *   address: string,
 *   city: string,
 *   email: string
 * }
 * products: [string] <-- array of product _id
 *
 */

const container_card = document.querySelector(".container_panier");

// Prix total des articles du panier
const totalPrice = (product) =>
{
    let count = 0;

    product.forEach(element => 
    {
        count += element.totalPrice;
    });
    
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
const form = document.getElementById('form');
let contact = {};

form.addEventListener('submit', (e) =>
{
    e.preventDefault();
    checkInput();

    if (checkInput() == true) 
    { 
        if (!products.length < 1) 
        {
            let forms = {contact, products}
            console.log(forms);
            fetchPost(forms);
        } 
        else 
        {
            console.log("Aucun article");
        }
    } 
    else 
    {
        console.log("Fetch impossible");
    }
});

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
            const inputOrderID = document.getElementById('inputOrderId'); // input hidden
            inputOrderID.value = data.orderId;

            console.log(inputOrderID.value); // Affiche : b37a8cd0-8679-11eb-83f6-bbc516e752f7
            
            console.log(data); // Affiche un objet contenant un objet 'contact', un tableau 'products' et l'orderID

            console.log(data.contact.firstName); // Affiche le prénom saisie dans le formulaire

            form.submit();
        })
}






const checkInput = () =>
{
    const prenom = form.prenom.value.trim();
    const nom = form.nom.value.trim();
    const adresse = form.adresse.value.trim();
    const ville = form.ville.value.trim();
    const email = form.email.value.trim();

    const checkFirstName = () =>
    {
        if (prenom === "") {
            error(form.prenom, "Renseigner votre prénom");
        } else if(regExpNumber(prenom)) {
            error(form.prenom, "Ce champ ne peut pas contenir de chiffre");
        } else {
            contact['firstName'] = prenom;
            success(form.prenom);
            return true;
        } 
    }
    checkFirstName()

    const checkLastName = () =>
    {
        if (nom === "") {
            error(form.nom, "Renseigner votre nom");
        } else if(regExpNumber(nom)) {
            error(form.nom, "Ce champ ne peut pas contenir de chiffre");
        } else {
            contact['lastName'] = nom;
            success(form.nom);
            return true;
        }
    }
    checkLastName() 

    const checkAddress = () =>
    {
        if (adresse === "") {
            error(form.adresse, "Renseigner votre adresse postale")
        } else if(!regExpNumber(adresse)) {
            error(form.adresse, "Renseigner votre numéro, exemple : <strong>24</strong> rue Albert duc");
        } else {
            contact['address'] = adresse;
            success(form.adresse);
            return true;
        }
    }
    checkAddress()

    const checkCity = () =>
    {
        if (ville === "") {
            error(form.ville, "Renseigner votre ville");
        } else if(regExpNumber(ville)){
            error(form.ville, "Ce champ ne peut pas contenir de chiffre");
        } else {
            contact["city"] = ville;
            success(form.ville);
            return true;
        }
    }
    checkCity();

    const checkEmail = () =>
    {
        if (email === "") {
            error(form.email, "Renseigner votre adresse email");
        } else if(!regExpEmail(email)){
            error(form.email, "Adresse email invalide, format pris en charge : prenom@exemple.com");
        } else {
            contact['email'] = email;
            success(form.email);
            return true;
        }
    }
    checkEmail();

    if (checkFirstName() == true && checkLastName() == true && checkAddress() == true && checkCity() == true && checkEmail() == true)
    {
        return true;
    }  
}

const error = (input, message) =>
{
    const formControl = input.parentElement;
    const smallError = formControl.querySelector('small');

    smallError.innerHTML = message;

    formControl.className = "form-control error";
}

const success = (input) =>
{
    const formControl = input.parentElement;
    formControl.className = "form-control success";
};

const regExpNumber = (input) =>
{
    const re = /[0-9]/.test(input); 
    return re;
}

const regExpEmail = (email) =>
{
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);
    return re;
};