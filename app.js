let menuBtn = document.querySelector('.btn-menu');
let sideBar = document.querySelector('.side-bar');
let navbar = document.getElementsByClassName('navbar')[0];

window.addEventListener('scroll',()=>{
    let scrollHeight = window.pageYOffset;
    let navbarHeight = navbar.getBoundingClientRect().height;
    if(scrollHeight > navbar){
        navbar.classList.add('fixed');
    }else{
        navbar.classList.remove('fixed')
    }
})

menuBtn.onclick = () =>{
    sideBar.classList.toggle('active');
    if(sideBar.classList.contains('active')){
        menuBtn.innerHTML = `<i class='fa fa-times'></i>`
    }else{
        menuBtn.innerHTML = `<i class='fa fa-bars'></i>`
    }
}


// ---------------------
if(document.readyState == 'loading'){
    document.addEventListener('DOMContentLoaded',ready)
}else{
    ready()
}

function ready(){
    // removing rows from the cart
    let deleteItems = document.getElementsByClassName('delete');
    for (let i = 0; i < deleteItems.length; i++) {
        const deleteItem = deleteItems[i];
        deleteItem.addEventListener('click',removeItem)  
    }
    //qunatity changing
    let quantityInputs = document.getElementsByClassName('quantity');
    for (let i = 0; i < quantityInputs.length; i++) {
        let quantityInput = quantityInputs[i]   
        quantityInput.addEventListener('click',quanityChanged)
    }
    // cart items to the cart
    let cartItems = document.getElementsByClassName('cart');
    for (let i = 0; i < cartItems.length; i++) {
        let cartItem = cartItems[i]
        cartItem.addEventListener('click',addItemToCart);

    }

}

function removeItem(e){
    let row = e.target.parentElement;
    row.remove();
    UpdateTotal()
}

function quanityChanged(e){
    let input = e.target
    if(isNaN(input.value ) || input.value <= 0){
        input.value = 1
    }else{
        UpdateTotal()
    }
}

function UpdateTotal(){
    let sideBar = document.getElementsByClassName('side-bar')[0];
    let content = sideBar.getElementsByClassName('content')[0]
    let allRows = content.getElementsByClassName('row');
    let totalMoney = 0;
    for (let i = 0; i < allRows.length; i++) {
        const eachRow = allRows[i];
        let qiimaha = eachRow.getElementsByClassName('qiimo')[0].textContent
        let inputValue = eachRow.getElementsByClassName('quantity')[0].value;
        
        let realyPrice = parseFloat(qiimaha.replace('$',''))
        console.log(inputValue * realyPrice)
        
        totalMoney = totalMoney + (realyPrice * inputValue)
    }
    let totalka = document.getElementsByClassName('total-price')[0];
    totalka.textContent = " $"+ totalMoney.toFixed(2)
}

function addItemToCart(e){
    let content = e.target.parentElement;
    let card = content.parentElement;
    let priceItem = content.getElementsByClassName('price')[0].textContent;
    // the price of the item
    let netPrice = parseFloat(priceItem.replace('$',''))

    let images = card.getElementsByClassName('image')[0].src
    let imgPs = images.indexOf('img')
    // the image of the item
    let img = images.slice(imgPs)

    pushToItem(netPrice,img)
    UpdateTotal()
}
function pushToItem(netPrice, img){
    let content = document.getElementsByClassName('content')[0];
    let cartRow = document.createElement('div');
    cartRow.classList.add('row');

    let innerHtml = ` <img src="${img}" alt="">
    <p class="qiimo">$${netPrice}</p>
    <input type="number" class="quantity" value="1">
    <button class="delete">
        <i class="fa fa-trash"></i>   
    </button>`

    cartRow.innerHTML = innerHtml;
    content.appendChild(cartRow)

    cartRow.getElementsByClassName('quantity')[0].addEventListener('click',quanityChanged)
    cartRow.getElementsByClassName('delete')[0].addEventListener('click',removeItem)
    UpdateTotal()
}


// sliders 

let prevBtns = document.getElementsByClassName('prev');
let nexBtns = document.getElementsByClassName('next');
let productContainer = document.getElementsByClassName('product-container');

for (let i = 0; i < productContainer.length; i++) {
    let productItem = productContainer[i]
    let productWidth = productItem.getBoundingClientRect().width
    nexBtns[i].addEventListener('click',()=>{
        productItem.scrollLeft += productWidth
    })
    prevBtns[i].addEventListener('click',()=>{
        productItem.scrollLeft -= productWidth
    })
}

let btnBg = document.getElementsByClassName('btn-bg');
for (let i = 0; i < btnBg.length ;i++) {
    let btn = btnBg[i];
    btn.addEventListener('click',(e)=>{
        e.target.style.backgroundColor = 'red'
    })
    btn.addEventListener('dblclick',(e)=>{
        e.target.style.backgroundColor = `#00000021`
    })
}
