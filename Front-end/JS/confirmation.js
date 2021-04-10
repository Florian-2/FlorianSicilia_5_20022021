const searchParams = new URLSearchParams(window.location.search);

// Vérifie que les paramètre rechercher sont bien présent dans l'URL
const searchOrderIDr = searchParams.has('inputOrderId');
const searchPrice = searchParams.has('inputPrice');
const searchFirstName = searchParams.has('prenom');

// Si les données rechercher ne sont pas présente, une redirection vers la page d'accueil est effectué
if (!searchOrderIDr || !searchPrice || !searchFirstName) 
{
    window.location.href = "index.html"
}
else // Si tout est OK les paramètre rechercher est récupérer et est affichés dans la page
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

    //  Suppression des articles du panier
    const panier = localStorage.getItem('panier');

    if (panier) 
    {
        localStorage.removeItem('panier');
    }  
}
