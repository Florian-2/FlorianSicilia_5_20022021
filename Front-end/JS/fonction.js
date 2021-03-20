const tagHtml = (tag, content, selectPosition, place) =>
{
    const element1 = document.createElement(tag);
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