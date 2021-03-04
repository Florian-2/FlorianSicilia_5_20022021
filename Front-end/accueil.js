const url = `http://localhost:3000/api/cameras`;
// 
const getCameras = async function() 
{
    try 
    {
        let response = await fetch(url); 
    
        if (response.ok) 
        {
            const data = await response.json();
            let containerCard = document.querySelector('.conteneur-grid');

            data.forEach(descProduc => 
            {
                containerCard.innerHTML += `<div class="carte">

                                                <a href="http://localhost:3000/api/cameras/${descProduc._id}">
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
    } 
    catch (error) 
    {
        console.log(error);
    }
    
};

getCameras();