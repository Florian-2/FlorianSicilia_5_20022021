const url = `http://localhost:3000/api/cameras`;

// Requête GET serveur, retourne les articles disponible à l'achat
fetch(url)
.then(response => 
{
    if (response.ok === false) // Gère les requêtes qui ont échoué
    {
        tagHtml("h3", `La requête a échoué (status requête : ${response.status})`, "#appareil");
        document.querySelector('h3').style.fontSize = "35px";
        return;
    }
    
    response.json().then(data => // Récupère les données de l'API
    {
        let containerCard = document.querySelector('.conteneur-grid');

        data.forEach(descProduc => // Boucle sur les données reçu pour généré des cartes HTML
        {
            containerCard.innerHTML += `<div class="carte">
            
                                            <a href="./produit.html?id=${descProduc._id}">
                                                <div class="conteneur-img">
                                                    <img src="${descProduc.imageUrl}">
                                                </div>
                                    
                                                <div class="conteneur-texte">
                                                    <h3>${descProduc.name}</h3>
                                                    <p>${descProduc.price / 100} €</p>
                                                </div>
                                            </a>
                                            
                                        </div>`;
        });
    })
    
})
.catch(err => console.log("Erreur" + err));