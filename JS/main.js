let shopItemsContainer = document.getElementById('shopItems')
let basket = JSON.parse(localStorage.getItem('data')) || []

let generateShopItems = () => {
    return (shopItemsContainer.innerHTML = itemsData.map((item) => {
        let {
            id,
            name,
            price,
            description,
            image,
            discountPrice,
            discountPercentage,
            sold
        } = item

        let search = basket.find((item) => item.id === id) || []

        return `<div class="item">
            <img src=${image} alt="${name}" class="item-image">
            <div id=product-id-${id} class="item-details">
                <h4>${name}</h3>
                    <p>${description}</p>
                    <div class="price-quantity">
                        <h2>₦ ${price.toLocaleString()}</h2>
                        <s>${discountPrice}</s><span class="discount">${discountPercentage}</span>
                        <p><i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i><i
                                class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i><i
                                class="bi bi-star"></i>(${sold})
                        </p>
                        <div class="buttons">
                            <i onclick='decrement(${id})' class="bi bi-dash-lg"></i>
                            <div id=${id} class="quantity">${search.item === undefined? 0 : search.item}</div>
                            <i onclick='increment(${id})' class="bi bi-plus-lg"></i>
                        </div>
                    </div>
            </div>
        </div>`
    }).join(''))
}

generateShopItems()

let toTop = document.getElementById("toTop")
window.onscroll = function () {
    scrollFunction()
}

function scrollFunction() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        toTop.style.display = 'block'
    } else {
        toTop.style.display = 'none'
    }
}

function topFunction() {
    document.body.scrollTop = 0
    document.documentElement.scrollTop = 0
}

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
    localStorage.setItem('data', JSON.stringify(basket))
}

let update = (id) => {
    let search = basket.find((item) => item.id === id)
    document.getElementById(id).innerHTML = search.item
    calculation()
}

let calculation = () => {
    let cartIcon = document.getElementById('cartAmount')
    cartIcon.innerHTML = basket.map((item) => item.item).reduce((x, y) => x + y, 0)
}

calculation()