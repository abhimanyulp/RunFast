//Server Urls
// const baseServerURL = "http://localhost:8080"
const baseServerURL = "https://runfast.onrender.com"

//Getting token from cookie
let token = getCookie("token")

//Elements
let productsEl = document.getElementById("products");
let totalFinal = document.querySelector("#total-final > h1");
// totalFinal.innerText = `Total: $${orderLS.totalAmount}`


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
      Display(data)
    })
    .catch((err) => {
      console.log(err)
    })
}

init()


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

//Backend POST function
function OrderPlacedBackend() {

  let CurrentCart = null

  fetch(`${baseServerURL}/cart/get`, {
    method: "GET",
    headers: {
      'Content-Type': 'application/json',
      'authorization': token
    }
  })
    .then((res) => res.json())
    .then((data) => {
      CurrentCart = data
    })
    .catch((err) => {
      console.log(err)
    })

  if (CurrentCart != null) {
    //Need to make changes according to the backend route
    fetch(`${baseServerURL}/cart/order`, {
      method: "POST",
      body: JSON.stringify(CurrentCart),
      headers: {
        'Content-type': 'application/json'
      }
    })
      .then(res => res.json())
      .then((data) => {
        console.log(data.msg)
      })
  }

}




//Display Function
function Display(data) {
  data.forEach((element) => {
    let card = document.createElement("div")
    card.setAttribute("id", "card")

    let img = document.createElement("img")
    img.setAttribute("src", element.product.image);

    let titleCard = document.createElement("div")
    titleCard.setAttribute("id", "title-card")

    let title = document.createElement("p")
    title.innerText = element.product.name;

    let qty = document.createElement("p")
    qty.innerText = element.quantity;

    let color = document.createElement("p")
    color.innerText = element.product.color;


    card.append(img, titleCard, qty, color)
    titleCard.append(title);
    productsEl.append(card);
  })
}



// Card Section Below

new Vue({
  el: "#app",
  data() {
    return {
      currentCardBackground: Math.floor(Math.random() * 25 + 1), // just for fun :D
      cardName: "",
      cardNumber: "",
      cardMonth: "",
      cardYear: "",
      cardCvv: "",
      minCardYear: new Date().getFullYear(),
      amexCardMask: "#### ###### #####",
      otherCardMask: "#### #### #### ####",
      cardNumberTemp: "",
      isCardFlipped: false,
      focusElementStyle: null,
      isInputFocused: false,
    };
  },
  mounted() {
    this.cardNumberTemp = this.otherCardMask;
    document.getElementById("cardNumber").focus();
  },
  computed: {
    getCardType() {
      let number = this.cardNumber;
      let re = new RegExp("^4");
      if (number.match(re) != null) return "visa";

      re = new RegExp("^(34|37)");
      if (number.match(re) != null) return "amex";

      re = new RegExp("^5[1-5]");
      if (number.match(re) != null) return "mastercard";

      re = new RegExp("^6011");
      if (number.match(re) != null) return "discover";

      re = new RegExp("^9792");
      if (number.match(re) != null) return "troy";

      return "visa"; // default type
    },
    generateCardNumberMask() {
      return this.getCardType === "amex"
        ? this.amexCardMask
        : this.otherCardMask;
    },
    minCardMonth() {
      if (this.cardYear === this.minCardYear) return new Date().getMonth() + 1;
      return 1;
    },
  },
  watch: {
    cardYear() {
      if (this.cardMonth < this.minCardMonth) {
        this.cardMonth = "";
      }
    },
  },
  methods: {
    flipCard(status) {
      this.isCardFlipped = status;
    },
    focusInput(e) {
      this.isInputFocused = true;
      let targetRef = e.target.dataset.ref;
      let target = this.$refs[targetRef];
      this.focusElementStyle = {
        width: `${target.offsetWidth}px`,
        height: `${target.offsetHeight}px`,
        transform: `translateX(${target.offsetLeft}px) translateY(${target.offsetTop}px)`,
      };
    },
    blurInput() {
      let vm = this;
      setTimeout(() => {
        if (!vm.isInputFocused) {
          vm.focusElementStyle = null;
        }
      }, 300);
      vm.isInputFocused = false;
    },
  },
});





//Handling Submit Button

const submitButton = document.querySelector("#submitBtn");
const cardNumber = document.querySelector("#cardNumber");
const cardName = document.querySelector("#cardName");
const cardMonth = document.querySelector("#cardMonth");
const cardYear = document.querySelector("#cardYear");
const cardCvv = document.querySelector("#cardCvv");


//Place Order button addEventListener
submitButton.addEventListener("click", (e) => {

  e.preventDefault()

  if (validate()) {

    setTimeout(() => {
      OrderPlacedBackend()
    }, 1000)

    setTimeout(() => {
      window.location.href = "/index.html"
    }, 3000)

    notyf.success('Your order has been successfully placed!');

  }
  else {
    notyf.error('Please fill the card details first');
  }
})

function validate() {

  if (cardNumber.value == "" || cardName.value == "" || cardMonth.value == "" || cardYear.value == "" || cardCvv.value == "") {
    return false
  } else {
    return true
  }

}