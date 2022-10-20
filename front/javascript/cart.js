
// cart.html 


const cart__item = "cart__item"

const section = document.querySelector('#cart__items')
const cart_price = document.querySelector(".cart_price")
const totalQuantity = document.querySelector("#totalQuantity")
const totalPrice = document.querySelector("#totalPrice")
const storage = localStorage


function updateTotal(deletedElement){

    let price = deletedElement.getAttribute("price") 
    let quantity = deletedElement.querySelector(".itemQuantity").value
    let priceBefore = parseInt(totalPrice.innerHTML)
    let quantityBefore = parseInt(totalQuantity.innerHTML) 
    totalPrice.innerHTML =  priceBefore - (parseInt(price) * parseInt(quantity))
    totalQuantity.innerHTML = quantityBefore - parseInt(quantity)
    
}






const createDiv_img = (product) => {
    const div_img = document.createElement("div")
    div_img.classList.add("cart__item__img")

    const img = document.createElement("img")
    img.setAttribute("alt", "Photographie d'un canapé")
    img.setAttribute("src", product.imageUrl)
    
    div_img.appendChild(img)
    return div_img
}

const createArticle = (product, color__index) => {

    const article = document.createElement("article")
    article.classList.add("cart__item")
    article.setAttribute("data-id", product._id )
    article.setAttribute("data-color", product.colors[color__index])
    article.setAttribute("price", product.price)
    
    return article
}

const createCartItemContent = () => {

    const cart = document.createElement("div")
    cart.classList.add("cart__item__content")
    return cart
    
}

const createSettingsQuantity = (product, color__index, storage) => {
    
    const quantity = document.createElement("div")
    quantity.classList.add("cart__item__content__settings__quantity")
    
    const pQuantity = document.createElement("p")
    pQuantity.innerHTML = "Qté :"
    
    const inputQuantity = createInputQuantity(product, color__index, storage)
    
    quantity.appendChild(pQuantity)
    quantity.appendChild(inputQuantity)
    
    return quantity
}


const createSettingsDelete = (article, color__index) => {
    const settingsDelete = document.createElement("div")
    settingsDelete.classList.add("cart__item__content__settings__delete")
    const pDelete = document.createElement("p")
    pDelete.classList.add("deleteItem")
    pDelete.innerHTML = "Supprimer"

    pDelete.addEventListener("click", () => {
        console.log(`createSettingsDelete ${color__index}`)
        
      localStorage.removeItem(color__index + article.getAttribute("data-id"))
        
      section.removeChild(article)
      updateTotal(article)



    })
    settingsDelete.appendChild(pDelete)
    return settingsDelete

}


const createCartItemContentSettings = (article, product, color__index, storage) => {
    
    const settings = document.createElement("div")
    settings.classList.add("cart__item__content__settings")
    
    const quantity = createSettingsQuantity(product, color__index, storage)
    settings.appendChild(quantity)
    console.log(`createCartItemContentSettings ${color__index}`)
    const deleteSettings = createSettingsDelete(article, color__index)
    settings.appendChild(deleteSettings)

    return settings

}




const createInputQuantity = (product, color__index, storage) => {
    const input = document.createElement("input")
    input.classList.add("itemQuantity")
    input.setAttribute("name", "itemQuantity") ; input.setAttribute("type", "number"); input.setAttribute("min", "1") ; input.setAttribute("max", "100"); 
    input.setAttribute("value", storage ) 
   
    // modify the local storage quantity of element for the correponding product in cart 
    input.addEventListener("change", (e) => {
        localStorage.setItem(color__index + product._id,  e.target.value) 
    }) 
 
    return input
}


const createH2 = (product) => {
    const h2 = document.createElement("h2")
    h2.innerHTML = product.name
    return h2
}

const createPcolorPprice = (product, color__index) => {
    const pColor = document.createElement("p") 
    pColor.innerHTML = product.colors[color__index-1]
    const pPrice = document.createElement("p")
    pPrice.innerHTML = product.price + " €"
    return [pColor, pPrice]
}

const createDescription = (product, color__index) => {

    const h2 = createH2(product)
    const description = document.createElement("div")
    const [pColor, pPrice] = createPcolorPprice(product, color__index)
    description.classList.add("cart__item__content__description")
    description.appendChild(h2)
    description.appendChild(pColor)
    description.appendChild(pPrice)
    return description
}



/* create all the html elements in the article 
* with attribute corresponding to the product and color chosed 
*
*/

const createKanapElements = (product, color__index, storage) => {
 

 const div_img = createDiv_img(product)
 
 const article = createArticle(product, color__index)

 const cart__item__content = createCartItemContent()

 const cart_settings = createCartItemContentSettings(article, product, color__index, storage)  // reduire a 2 paramettres

 const description = createDescription(product, color__index)
 cart__item__content.appendChild(description)
 cart__item__content.appendChild(cart_settings)


 article.appendChild(div_img)
 article.appendChild(cart__item__content)
 
 return article 

}


// returns a array of colors chosen of for the id of the article 

const checkColor = (id) => {
    let colors = []
    // loop from 0 to 4 to find element in localstore with first number being color index 
    for (var i = 0 ; i < 5; i++){
        const storage__id = localStorage.getItem(i.toString() + id)
        if (storage__id != null ) colors.push(i)
    }
    return colors
    // colors is an array of the index of color of the element 
}


async function getProducts(){
  let data = await fetch("http://localhost:3000/api/products")
  return await data.json()
}


async function renderProducts(){
    let products = await getProducts()
    let totQuantity = 0
    let totPrice = 0

    // loop over every article 

    products.forEach( product => {
            let colors = checkColor(product._id)
            if (colors.length > 0) {

            // loop over the color found in local storage 

            for ( var j = 0 ; j < colors.length ; j++){

                let storage = localStorage.getItem(colors[j] + product._id)
               
                if (storage > 0 || typeof(storage) === "string" ) {

                    // increment totals 
                    totQuantity += parseInt(storage) 
                    totPrice += parseInt(storage * product.price)

                }
                
                section.appendChild(createKanapElements(product, colors[j], storage))
            
            }   // end of for loop 
            
        }}    
            
        )
        totalQuantity.innerHTML = totQuantity
        totalPrice.innerHTML = totPrice
        } 
 


console.log(localStorage)
renderProducts()