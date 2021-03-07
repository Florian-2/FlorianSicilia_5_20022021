const url = `http://localhost:3000/api/cameras`;

fetch(url)
.then(response => 
{
    if (response.ok === false) 
    {
        tagHtml("h3", `La requête a échoué (status requête : ${response.status})`, "#appareil");
        document.querySelector('h3').style.fontSize = "35px";
        return;
    }
    
    response.json().then(data => 
    {
        let containerCard = document.querySelector('.conteneur-grid');

        data.forEach(descProduc => 
        {
            containerCard.innerHTML += `<div class="carte">
            
                                            <a href="./produit.html?id=${descProduc._id}">
                                                <div class="conteneur-img">
                                                    <img src="${descProduc.imageUrl}">
                                                </div>
                                    
                                                <div class="conteneur-texte">
                                                    <h3>${descProduc.name}</h3>
                                                    <p>${descProduc.price} €</p>
                                                </div>
                                            </a>
                                            
                                        </div>`;
        });
    })
    
})
.catch(err => console.log("Erreur" + err));


/*
const getCameras = async function() 
{
    const response = await fetch(url); 

    if (response.ok) 
    {
        const data = await response.json();

        let containerCard = document.querySelector('.conteneur-grid');

        data.forEach(descProduc => 
        {
            containerCard.innerHTML += `<div class="carte">
            
                                            <a href="./produit.html?id=${descProduc._id}">
                                                <div class="conteneur-img">
                                                    <img src="${descProduc.imageUrl}">
                                                </div>
                                    
                                                <div class="conteneur-texte">
                                                    <h3>${descProduc.name}</h3>
                                                    <p>${descProduc.price} €</p>
                                                </div>
                                            </a>
                                            
                                        </div>`;
        });
    } 
    else 
    {
        console.log(`Status de la requête : ${response.status}`);
    }  
};

getCameras();
*/
