const CartNumber = document.querySelector(".CartNumber")
let value = JSON.parse(localStorage.getItem('data')) || [];

 
let calculation = () => {
    CartNumber.innerHTML = value.map(x => x.item).reduce((x,y) => x+y,0)
 }
 
 calculation()