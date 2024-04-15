const nameDOM = document.getElementById("name");
const surnameDOM = document.getElementById("surname");
const yearDOM = document.getElementById("year");
const maleDOM = document.getElementById('male');
const femaleDOM = document.getElementById('female');
const emailDOM = document.getElementById("email");
const phoneDOM = document.getElementById("phone");
const addRegistrationButton = document.getElementById("addRegistration");
const error = document.querySelector("#error");
error.style.visibility = "hidden";
addRegistrationButton.onclick = () => {
    const genderInp = (maleDOM.checked ? 'male' : (femaleDOM.checked ? 'female' : 'unknown'));
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
    fetch("https://registration-a11b0-default-rtdb.europe-west1.firebasedatabase.app/registration.json", {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(reg)
    })
        .then((response) => {
        return response.json();
    })
        .then((data) => {
        console.log("Įrašas pridėtas");
        console.log(data);
    });
};
export {};
