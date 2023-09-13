let logoutbtn = document.getElementById('logout-btn')
let signinbtn = document.getElementById("signinbtn");
let profilebtn = document.getElementById("profilebtn");

window.onload = () => {
    let cookies = document.cookie.split(";");
    let token = null;

    for (let cookie of cookies) {
        let [name, value] = cookie.trim().split("=");
        if (name === "token") {
            token = value;
            break;
        }
    }

    if (token) {
        signinbtn.classList.remove("active");
        signinbtn.classList.add("d-none");

        profilebtn.classList.remove("d-none");
        // profilebtn.classList.add("d-none");
    } else {
        //alert("tata");
    }
};

logoutbtn.addEventListener('click', () => {
    // let token = document.cookie.split(";")
    console.log('Hellow')
    // let res=await fetch(`http://localhost:8080/user/logout/${}`)
})