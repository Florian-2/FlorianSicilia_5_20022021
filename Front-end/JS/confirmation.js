const searchParams = new URLSearchParams(window.location.search);

searchParams.has('inputOrderId');
searchParams.has('inputPrice');
searchParams.has('prenom');
const orderID = searchParams.get('inputOrderId');
const price = searchParams.get('inputPrice');
const firstName = searchParams.get('prenom');

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