const cart__order = document.querySelector(".cart__order")
const firstNameInput = cart__order.querySelector("#firstName")
const lastNameInput = cart__order.querySelector("#lastName")
const adressInput = cart__order.querySelector("#address")
const cityInput = cart__order.querySelector("#city")
const emailInput = cart__order.querySelector("#email")
const submitButton = cart__order.querySelector("#order")
const cart__order__form = cart__order.querySelector(".cart__order__form")



const errFirstName = document.querySelector("#firstNameErrorMsg")
const errLastName = document.querySelector("#lastNameErrorMsg")
const errAdress = document.querySelector("#addressErrorMsg")
const errCity = document.querySelector("#cityErrorMsg")
const errEmail = document.querySelector("#emailErrorMsg")



const onlyLetter = /^([a-zA-Z ]+)$/
const onlyLetterAndNumbers = /^([a-zA-Z0-9]+)$/
const emailReg = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/



function checkName(){
    let firstName = firstNameInput.value.match(onlyLetter)
    let lastName = lastNameInput.value.match(onlyLetter)
    
    if (!firstName) errFirstName.innerHTML = "Vous devez rentrer un nom valide" 
    if (!lastName) errLastName.innerHTML = "Vous devez rentrer un nom valide"

    if (firstName && lastName) return true 
    else return false
    
}

function checkAddress(){
  let address = adressInput.value.match(onlyLetterAndNumbers)
  if (!address) {errAdress.innerHTML = "Vous devez rentrer une adresse valide"; return false} 
  else return true 
  
}
function checkCity(){
  let city = cityInput.value.match(onlyLetter)
  if (!city) {errCity.innerHTML = "Vous devez rentrer un nom de ville valide"; return false}
  else return true 
}

function checkEmail(){
  let email = emailInput.value.match(emailReg)
  if (!email) {errEmail.innerHTML = "Vous devez rentrer un mail valide"; return false}
  else return true 
}

function onSubmit(){
  
  return [checkName(), checkAddress(), checkEmail(), checkCity()].every(element => element === true)
}


submitButton.addEventListener("click", () => {
  checkName()
  checkAddress()
  checkCity()
  checkEmail()
 
  let data = getData()
  let response = postData("http://localhost:3000/api/products/order", data)
  response
  .then( window.localStorage.clear())
  .then( data => 
    window.location.href = `http://127.0.0.1:5500/front/html/confirmation.html?orderId=${data.orderId}`)
      }
 )




async function postData(url = '', data) {
  // Default options are marked with *
  const response = await fetch(url, {
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, *cors, same-origin
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, *same-origin, omit
    headers: {
      'Content-Type': 'application/json'
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    redirect: 'follow', // manual, *follow, error
    referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    body: data // body data type must match "Content-Type" header
  });
  return response.json(); // parses JSON response into native JavaScript objects
}



/**
 *
 * Expects request to contain:
 * contact: {
 *   firstName: string,
 *   lastName: string,
 *   address: string,
 *   city: string,
 *   email: string
 * }
 * products: [string] <-- array of product _id
 *
 */
function getData(){
  let data = {
    contact: {
      firstName : firstNameInput.value, 
      lastName: lastNameInput.value, 
      address: adressInput.value, 
      city: cityInput.value, 
      email : emailInput.value
    }, 
    products : getAllProductId()

};
console.log(data)
return JSON.stringify(data)

}

function getAllProductId(){
  let products = document.querySelectorAll("article")
  let productsArray = Array.from(products)
  let productIDs = productsArray.map( element => {return element.getAttribute("data-id")})
  console.log(productIDs)
  return productIDs
}






