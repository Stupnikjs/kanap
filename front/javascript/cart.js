const cart__item = "cart__item"

const section = document.querySelector('#cart__items')

const storage = localStorage

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
    return article
}

const createCartItemContent = () => {
    const cart = document.createElement("div")
    cart.classList.add("cart__item__content")
    return cart
}

const createSettingsQuantity = (storage) => {
    const quantity = document.createElement("div")
    quantity.classList.add("cart__item__content__settings__quantity")
    const pQuantity = document.createElement("p")
    pQuantity.innerHTML = "Qté :"
    const inputQuantity = createInputQuantity(storage)
    quantity.appendChild(pQuantity)
    quantity.appendChild(inputQuantity)
    return quantity
}

const createSettingsDelete = (article) => {
    const settingsDelete = document.createElement("div")
    settingsDelete.classList.add("cart__item__content__settings__delete")
    const pDelete = document.createElement("p")
    pDelete.classList.add("deleteItem")
    pDelete.innerHTML = "Supprimer"

    pDelete.addEventListener("click", () => {
        
        section.removeChild(article)
    })
    settingsDelete.appendChild(pDelete)
    return settingsDelete

}


const createCartItemContentSettings = (article, storage) => {
    
    const settings = document.createElement("div")
    settings.classList.add("cart__item__content__settings")
    
    const quantity = createSettingsQuantity(storage)
    settings.appendChild(quantity)

    const deleteSettings = createSettingsDelete(article)
    settings.appendChild(deleteSettings)

    return settings

}


const createInputQuantity = (storage) => {
    const input = document.createElement("input")
    input.classList.add("itemQuantity")
    input.setAttribute("name", "itemQuantity")
    input.setAttribute("type", "number")
    input.setAttribute("min", "1")
    input.setAttribute("max", "100")
    input.setAttribute("value", storage.split(" ")[0] ) // 
    return input
}


const createH2 = (product) => {
    const h2 = document.createElement("h2")
    h2.innerHTML = product.name
    return h2
}
const createPcolorPprice = (product, color__index) => {
    const pColor = document.createElement("p") 
    pColor.innerHTML = product.colors[color__index]
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
const createKanapElements = (product, color__index, storage) => {
 
 const div_img = createDiv_img(product)
 
 const article = createArticle(product, color__index)

 const cart__item__content = createCartItemContent()

 const cart_settings = createCartItemContentSettings(article, storage)  // reduire a 2 paramettres

 const description = createDescription(product, color__index)
 cart__item__content.appendChild(description)
 cart__item__content.appendChild(cart_settings)


 article.appendChild(div_img)
 article.appendChild(cart__item__content)
 
 return article 

}



const checkLocalStorage = (id) => {
    const storage__id = localStorage.getItem(id)
    if ( storage__id === undefined || storage__id === NaN) return "0"
    else return storage__id
}

async function getProducts(){
  let data = await fetch("http://localhost:3000/api/products")
  return await data.json()
}

async function renderProducts(){
    let products = await getProducts()
    products.forEach( product => {
        if (checkLocalStorage(product._id)!= null){
            let storage = localStorage.getItem(product._id)
            console.log(storage)
            let color__index = storage.split(" ")[1]
            section.appendChild(createKanapElements(product, color__index, storage))
        } 
    })
}



renderProducts()