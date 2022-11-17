let label = document.getElementById('label')
let shoppingCart = document.getElementById('shopping-cart')
let basket = JSON.parse(localStorage.getItem('data')) || []

let calculation = () => {
    let cartIcon = document.getElementById('cartAmount')
    cartIcon.innerHTML = basket.map((item) => item.item).reduce((x, y) => x + y, 0)
}
calculation()

let generateCartItems = () => {
    if (basket.length !== 0) {
        return (shoppingCart.innerHTML = basket.map((x) => {
            let {
                id,
                item
            } = x
            let search = itemsData.find((y) => y.id === id) || []
            let {
                image,
                name,
                price
            } = search
            return `
            <div class="cart-item">
                <img src=${image}>
                <div class="details">
                    <div class="title-price">
                        <h4 class="price-title">
                            <p>${name}</p>
                            <p class="cart-item-price">₦ ${price.toLocaleString()}</p>
                        </h4>
                        <i onclick="removeItem(${id})" class="bi bi-x-lg"></i>
                    </div>
                    <div class="buttons cart-btn">
                        <i onclick='decrement(${id})' class="bi bi-dash-lg"></i>
                        <div id=${id} class="quantity">${item}</div>
                        <i onclick='increment(${id})' class="bi bi-plus-lg"></i>
                    </div>                    
                    <h3>₦ ${(item * search.price).toLocaleString()}</h3>
                </div>
            </div>
            `
        }).join(''))
    } else {
        shoppingCart.innerHTML = ``
        label.innerHTML = `
        <div class="empty-cart">
            <div class="empty-cart-icon"><i class="bi bi-cart-x-fill"></i></div>
            <div class="empty-cart-header"><h2>Your cart is empty!</h2></div>
            <p class="empty-cart-text">Browse our categories and discover our best deals!</p>
            <a href="index.html">
                <button class="start-shopping-btn">Start Shopping</button>
            </a>
        </div>
        `
    }
}

generateCartItems()

let increment = (id) => {
    let selectedItem = id
    let search = basket.find((item) => item.id === selectedItem.id)

    if (search === undefined) {
        basket.push({
            id: selectedItem.id,
            item: 1
        })
    } else {
        search.item += 1
    }

    generateCartItems()
    update(selectedItem.id)
    localStorage.setItem('data', JSON.stringify(basket))
}

let decrement = (id) => {
    let selectedItem = id
    let search = basket.find((item) => item.id === selectedItem.id)

    if (search === undefined) return
    else if (search.item === 0) return
    else {
        search.item -= 1
    }

    update(selectedItem.id)

    basket = basket.filter((x) => x.item !== 0)
    generateCartItems()
    localStorage.setItem('data', JSON.stringify(basket))
}

let update = (id) => {
    let search = basket.find((item) => item.id === id)
    document.getElementById(id).innerHTML = search.item
    calculation()
    totalAmount()
}

let removeItem = (id) => {
    let selectedItem = id
    basket = basket.filter((x) => x.id !== selectedItem.id)
    generateCartItems()
    totalAmount()
    calculation()
    localStorage.setItem('data', JSON.stringify(basket))
}

let clearCart = () => {
    basket = []
    generateCartItems()
    calculation()
    localStorage.setItem('data', JSON.stringify(basket))
}

let totalAmount = () => {
    if (basket.length !== 0) {
        let amount = basket.map((x) => {
            let {
                item,
                id
            } = x
            let search = itemsData.find((y) => y.id === id) || []
            return item * search.price
        }).reduce((x, y) => x + y, 0)
        label.innerHTML = `
        <div class="total-container">
            <button class="checkout">Check Out (₦ ${amount.toLocaleString()})</button>
            <button onclick="clearCart()" class="removeAll">Clear Cart<i class="bi bi-trash-fill"></i></button>
        </div>
        `
    } else return
}

totalAmount()