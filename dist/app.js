import { loginExec, registerExec } from "./auth.js";
import { fetchRegistrations } from "./fetchData.js";
import { loadData } from "./loadData.js";
const nameDOM = document.getElementById("name");
const surnameDOM = document.getElementById("surname");
const yearDOM = document.getElementById("year");
const maleDOM = document.getElementById('male');
const femaleDOM = document.getElementById('female');
const emailDOM = document.getElementById("email");
const phoneDOM = document.getElementById("phone");
const addRegistrationButton = document.getElementById("addRegistration");
const error = document.querySelector("#error");
const loadDataButton = document.getElementById("loadData");
export const registrationData = [];
error.style.visibility = "hidden";
addRegistrationButton.onclick = () => {
    const genderInp = maleDOM.checked ? 'male' : femaleDOM.checked ? 'female' : 'unknown';
    if (genderInp === 'unknown') {
        error.innerHTML = "Pasirinkite lytį (vyras arba moteris)!";
        error.style.visibility = "visible";
        return;
    }
    const reg = {
        name: nameDOM.value,
        surname: surnameDOM.value,
        year: yearDOM.valueAsNumber,
        gender: genderInp,
        email: emailDOM.value,
        phone: phoneDOM.value
    };
    fetchRegistrations('registration', 'POST', reg)
        .then((response) => {
        return response.json();
    })
        .then((data) => {
        console.log("Įrašas pridėtas");
        console.log(data);
    });
    error.style.visibility = "hidden";
    nameDOM.value = '';
    surnameDOM.value = '';
    maleDOM.checked = false;
    femaleDOM.checked = false;
    yearDOM.value = '';
    emailDOM.value = '';
    phoneDOM.value = '';
};
export const userInfo = {
    email: "",
    idToken: "",
    loggedin: false,
};
// Paslėpiame duomenų sekciją ir įjungiame rodyti prisijungimo sekciją
document.getElementById("loginSection").style.display = "block";
document.getElementById("dataSection").style.display = "none";
document.getElementById("loginError").style.display = "none";
loadDataButton.onclick = loadData;
// (<HTMLButtonElement>document.getElementById("login")).onclick=loginExec;
// (<HTMLButtonElement>document.getElementById("register")).onclick=registerExec;
// loadData();
// Registracijos URL (API KEY turim ideti savo aplikacijos rakta)
// https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBu5FAtvsWxbYVd2fa47_Me-GQut4pGiEw
//Prisijungimui URL
// https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBu5FAtvsWxbYVd2fa47_Me-GQut4pGiEw
// API KEY:
// AIzaSyBu5FAtvsWxbYVd2fa47_Me-GQut4pGiEw
//Registracijos išbandymas
// (<HTMLButtonElement>document.getElementById("login")).onclick=()=>{
//     fetch("https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBu5FAtvsWxbYVd2fa47_Me-GQut4pGiEw",{
//         method:"POST",
//         headers:{
//                 'Accept':'application/json',
//                 'Content-Type':'application/json'
//         },
//         body: JSON.stringify({
//             email:"jongita@yahoo.com",
//             password:"LabasRytas",
//             returnSecureToken:true,
//         })
//     })
//     .then((response)=>{
//       return response.json();
//     })
//     .then((data)=>{
//      console.log(data);
//      // jei prisijungimas suveike gerai mes turesim siuos duomenis
//      userInfo.email=data.email;
//      userInfo.idToken=data.idToken;
//      userInfo.loggedin=true;
//      (<HTMLElement>document.getElementById("loginSection")).style.display="none";
//      (<HTMLElement>document.getElementById("dataSection")).style.display="block";
//      loadData();
//     });
// }
document.getElementById("login").onclick = loginExec;
document.getElementById("register").onclick = registerExec;
