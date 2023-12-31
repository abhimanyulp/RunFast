//Server Urls
// const baseServerURL = "http://localhost:8080"
const baseServerURL = "https://runfast.onrender.com"


//Getting token from cookie
let token = getCookie("token")


//Elements
let container = document.getElementById("container-products");
let checkoutbtn = document.getElementById("checkout");
let couponSel = document.getElementById("coupon-sel");

let userIdTag = document.getElementById("user-id-tag")

let totalEl = document.getElementById("total");
let subtotalEl = document.getElementById("subtotal");
let subtotal = 0;
let total = 0;

let isCartEmpty = true



//Fetching and Display User Cart
let init = () => {
    fetch(`${baseServerURL}/cart/get`, {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
            'authorization': token
        }
    })
        .then((res) => res.json())
        .then((data) => {
            console.log(data)
            if (data.length > 0) {
                Display(data)
                isCartEmpty = false
            } else {
                container.innerHTML = "<h1> Cart is Empty! </h1>"
            }
        })
        .catch((err) => {
            console.log(err)
        })
}

//Calling intial Funtion
init()




//AddEventListeners

//Apply coupon selector and changing total amount only once
let flag = true;
couponSel.addEventListener("change", () => {

    if (couponSel.value == 10 && flag == true) {
        total = total - ((total / 100) * 10)
        totalEl.innerText = `$${total}`;
        flag = false
        notyf.success('10% Coupon is Applied!');
    }
})

//Temperoly saving order data to local stroage
checkoutbtn.addEventListener("click", () => {
    if(isCartEmpty){
        notyf.error("Please Add Some Item To Checkout!");
    }else{
        window.location.href = "./checkout.html"
    }
})




//Functions

//Get Cookie Funtion
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

//Display Function
function Display(data) {
    container.innerHTML = null;

    data.forEach((element) => {

        let card = document.createElement("div");
        card.setAttribute("id", "card");

        let card_box = document.createElement("div")
        card_box.setAttribute("id", "card-box");

        let img = document.createElement("img")
        img.src = element.product.image;

        let details = document.createElement("div");
        details.setAttribute("id", "details")

        let title = document.createElement("p")
        title.innerText = element.product.name;

        let color = document.createElement("p")
        color.innerText = element.product.color;

        let price = document.createElement("p")
        price.innerText = `$${element.product.price}`;

        total += element.product.price;
        subtotal += element.product.price;
        totalEl.innerText = `$${total}`;
        subtotalEl.innerText = `$${subtotal}`;

        let quantity = document.createElement("div");
        quantity.setAttribute("id", "quantity")

        let btm_dec = document.createElement("button")
        btm_dec.innerText = "-"


        let value = document.createElement("p")
        value.innerText = 1

        let btm_inc = document.createElement("button")
        btm_inc.innerText = "+"

        btm_dec.addEventListener("click", () => {

            if (value.innerText > 1) {
                total -= element.product.price;
                totalEl.innerText = `$${total}`;

                subtotal -= element.product.price;
                subtotalEl.innerText = `$${subtotal}`;

                value.innerText--
                cartUpdate(element.product._id, value.innerText)
            }
        })

        btm_inc.addEventListener("click", () => {

            total += element.product.price;
            totalEl.innerText = `$${total}`;

            subtotal += element.product.price;
            subtotalEl.innerText = `$${subtotal}`;

            value.innerText++
            cartUpdate(element.product._id, value.innerText)
        })

        let id = element.product._id;

        let remove = document.createElement("button");
        remove.innerText = "x"
        remove.setAttribute("id", "removeBtn")

        remove.addEventListener("click", () => {

            cartDelete(id)

            setTimeout(() => {
                window.location.reload()
            }, 2000)

            notyf.success('Item Deleted!');
        })

        card.append(card_box, price, quantity, remove);
        card_box.append(img, details);
        details.append(title, color);
        quantity.append(btm_dec, value, btm_inc);
        container.append(card);
    })
}


//Cart Item Delete Funtion
function cartDelete(productId) {
    let url = `${baseServerURL}/cart/delete/${productId}`;
    fetch((url), {
        method: "DELETE",
        headers: {
            'Content-Type': 'application/json',
            'authorization': token
        }
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

//Cart Item Quantity Update Funtion
function cartUpdate(productId, qty) {
    let url = `${baseServerURL}/cart/update`;
    let payload = {
        productId,
        qty
    }
    fetch((url), {
        method: "PUT",
        headers: {
            'Content-Type': 'application/json',
            'authorization': token
        },
        body: JSON.stringify(payload)
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