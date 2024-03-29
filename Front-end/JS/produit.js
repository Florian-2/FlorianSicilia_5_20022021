const params = new URLSearchParams(window.location.search);
const getParamId = params.get('id');

let url = `http://localhost:3000/api/cameras/${getParamId}`;

// Affichage des données pour le produit sélectionné
fetch(url)
.then(reponse => 
{
    if (reponse.ok === false) // Gère les requêtes qui ont échoué
    {
        tagHtml("h3", `La requête a échoué (status requête : ${reponse.status})`, "main");
        document.querySelector('h3').classList.add("erreur");
        document.querySelector('.conteneur-form').style.display = 'none';
        return;
    }
    
    reponse.json().then(data => // Récupère les données de l'API 
    {
        console.log(data);

        if (typeof data.imageUrl === 'undefined' && typeof data.name === 'undefined')
        {
            tagHtml("h1", "Erreur, vous devez d'abord sélectionner un produit sur la page d'accueil", "main", "avant");
            document.querySelector('h1').classList.add("erreur");
            document.querySelector('.conteneur-form').style.display = 'none';
            return;
        }

        let divGrid = document.querySelector('.conteneur-produit');

        // Boucle sur les données reçu pour générer des cartes HTML
        divGrid.innerHTML += `<div class="conteneur-produit">
                                <div class="conteneur-img">
                                    <img src="${data.imageUrl}">
                                </div>
                                
                                <div class="conteneur-texte-produit">
                                    <h3 id="nom_produit">${data.name}</h3>
                                    <p>${data.description}</p>
                                    <p id="prix">${data.price / 100} €</p>
                                </div>
                            </div>`;

        document.querySelector('.conteneur-grid').prepend(divGrid);

        let createSelect = document.createElement('select');
        document.querySelector('.conteneur-form').prepend(createSelect);

        let select = document.querySelector('.conteneur-form select');

        // Affiche les options disponible pour le produit en question
        data.lenses.forEach(element => 
        {
            let option = document.createElement('option');
            option.value = `${element}`;
            option.innerHTML = `${element}`;
            select.appendChild(option);
        }); 
        
        storage();
    })
})
.catch(error => 
{
    tagHtml("h1", "Une erreur est survenue", "main", "avant");
    document.querySelector('h1').classList.add("erreur");
    document.querySelector('.conteneur-form').style.display = 'none';
    console.log(error);
});


// LocalStorage
const storage = () => 
{
    const btnStorage = document.querySelector("input[type=button]");
    const inputQuantity = document.querySelector("input[type=number]");
    const nameProduct = document.getElementById("nom_produit");
    const priceProduct = parseInt(document.getElementById("prix").textContent);
    const small = document.getElementById("mess_err");

    // Ajout du produit dans le localStorage au clique du bouton "Ajouter"
    btnStorage.addEventListener('click', () =>
    {
        // Vérifie la quantité choisi par l'utilisateur
        if (inputQuantity.value == "" || inputQuantity.value <= 0 || inputQuantity.value > 200) 
        {
            inputQuantity.style.borderColor = 'red';
            small.style.color = "red";
            small.textContent = "La quantité doit être supérieur à 1 et inférieur à 200";
        }
        else
        {
            inputQuantity.style.borderColor = 'silver';
            small.style.visibility = "hidden";

            // Récupère des infos concernant le produit
            let conversionInput = Number(inputQuantity.value); 

            let infoProduc =
            {
                id : getParamId,
                name : nameProduct.textContent,
                price : priceProduct,
                quantity : conversionInput,
                totalPrice : priceProduct * conversionInput
            }; 

            // Créer un tableau contenant les produits qui seront stocker dans localStorage
            let recup = JSON.parse(localStorage.getItem("panier"));
            
            if (recup) 
            {
                recup.push(infoProduc);
                localStorage.setItem("panier", JSON.stringify(recup));
            }
            else
            {
                let tab = [];
                tab.push(infoProduc);
                localStorage.setItem("panier", JSON.stringify(tab));
            }
        }
    });
}        
