import { fetchRegistrations } from "./fetchData.js";
import { loadData } from "./loadData.js";
import { Registration } from "./registration.js";
import { showData } from "./showData.js";

const nameDOM =<HTMLInputElement>document.getElementById("name");
const surnameDOM=<HTMLInputElement>document.getElementById("surname");
const yearDOM=<HTMLInputElement>document.getElementById("year");
const maleDOM=(<HTMLInputElement | null>document.getElementById('male'))!;
const femaleDOM=(<HTMLInputElement | null>document.getElementById('female'))!;
const emailDOM=<HTMLInputElement>document.getElementById("email");
const phoneDOM=<HTMLInputElement>document.getElementById("phone");
const addRegistrationButton=<HTMLButtonElement>document.getElementById("addRegistration");
const error =<HTMLDivElement>document.querySelector("#error");

const loadDataButton=<HTMLButtonElement>document.getElementById("loadData");


export const registrationData:Registration[] = [];

error.style.visibility = "hidden";

addRegistrationButton.onclick=()=>{
    const genderInp: string = maleDOM.checked ? 'male' : femaleDOM.checked ? 'female' : 'unknown';
    if (genderInp === 'unknown') {
        error.innerHTML = "Pasirinkite lytį (vyras arba moteris)!"
        error.style.visibility = "visible";
        return; 
    }
    const reg:Registration={
        name: nameDOM.value,
        surname: surnameDOM.value, 
        year: yearDOM.valueAsNumber,
        gender: genderInp,
        email: emailDOM.value,
        phone: phoneDOM.value
    }
    fetchRegistrations('registration','POST', reg)
    .then((response)=>{
        return response.json();
    })
    .then((data)=>{
        console.log("Įrašas pridėtas");
        console.log(data);
    })
    error.style.visibility = "hidden";
    nameDOM.value = '';
    surnameDOM.value = '';
    maleDOM.checked = false;
    femaleDOM.checked = false;
    yearDOM.value = '';
    emailDOM.value = '';
    phoneDOM.value = '';
};

loadDataButton.onclick=loadData;
loadData();