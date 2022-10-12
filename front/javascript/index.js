let items = document.querySelector(".items")

const path = window.location.pathname 
const productTemplateUrl = path.substring(0, path.indexOf("html")) + "html/product.html"



// document.querySelector("body").innerHTML = await loadPage("http://127.0.0.1:5500/front/html/product.html")

function createItem(object){
    let article = document.createElement("article")
    let img = document.createElement("img")
    img.setAttribute("src", object.imageUrl)
    img.setAttribute("alt", object.name)
    let link = document.createElement("a")
    link.setAttribute("href", productTemplateUrl + `?id=${object._id}`)          
    link.setAttribute("id", object._id)
    let h3 = document.createElement("h3")
    link.textContent = object.name
    h3.appendChild(link)
    let p = document.createElement("p")
    p.textContent = object.description
    article.appendChild(img)
    article.appendChild(h3)
    article.appendChild(p)
    return article 

}    


 fetch("http://localhost:3000/api/products")
    .then(element => element.json())
    .then (element => {
        element.map( (element) => {
            let article = createItem(element)
            items.appendChild(article)
        })

    })
     

