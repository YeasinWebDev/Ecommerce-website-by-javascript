const CartNumber = document.querySelector(".CartNumber")
const totalPriceSection = document.querySelector(".totalPriceSection")
const totalprice = document.querySelector(".totalprice")
const templetSec = document.querySelector(".templetSec")
const totalSec = document.querySelector(".totalSec")
const empty = document.querySelector(".empty")
const item = document.querySelector(".item")
const quentity = document.querySelector(".qty")
const container = document.querySelector(".container")



let value = JSON.parse(localStorage.getItem('data')) || [];

 
let calculation = () => {
    CartNumber.innerHTML = value.map(x => x.item).reduce((x,y) => x+y,0)
 }
 
 calculation()

 let generateCart = () => {
    if(value.length !==0 ){
     return( totalSec.innerHTML = value.map(x => {
        let {id, item} = x
        let search = MenProductArray.find((y) => y.id === id) || []
        return `
        <div class="item">
                <div onclick ="remove('${id}')" class="remove"><i class="fa-solid fa-xmark"></i></div>
                <img src=${search.img} alt="">
                <div class="name"><div>Name</div> <div class="nameValue">${search.name}</div></div>
                <div class="price"><div>Price</div> ${search.price}</div>
                <div class="itemQuy">
                    <div onclick="decrement('${id}')" class="minus"><i class="fa-solid fa-minus"></i></div>
                    <div id=${id} class="quentity">${item}</div>
                    <div onclick="increment('${id}')" class="plus"><i class="fa-solid fa-plus"></i></div>
                </div>
                <div class="SubTotal"><div>SubTotal</div><div class="SubTotalValue">${item*parseFloat(search.price)}</div></div>
            </div>
        `
     }).join(""))
    }else{
        totalPriceSection.style.display = 'none'
        container.style.display = 'none'
        totalSec.style.display = 'none'
        empty.style.display = 'block'
        console.log(" empty")
        document.body.style.backgroundColor = "#F1EFE7"
    }
 }

 generateCart()


 let increment = (id) => { 
    let selectId = id
    let search = value.find(x => x.id === selectId)
    if(search === undefined){
        value.push({
            id:selectId,
            item:1
        })
    }else{
        search.item += 1
    }
    update(selectId)
    generateCart()
    calculation()
    TotalAmount()
    TotalQuentity()
    localStorage.setItem("data", JSON.stringify(value))
}
let decrement = (id) => { 
    let selectId = id
    let search = value.find(x => x.id === selectId)
    if(search === undefined) return 
    else if(search.item === 0)return
    else{
        search.item -= 1
    }

    update(selectId)
    calculation()
    value = value.filter(x =>  x.item !== 0)
    generateCart()
    TotalAmount()
    TotalQuentity()
    localStorage.setItem("data", JSON.stringify(value))
}

let update = (id) => {
    let search = value.find(x => x.id === id);
    let quentityElement = document.getElementById(id).getElementsByClassName('quentity')[0];

    if (quentityElement) {
        quentityElement.innerHTML = search.item;
        generateCart()
        calculation();
    } else {
        console.error('Quentity element not found for ID:', id);
    }
}

let remove = (id) => {
    value = value.filter( x => x.id !== id)
    localStorage.setItem("data", JSON.stringify(value))
    calculation()
    generateCart()
    TotalAmount()
    TotalQuentity()
}

let TotalAmount = () => {
    if(value.length !== 0){
        let amount = value.map(x => {
            let {item,id} = x
            console.log(item);
            let search = MenProductArray.find((y) => y.id === id) || []
    
            return item * parseFloat(search.price)
        }).reduce((x,y) => x+y,0)
        totalprice.innerHTML =`$ ${amount}`
    }else return
    
}

TotalAmount()

let TotalQuentity = () => {
    if(value.length !== 0){
        let Allquentity = value.map(x => x.item ).reduce((x,y) => x+y,0)
        quentity.innerHTML = Allquentity
    }else return
}

 TotalQuentity()