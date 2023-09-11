//Server Urls
// const baseServerURL = "http://localhost:8080"
const baseServerURL = "https://runfast.onrender.com"

const signUpButton = document.getElementById('signUp');
const signInButton = document.getElementById('signIn');
const container = document.getElementById('container');
const signupForm = document.getElementById('signupForm')
const signinForm = document.getElementById('signinForm')
const signupName = document.getElementById('signupName')
const signupEmail = document.getElementById('signupEmail')
const signupPass = document.getElementById('signupPass')
const signinEmail = document.getElementById('signinEmail')
const signinPass = document.getElementById('signinPass')

signUpButton.addEventListener('click', () => {
    container.classList.add("right-panel-active");
});

signInButton.addEventListener('click', () => {
    container.classList.remove("right-panel-active");
});



signupForm.addEventListener('submit', (e) => {
    e.preventDefault()

    let payload = {
        name: signupName.value,
        email: signupEmail.value,
        password: signupPass.value
    }

    fetch(`${baseServerURL}/user/register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload),
    }).then((res) => res.json())
        .then((data) => {
            console.log(data)
            alert(data.msg)
        })
        .catch((err) => console.log(err))
})

signinForm.addEventListener('submit', (e) => {
    e.preventDefault()

    let payload = {
        email: signinEmail.value,
        password: signinPass.value
    }

    fetch(`${baseServerURL}/user/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload),
    }).then((res) => res.json()).
        then((data) => {
            console.log(data)
            alert(data.msg)
            var currentDate = new Date();
            var expiryDate = new Date(currentDate.getTime() + (24 * 60 * 60 * 1000));
            var expiryDateString = expiryDate.toUTCString();
            document.cookie = `token=${data.token}; expires=${expiryDateString}; path=/`;
            window.location.href = '../index.html'
        }).
        catch((err) => console.log(err))
})