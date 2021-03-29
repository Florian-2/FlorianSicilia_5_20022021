const searchParams = new URLSearchParams(window.location.search);

// Récupérer les paramètres GET de l'url
const searchOrderIDr = searchParams.has('inputOrderId');
const searchPrice = searchParams.has('inputPrice');
const searchFirstName = searchParams.has('prenom');

if (!searchOrderIDr || !searchPrice || !searchFirstName) 
{
    window.location.href = "index.html"
}
else
{
    const orderID = searchParams.get('inputOrderId');
    const price = searchParams.get('inputPrice');
    const firstName = searchParams.get('prenom');

    // Ajoute les valeurs des paramètres dans différentes balises HTML
    const displayOrderID = document.getElementById('ID');
    const displayPrice = document.getElementById('prix');
    const displayFirstName = document.getElementById('prenom');
    displayOrderID.innerHTML = orderID;
    displayPrice.innerHTML = price;
    displayFirstName.innerHTML = firstName;

    const panier = localStorage.getItem('panier');

    if (panier) 
    {
        localStorage.removeItem('panier');
    }  
}
