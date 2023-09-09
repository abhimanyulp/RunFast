// <-------------------Catching & Declaring---------------->


//Getting key from local storage
// let fetchedData = JSON.parse(localStorage.getItem("key"));

// let LSkeyData = fetchedData[0];
// let LSkeyData = 2;

// let orderLS = JSON.parse(localStorage.getItem("order"))


let token = getCookie("token")
// console.log(token)

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


const baseServerURL = "http://localhost:8080"
// const baseServerURL = "https://runfast.onrender.com"




//glitch
// const URL = "https://nutritious-sugared-fur.glitch.me/users";


// let address = document.getElementById("address-box");

let productsEl = document.getElementById("products");

// let userTag = document.getElementById("user-tag");

let totalFinal = document.querySelector("#total-final > h1");
// totalFinal.innerText = `Total: $${orderLS.totalAmount}`

// let OrderBtn = document.getElementById("place-order")

// let UserData;
// let UserName;
// let UserAdd;
// let UserEmail;
// let UserCart;


// let codCheckbox = document.getElementById("cod-in");
// let onlineCheckbox = document.getElementById("card-in");

// let otpEl = document.getElementById("otp-box");
// let otpBtn = document.getElementById("input-btn");

// let otp1 = document.getElementById("otp-1");
// let otp2 = document.getElementById("otp-2");
// let otp3 = document.getElementById("otp-3");
// let otp4 = document.getElementById("otp-4");


// let currentOtp;

// let cardIn = document.getElementById("card-in");
// let cardNameIn = document.getElementById("card-name-in");
// let cardDateIn = document.getElementById("card-date-in");
// let cvvIn = document.getElementById("cvv-in");


// let delType = "cod";



// <--------------Fetching and Display user cart------------>

//Fetching cart data
// fetch(URL, {
//   method: "GET",
//   headers: {
//     'Content-type': 'application/json'
//   }
// })
//   .then(res => res.json())
//   .then(data => {
//     // console.log(data)
//     UserData = FilterUser(data)
//     UserName = UserData[0].name
//     UserAdd = UserData[0].address
//     UserEmail = UserData[0].email

//     UserCart = UserData[0].cart;

//     let addData = GetAdd(UserName, UserAdd, UserEmail)

//     Display(UserCart)
//     address.innerHTML = addData;
//     userTag.innerText = `User: ${UserName}`
//   })




let init = () => {
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
      Display(data)
      // userIdTag.innerText = `User: ${"UserName"}`;
    })
    .catch((err) => {
      console.log(err)
    })
}

init()





// <---------------addEventListener----------------->



////Check-Box addEventListener
// codCheckbox.addEventListener("change", () => {
//     if (codCheckbox.checked) {
//         onlineCheckbox.checked = false;
//         delType="cod";
//     }
// })

// onlineCheckbox.addEventListener("change", () => {
//     if (onlineCheckbox.checked) {
//         codCheckbox.checked = false;
//         delType="online";
//     }
// })



//OTP button addEventListener
// otpBtn.addEventListener("click", () => {

//     let otpIn = otp1.value + otp2.value + otp3.value + otp4.value

//     if (otpIn == currentOtp) {

//         otpEl.style.display = "none"

//         backend()

//         setTimeout(()=>{
//             window.location.href = "placed.html"
//         },2000)

//         // alert("Order Placed Successfuly");

//     } else {
//         alert("Please Enter Correct OTP")
//     }

// })



//Place Order button addEventListener
// OrderBtn.addEventListener("click", () => {

//     if (codCheckbox.checked) {

//         backend()

//         setTimeout(()=>{
//             window.location.href = "placed.html"
//         },2000)

//         // alert("Order Placed Successfuly")

//     }

//     if (!onlineCheckbox.checked && !codCheckbox.checked) {
//         alert("Please fill one of the fields");
//     }

//     if (onlineCheckbox.checked) {
//         if (validate()) {

//             otpEl.style.display = "flex"
//             currentOtp = GenerateOTP();
//             alert(`New message: Your OTP for order is ${currentOtp}`)

//         }
//         else {
//             alert("Please fill the all cards fields")
//         }
//     }

// })










// <--------------Functions-------------->


//Address element structure function
// function GetAdd(name, add, email) {
//     let data = `
//         <h2>
//             ${name}
//         </h2>
//         <h2>
//             ${add}
//         </h2>
//         <h2>
//             ${email}
//         </h2>
//         `
//     return data;
// }



//Filtering data with LS key to specific user
// function FilterUser(data) {
//     let filtered = data.filter((element) => {
//         if (LSkeyData == element.id) {
//             return true
//         } else {
//             return false;
//         }
//     })
//     return filtered;
// }




//OTP Generate function
// function GenerateOTP() {
//     var otp = []

//     var digit1 = Math.floor(Math.random() * 9)
//     var digit2 = Math.floor(Math.random() * 9)
//     var digit3 = Math.floor(Math.random() * 9)
//     var digit4 = Math.floor(Math.random() * 9)

//     otp.push(digit1, digit2, digit3, digit4)

//     return otp.join("")
// }




//Validating input fields are empty or not
// function validate() {
//     if (cardIn.value == "" || cardNameIn.value == "" || cardDateIn.value == "" || cvvIn.value == "") {
//         return false;
//     } else {
//         return true;
//     }
// }




//Backend POST function
function backend() {

  orderLS.type = delType;
  orderLS.days = Math.floor(Math.random() * 10)

  fetch(`https://nutritious-sugared-fur.glitch.me/ordered`, {
    method: "POST",
    body: JSON.stringify(orderLS),
    headers: {
      'Content-type': 'application/json'
    }
  })
    .then(res => res.json())
    .then((data) => {
      console.log(data)
    })
}




//Display Function
function Display(data) {
  data.forEach((element) => {
    let card = document.createElement("div")
    card.setAttribute("id", "card")

    let img = document.createElement("img")
    img.setAttribute("src", element.image);

    let titleCard = document.createElement("div")
    titleCard.setAttribute("id", "title-card")

    let title = document.createElement("p")
    title.innerText = element.name;

    let color = document.createElement("p")
    color.innerText = element.color;


    card.append(img, titleCard, color)
    titleCard.append(title);
    productsEl.append(card);
  })
}



// Card Section

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



// <-------------Event Listerners--------------->

//Place Order button addEventListener
submitButton.addEventListener("click", (e) => {

  e.preventDefault()

  console.log("test")

  if (validate()) {

    setTimeout(() => {
      // backend()
    }, 1000)

    setTimeout(() => {
      window.location.href = "/index.html"
    }, 3000)

    notyf.success('Your changes have been successfully saved!');

  }
  else {
    notyf.error('Please fill the form first');
  }
})

function validate() {

  if (cardNumber.value == "" || cardName.value == "" || cardMonth.value == "" || cardYear.value == "" || cardCvv.value == "") {
    return false
  } else {
    return true
  }

}