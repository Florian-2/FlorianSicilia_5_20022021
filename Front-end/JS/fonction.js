const messErrRequest = () => 
{
    tagHtml("h3", `La requête a échoué (status requête : ${response.status})`, "#appareil");
    document.querySelector('h3').style.fontSize = "35px";
    return;
}

const tagHtml = (tag, content, selectPosition, place) =>
{
    let element1 = document.createElement(tag);
    element1.innerHTML = content;
    let tagPosition = document.querySelector(selectPosition);

    if (place == "avant") 
    {
        tagPosition.prepend(element1);
    }
    else 
    {
        tagPosition.append(element1);
    }
}