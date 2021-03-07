/*
    <div class="conteneur-produit">
        <div class="conteneur-img">
            <img src="vcam_2.jpg" alt="">
        </div>
        
        <div class="conteneur-texte-produit">
            <h3>Du texte</h3>
            <p>200€</p>
        </div>
    </div>

    <div class="conteneur-form">
        <select name="personnalisation">
            <option>Option 1</option>
            <option>Option 2</option>
            <option>Option 3</option>
        </select>

        <form action="" method="POST">
            <input type="number" id="quantiter" name="quantiter" min="1" max="200" required>
            <input type="submit" value="Ajouter au panier">
        </form>
    </div>
*/

let getUrl = window.location.search;
let url = `http://localhost:3000/api/cameras/${getUrl.substring(4, getUrl.length)}`;


fetch(url)
.then(reponse => 
{
    if (reponse.ok === false) 
    {
        tagHtml("h3", `La requête a échoué (status requête : ${response.status})`, "#appareil");
        document.querySelector('h3').style.fontSize = "35px";
        return;
    }
    
    reponse.json().then(data => 
    {
        if (typeof data.imageUrl === 'undefined')
        {
            tagHtml("h1", "Erreur, vous devez d'abord sélectionner un produit sur la page d'accueil", "main", "avant");
            document.querySelector('h1').classList.add("erreur");
            document.querySelector('.conteneur-form').style.display = 'none';
            return;
        }

        let divGrid = document.querySelector('.conteneur-produit');
        
        divGrid.innerHTML += `<div class="conteneur-produit">
                                <div class="conteneur-img">
                                    <img src="${data.imageUrl}">
                                </div>
                                
                                <div class="conteneur-texte-produit">
                                    <h3>${data.name}</h3>
                                    <p>${data.description}</p>
                                    <p>${data.price} €</p>
                                </div>
                            </div>`;

        document.querySelector('.conteneur-grid').prepend(divGrid);

        let createSelect = document.createElement('select');
        document.querySelector('.conteneur-form').prepend(createSelect);

        let select = document.querySelector('.conteneur-form select');

        data.lenses.forEach(element => 
        {
            let option = document.createElement('option');
            option.value = `${element}`;
            option.innerHTML = `${element}`;
            select.appendChild(option);
        }); 
    })
    
})
.catch(err => 
{
    console.log("Erreur" + err.message + err.lineNumber);
});
