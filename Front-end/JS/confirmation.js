const searchParams = new URLSearchParams(window.location.search);

searchParams.has('inputOrderId');
searchParams.has('prenom');
const orderID = searchParams.get('inputOrderId');
const firstName = searchParams.get('prenom');

const displayOrderID = document.getElementById('ID');
const displayFirstName = document.getElementById('prenom');
displayOrderID.innerHTML = orderID;
displayFirstName.innerHTML = firstName;

const panier = localStorage.getItem('panier');

if (panier) 
{
    localStorage.removeItem('panier');
}
