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

submitButton.addEventListener("submit", () => {
  checkName()
  checkAddress()
  checkCity()
  checkEmail()

})

let xhr = new XMLHttpRequest();
xhr.open("POST", "http://localhost:3000/api/products/order/");

xhr.setRequestHeader("Accept", "application/json");
xhr.setRequestHeader("Content-Type", "application/json");

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

let data = {
    contact: {
      firstName : firstNameInput.value, 
      lastName: lastNameInput.value, 
      address: adressInput.value, 
      city: cityInput.value, 
      email : emailInput.value
    }, 
    products : [getAllProductId] 

};

xhr.send(data);




