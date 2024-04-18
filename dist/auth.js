import { userInfo } from "./app.js";
import { loadData } from "./loadData.js";
function authExec(method) {
    //Url prisijungimui/registracijai priklausomai nuo to koks atsiustas method kintamasis
    fetch(`https://identitytoolkit.googleapis.com/v1/accounts:${method}?key=AIzaSyBu5FAtvsWxbYVd2fa47_Me-GQut4pGiEw`, {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email: document.getElementById("loginEmail").value,
            password: document.getElementById("loginPassword").value,
            returnSecureToken: true,
        })
    })
        .then((response) => {
        return response.json();
    })
        .then((data) => {
        if (typeof data.error !== "undefined") {
            if (data.error.message == "EMAIL_EXISTS") {
                throw new Error("Toks el. pašto adresas jau egzistuoja");
            }
            if (data.error.message == "WEAK_PASSWORD : Password should be at least 6 characters") {
                throw new Error("Per silpnas slaptažodis");
            }
            throw new Error("Vartotojo vardas arba slaptažodis neteisingas");
        }
        console.log(data);
        userInfo.email = data.email;
        userInfo.idToken = data.idToken;
        userInfo.loggedin = true;
        document.getElementById("loginSection").style.display = "none";
        document.getElementById("dataSection").style.display = "block";
        loadData();
    })
        .catch((err) => {
        let errorDiv = document.getElementById("loginError");
        errorDiv.style.display = "block";
        errorDiv.innerHTML = err.message;
    });
}
export function loginExec() {
    authExec("signInWithPassword");
}
export function registerExec() {
    authExec("signUp");
}
//RasaBasa
