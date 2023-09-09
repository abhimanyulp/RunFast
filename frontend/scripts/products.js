//Server Urls
// const baseServerURL = "http://localhost:8080"
const baseServerURL = "https://runfast.onrender.com"

//Getting token from cookie
let token = getCookie("token")

//Pagination Wrapper Element
let paginationWrapperGlobal = document.getElementById("pagination-wrapper");


//Initialization
let mainSection = document.getElementById("data-list-wrapper");
let mainData = [];
window.addEventListener("load", (event) => {
    let url = `${baseServerURL}/product/data?_limit=12&_page=1`;
    fetchShoes(url);
});


//Funtions
function getCookie(cname) {
    let name = cname + "=";
    let ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

function fetchShoes(url) {

    fetch(url)
        .then((res) => {
            return res.json();
        })
        .then((data) => {
            let total = data.totalItems;
            createButton(total);
            mainData = data.data;
            display(data.data);
        })
        .catch((error) => {
            console.log(error);
        })
}

function checkIfProductAlreadyExists(id) {

    let cart = null

    fetch(`${baseServerURL}/cart`, {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
            'authorization': token
        }
    })
        .then((res) => res.json())
        .then((data) => {
            cart = data
        })
        .catch((err) => {
            console.log(err)
        })


    if (cart == null) {
        return false;
    }
    let filterData = cart.filter(element => {
        if (element.id == id) {
            return true;
        }
        return false;
    })
    if (filterData.length > 0) {
        return true;
    }
    return false;
}


//Display Functions
function display(data) {
    mainSection.innerHTML = null;
    mainSection.innerHTML = cardList(data);
    let buttonElement = document.getElementsByClassName("btnCart");
    for (let i = 0; i < buttonElement.length; ++i) {
        buttonElement[i].addEventListener('click', event => {
            let id = event.target.id;
            if (checkIfProductAlreadyExists(id)) {
                alert('Product Already Added to Card');
                return;
            }
            let filteredData = mainData.filter(element => {
                if (element.id == id) {
                    return true;
                } else {
                    return false;
                }
            })
            changeInServer(id)
            let button = document.getElementById(id);
            button.disabled = true;
            button.setAttribute('class', 'alreadyAddedButton');
            button.innerText = 'Product Added To Cart'
        })
    }
    disableAllCartButton();
}

function disableAllCartButton() {

    let cart = null

    fetch(`${baseServerURL}/cart`, {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
            'authorization': token
        }
    })
        .then((res) => res.json())
        .then((data) => {
            // console.log(data)
            cart = data
        })
        .catch((err) => {
            console.log(err)
        })

    if (cart == null || cart.length <= 0) {
        return;
    }
    for (let i = 0; i < cart.length; ++i) {
        let id = cart[i].id;
        let button = document.getElementById(id);
        button.disabled = true;
        button.innerText = 'Product Added To Cart'
        button.setAttribute('class', 'alreadyAddedButton');
    }
}

function changeInServer(productId) {
    let url = `${baseServerURL}/cart`;
    fetch((url), {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            'authorization': token
        },
        body: JSON.stringify({ productId })
    })
        .then((res) => {
            return res.json();
        })
        .then((data) => {
            console.log(data);
        })
        .catch((error) => {
            console.log(error);
        })
}


function cardList(data) {
    return `
      <div id="card-list">
        ${data.map((obj) => {
        return cardElement(obj.id,
            obj.price,
            obj.size,
            obj.color,
            obj.brand,
            obj.rating,
            obj.name,
            obj.image);
    }).join("")
        }
   `
}

function cardElement(id, price, size, color, brand, rating, name, imageURL) {
    return `
    <div class="smallCard">
      <img src="${imageURL}"/>
      <p>${name}</p>
      <p>Price :${price}</p>
      <p>Size :${size}</p>
      <p>Color :${color}</p>
      <p>Brand :${brand}</p>
      <p>Rating :${rating}</p>
      <button class="btnCart" id=${id}>Add To Cart</button>
    </div>  
    `
}

function createButtonForSorting(total, order) {
    let limit = 12;
    let str = "";
    let paginationWrapper = document.getElementById("pagination-wrapper");
    paginationWrapper.innerHTML = null;
    let numberOfButtons = Math.ceil(total / limit);
    for (let i = 0; i < numberOfButtons; i++) {
        str = str + `<button class="paginationBtn">${i + 1}</button>`
    }
    paginationWrapper.innerHTML = str;
    let buttonArray = document.getElementsByClassName("paginationBtn");
    for (let i = 0; i < buttonArray.length; i++) {
        buttonArray[i].addEventListener("click", (event) => {
            let buttonNumber = event.target.innerText;
            let url = `${baseServerURL}/product/data?_limit=12&_page=${buttonNumber}&_sort=price&_order=${order}`;
            fetchSortedData(url, order);
        })
    }
}


function createButton(total, filter, value) {
    let limit = 12;
    let str = "";
    let numberOfButtons = Math.ceil(total / limit);
    for (let i = 0; i < numberOfButtons; i++) {
        str = str + `<button class="paginationBtn">${i + 1}</button>`
    }
    let paginationWrapper = document.getElementById("pagination-wrapper");
    paginationWrapper.innerHTML = str;
    let buttonArray = document.getElementsByClassName("paginationBtn");
    for (let i = 0; i < buttonArray.length; i++) {
        buttonArray[i].addEventListener("click", (event) => {
            event.preventDefault()
            let buttonNumber = event.target.innerText;
            let url = `${baseServerURL}/product/data?_limit=12&_page=${buttonNumber}&${filter}=${value}`;
            fetch(url)
                .then((res) => {
                    return res.json();
                })
                .then((data) => {
                    mainData = data.data;
                    display(data.data);
                })
                .catch((error) => {
                    console.log(error);
                })
        })
    }

}


//Filters
let filter1 = document.getElementById("sort");
filter1.addEventListener('change', (event) => {
    let value = event.target.value;
    if (value == 'sort') {
        let url = `${baseServerURL}/product/data?_limit=12&_page=1`;
        fetchShoes(url);
        return;
    }
    let url = `${baseServerURL}/product/data?_limit=12&_page=1&_sort=price&_order=${value}`;
    fetchSortedData(url, value);
})


function fetchSortedData(url, order) {
    fetch(url)
        .then((res) => {
            return res.json();
        })
        .then((data) => {
            let total = data.totalItems
            createButtonForSorting(total, order);
            mainData = data.data;
            display(data.data);
        })
        .catch((error) => {
            console.log(error);
        })
}

let btnPrice = document.getElementById("btnPrice");
btnPrice.addEventListener("click", (event) => {
    event.preventDefault()
    let value = document.getElementById("inputPrice").value;
    if (value == '' || value == undefined) {
        let url = `${baseServerURL}/product/data?_limit=12&_page=1`;
        fetchShoes(url)
        return;
    }
    let url = `${baseServerURL}/product/data?_limit=12&_page=1&price=${value}`;
    getFilteredData(url, "price", value);
})

function getFilteredData(url, filter, value) {
    fetch(url)
        .then((res) => {
            return res.json();
        })
        .then((data) => {
            mainData = data.data;
            if (mainData.length == 0) {
                alert("The price for which you are searching is not available,please Enter other amount")
                let url = `${baseServerURL}/product/data`;
                fetchShoes(url);
            } else {
                paginationWrapperGlobal.innerHTML = null;
                let total = data.totalItems;
                createButton(total, filter, value);
                display(mainData);
            }
        })
        .catch((error) => {
            console.log(error)
        })
}


let btnBrand = document.getElementById('btnBrand');
btnBrand.addEventListener("click", (event) => {
    event.preventDefault()
    let value = document.getElementById("inputBrand").value;
    if (value == '' || value == undefined) {
        alert('Please enter the brand');
        return;
    }
    let url = `${baseServerURL}/product/data?_limit=12&_page=1&brand=${value}`;
    fetchFilter(url, "brand", value);
})

let colorFilter = document.getElementById('colorSelect');
colorFilter.addEventListener("change", (event) => {
    let value = event.target.value
    if (value == '') {
        return;
    }
    let url = `${baseServerURL}/product/data?_limit=12&_page=1&color=${value}`;
    fetchFilter(url, "color", value);
})


let btnRating = document.getElementById("btnRating");
btnRating.addEventListener("click", (event) => {
    let value = document.getElementById("ratingValue").value;
    if (value == '' || value == undefined || value > 5) {
        alert("Please Enter The Rating value Greater Than Equal To 1 And Less Than Equal To 5")
        return;
    }
    let url = `${baseServerURL}/product/data?_limit=12&_page=1&rating=${value}`;
    fetchFilter(url, "rating", value);
})

function fetchFilter(url, filter, value) {
    fetch(url)
        .then((res) => {
            return res.json();
        })
        .then((data) => {
            mainData = data.data
            paginationWrapperGlobal.innerHTML = null;
            let total = data.totalItems;
            createButton(total, filter, value);
            display(mainData);
        })
        .catch((error) => {
            console.log(error)
        })
}