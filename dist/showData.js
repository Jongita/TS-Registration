import { fetchRegistrations } from "./fetchData.js";
import { loadData } from "./loadData.js";
export const showData = (registrationData) => {
    let dataTableBody = document.getElementById("dataTableBody");
    dataTableBody.innerHTML = "";
    registrationData.forEach((reg) => {
        const tr = document.createElement("tr");
        const tdName = document.createElement("td");
        tdName.innerHTML = reg.name;
        const tdSurname = document.createElement("td");
        tdSurname.innerHTML = reg.surname;
        const tdYear = document.createElement("td");
        tdYear.innerHTML = reg.year.toString();
        const tdGender = document.createElement("td");
        tdGender.innerHTML = reg.gender;
        const tdEmail = document.createElement("td");
        tdEmail.innerHTML = reg.email;
        const tdPhone = document.createElement("td");
        tdPhone.innerHTML = reg.phone;
        tr.appendChild(tdName);
        tr.appendChild(tdSurname);
        tr.appendChild(tdYear);
        tr.appendChild(tdGender);
        tr.appendChild(tdEmail);
        tr.appendChild(tdPhone);
        dataTableBody.appendChild(tr);
        tr.onclick = () => {
            document.getElementById("dataTable").style.display = "none";
            document.getElementById("editForm").style.display = "block";
            document.getElementById("nameEdit").value = reg.name;
            document.getElementById("surnameEdit").value = reg.surname;
            document.getElementById("yearEdit").value = reg.year.toString();
            if (reg.gender === 'male') {
                document.getElementById('maleEdit').checked = true;
            }
            else if (reg.gender === 'female') {
                document.getElementById('femaleEdit').checked = true;
            }
            else {
                document.getElementById('maleEdit').checked = false;
                document.getElementById('femaleEdit').checked = false;
            }
            document.getElementById("emailEdit").value = reg.email;
            document.getElementById("phoneEdit").value = reg.phone;
            document.getElementById("updateRegistration").onclick = () => {
                const genderEdit = document.getElementById('maleEdit').checked ? 'male' : document.getElementById('femaleEdit').checked ? 'female' : 'unknown';
                const upReg = {
                    name: document.getElementById("nameEdit").value,
                    surname: document.getElementById("surnameEdit").value,
                    year: document.getElementById("yearEdit").valueAsNumber,
                    gender: genderEdit,
                    email: document.getElementById("emailEdit").value,
                    phone: document.getElementById("phoneEdit").value,
                };
                fetchRegistrations(`registration/${reg.id}`, "PUT", upReg)
                    .then((response) => {
                    return response.json();
                })
                    .then((data) => {
                    console.log("Įrašas atnaujintas");
                    console.log(data);
                    document.getElementById("dataTable").style.display = "block";
                    document.getElementById("editForm").style.display = "none";
                    loadData();
                });
            };
            document.getElementById("deleteRegistration").onclick = () => {
                fetchRegistrations(`registration/${reg.id}`, "DELETE", null)
                    .then((response) => {
                    return response.json();
                })
                    .then((data) => {
                    document.getElementById("dataTable").style.display = "block";
                    document.getElementById("editForm").style.display = "none";
                    loadData();
                });
            };
        };
    });
};
