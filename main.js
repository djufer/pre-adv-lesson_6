// нодліст всіх тегів labels
let labels = document.querySelectorAll(".labels");

// нодліст всіх інпутів які мають свою лейбу
let labledInputs = document.querySelectorAll(".labeled");

// перебираємо всі інпути вішаємо на кожний подію input і на цю подію запускаємо ф-цію зменшення лейбла
labledInputs.forEach((inp) => {
    inp.addEventListener("input", reduceLabel);
});
//  ф-ція зменшення лейбла
function reduceLabel() {
    this.parentElement.firstElementChild.classList.add("labels-small");
    this.removeEventListener("input", reduceLabel);
}

//    перехід на іншу сторінку --------------------------------------
let links = document.querySelectorAll(".link");
links.forEach((link) => {
    link.addEventListener("click", changePage);
});
function changePage() {
    let singIn = document.querySelector(".container-sign-in");
    let singUp = document.querySelector(".container-sign-up");
    if (singIn.classList.contains("hide")) {
        singIn.classList.remove("hide");
        singUp.classList.add("hide");
    } else if (singUp.classList.contains("hide")) {
        singUp.classList.remove("hide");
        singIn.classList.add("hide");
    }
}

// ==================================================================
let signUpButton = document.getElementById("sign-up");

// доступаємось до введених значень
let firstName = document.getElementById("firstName");
let lastName = document.getElementById("lastName");
let eMailSUp = document.getElementById("eMail-s-up");
let passwordSUp = document.getElementById("password-s-up");

signUpButton.addEventListener("click", singUpFunction);

//-----перевірка ввдоду---------------------------------------
let correctEmail = /^\w{2,24}@[a-z]{2,6}\.[a-z]{2,6}$/;
let correctPassword = /^\w{2,24}$/;
let correctName = /^\w{2,16}$/;
let corectAll;

firstName.addEventListener("input", () => {
    if (correctName.test(firstName.value)) {
        firstName.classList.remove("noCorrect");
        firstName.classList.add("correct");
    } else {
        firstName.classList.remove("correct");
        firstName.classList.add("noCorrect");
    }
});
lastName.addEventListener("input", () => {
    if (correctName.test(lastName.value)) {
        lastName.classList.remove("noCorrect");
        lastName.classList.add("correct");
    } else {
        lastName.classList.remove("correct");
        lastName.classList.add("noCorrect");
    }
});
eMailSUp.addEventListener("input", () => {
    document.querySelector(".alredy-exist").style.display = "none";
    if (correctEmail.test(eMailSUp.value)) {
        eMailSUp.classList.remove("noCorrect");
        eMailSUp.classList.add("correct");
    } else {
        eMailSUp.classList.remove("correct");
        eMailSUp.classList.add("noCorrect");
    }
});
passwordSUp.addEventListener("input", () => {
    if (correctPassword.test(passwordSUp.value)) {
        passwordSUp.classList.remove("noCorrect");
        passwordSUp.classList.add("correct");
    } else {
        passwordSUp.classList.remove("correct");
        passwordSUp.classList.add("noCorrect");
    }
});
// --------------------------------------------------------------

let base = [];
function singUpFunction() {
    if (
        correctName.test(firstName.value) &&
        correctName.test(lastName.value) &&
        correctEmail.test(eMailSUp.value) &&
        correctPassword.test(passwordSUp.value)
    ) {
        let existsEmail = false;
        if (localStorage.length > 0) {
            base = JSON.parse(localStorage.getItem("base"));
            for (let i = 0; i < base.length; i++) {
                if (base[i].email === eMailSUp.value) {
                    existsEmail = true;
                    eMailSUp.classList.remove("correct");
                    eMailSUp.classList.add("noCorrect");
                    document.querySelector(".alredy-exist").style.display =
                        "block";
                    alert("така пошта вже існує!!!");
                    break;
                }
            }
        }

        if (existsEmail === false) {
            base.push({
                firstName: firstName.value,
                lastName: lastName.value,
                email: eMailSUp.value,
                password: passwordSUp.value,
            });
            localStorage.setItem("base", JSON.stringify(base));
        }

        firstName.value = "";
        lastName.value = "";
        eMailSUp.value = "";
        passwordSUp.value = "";
    } else {
        alert("Заповніть правильно поля");
    }
}
// ----------------------------------------------------------------
let signInButton = document.getElementById("sign-in");

let eMailSIn = document.getElementById("eMail-s-in");
let passwordSIn = document.getElementById("password-s-in");

function signInFunction() {
    let existUser = false;
    let num;
    base = JSON.parse(localStorage.getItem("base"));
    // console.log(base);
    for (let i = 0; i < base.length; i++) {
        if (
            base[i].email === eMailSIn.value &&
            base[i].password === passwordSIn.value
        ) {
            existUser = true;
            num = i;
            break;
        }
    }

    if (!existUser) {
        alert("Неправильний логін або пароль");
    } else {
        document.querySelector(".container-sign-in").classList.add("hide");
        document.querySelector(".contaner-profile").classList.remove("hide");
        document.getElementById("fullName").textContent =
            base[num].firstName + " " + base[num].lastName;
        document.querySelector(".profile-email-block").textContent =
            base[num].email;
    }
}

signInButton.addEventListener("click", signInFunction);

// ------вихід з блоку профайл---------------

document.getElementById("profile-sign-in").addEventListener("click", () => {
    document.querySelector(".container-sign-in").classList.remove("hide");
    document.querySelector(".contaner-profile").classList.add("hide");
});
