// Index.html page 

let items = document.querySelector(".items")

const path = window.location.pathname 
const productTemplateUrl = path.substring(0, path.indexOf("html")) + "html/product.html"



function createImg(object){
    let img = document.createElement("img")
    img.setAttribute("src", object.imageUrl)
    img.setAttribute("alt", object.name)
    return img
}

function createLink(object){
    let link = document.createElement("a")
    link.setAttribute("href", productTemplateUrl + `?id=${object._id}`)          
    link.setAttribute("id", object._id) 
    return link
}

// create an article element with img / h3 / p as child 

function createItem(object){
    let article = document.createElement("article")
    
    let img = createImg(object); 
    
    let link = createLink(object)

    let h3 = document.createElement("h3")
    link.textContent = object.name
    h3.appendChild(link)
    
    let p = document.createElement("p")
    p.textContent = object.description
    
    article.appendChild(img) ; article.appendChild(h3); article.appendChild(p); 
    
    return article 

}    


 fetch("http://localhost:3000/api/products")
    .then(element => element.json())
    .then (element => {
        element.map( (element) => {
            let article = createItem(element) // we pass the article object to create corresponding article as a HTML dom element 
            items.appendChild(article)
        })

    })
     

