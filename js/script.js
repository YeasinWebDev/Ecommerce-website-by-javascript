const primaryHeader = document.querySelector(".primaryHeader")
const featuredProducts = document.querySelector(".featuredProducts")
const item = document.querySelector(".item")
const CartNumber = document.querySelector(".CartNumber")

let value = JSON.parse(localStorage.getItem('data')) || []



let producthtml = ""
    MenProductArray.forEach(product => {
            let search = value.find((x) => x.id === product.id) || []
            producthtml += `
            <div class="items" id=${product.id}>
                            <img src="${product.img}" alt="">
                        <div class="brand">COCO "${product.brand}"</div>
                        <div class="name">${product.name}</div>
                        <div class="star">⭐⭐⭐⭐</div>
                        <div class="price">${product.price}</div>
                        <div class="addCart">
                        <div class="minus"><i onclick="decrement('${product.id}')" class="fa-solid fa-minus"></i></div>
                        <div id=${product.id} class="quentity">${search.item === undefined ? "0" : search.item}</div>
                        <div class="plus"><i onclick="increment('${product.id}')" class="fa-solid fa-plus"></i></div>
                        </div>
                    </div>
            `
    }) 

item.innerHTML = producthtml
featuredProducts.append(item)



// function for add and minus

let increment = (id) => { 
    // console.log(id)
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
    localStorage.setItem("data", JSON.stringify(value))
}
let decrement = (id) => { 
    // console.log(id)
    let selectId = id
    let search = value.find(x => x.id === selectId)
    if(search === undefined) return 
    else if(search.item === 0)return
    else{
        search.item -= 1
    }

    update(selectId)
    value = value.filter(x =>  x.item !== 0)
    localStorage.setItem("data", JSON.stringify(value))
}

let update = (id) => {
    let search = value.find(x => x.id === id);
    let quentityElement = document.getElementById(id).getElementsByClassName('quentity')[0];

    if (quentityElement) {
        quentityElement.innerHTML = search.item;
        calculation();
    } else {
        console.error('Quentity element not found for ID:', id);
    }
}




// function for cart update number
let calculation = () => {
   CartNumber.innerHTML = value.map(x => x.item).reduce((x,y) => x+y,0)
}

calculation()