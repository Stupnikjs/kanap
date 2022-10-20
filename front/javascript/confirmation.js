const url = window.location.href ; 
const index =  url.indexOf("?orderId=")

const confirmationId = document.querySelector("#orderId")
confirmationId.innerHTML = url.substring(index + "=?orderId".length)

console.log(index)

