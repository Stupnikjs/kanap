const url = window.location.href ; 
const index =  url.indexOf("id=")
const id = url.substring(index + 3)

const item__content__ = ".item__content__"

const item__img__div = document.querySelector(".item__img")
const item__img = document.createElement("img")
item__img__div.appendChild(item__img)

const titlePrice = document.querySelector( item__content__ + "titlePrice")


const h1__titlePrice = titlePrice.querySelector("h1")
const span__titlePrice = titlePrice.querySelector("span")
const descriptionDiv = document.querySelector(item__content__ + "description")
const description = descriptionDiv.querySelector("#description")


const item__content__settings = document.querySelector(item__content__ + "settings")
const selectColor = item__content__settings.querySelector("#colors")

const quantity = document.querySelector("#quantity")

const addToCart = document.querySelector("#addToCart")




// au click ajoute l'objet qui represente le canapé au localstorage

const mapOptions = (select, arrayColor) => {
   arrayColor.map( elmt => {
      let option = document.createElement("option")
      option.setAttribute("value", elmt)
      option.innerHTML = elmt;  
      select.appendChild(option)  
   })
}
 


fetch(`http://127.0.0.1:3000/api/products/${id}`)
    .then(data => data.json())
    .then( data => {
      
       h1__titlePrice.innerHTML = data.name
       span__titlePrice.innerHTML = data.price 
       description.innerHTML = data.description
       item__img.setAttribute("src", data.imageUrl)
      
       mapOptions(selectColor, data.colors)
       
      addToCart.addEventListener("click", () => {
         let id_store = localStorage.getItem(data._id)
         let input_count = parseInt(quantity.value) 
        
         item = input_count.toString() + " " + selectColor.selectedIndex
         localStorage.setItem(data._id, item )
      })
    })
   

    setInterval(()=> {
      console.log(localStorage.length)
      console.log(localStorage)
    }, 5000)