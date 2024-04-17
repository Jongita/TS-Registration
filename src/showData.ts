import { fetchRegistrations } from "./fetchData.js";
import { loadData } from "./loadData.js";
import { Registration } from "./registration.js";

export const showData=(registrationData:Registration[])=>{
    let dataTableBody=<HTMLElement>document.getElementById("dataTableBody");
    dataTableBody.innerHTML="";
    registrationData.forEach((reg)=>{
        const tr=document.createElement("tr");

        const tdName=document.createElement("td");
        tdName.innerHTML=reg.name;
        
        const tdSurname=document.createElement("td");
        tdSurname.innerHTML=reg.surname;
        
        const tdYear=document.createElement("td");
        tdYear.innerHTML=reg.year.toString();

        const tdGender=document.createElement("td");
        tdGender.innerHTML=reg.gender;

        const tdEmail=document.createElement("td");
        tdEmail.innerHTML=reg.email;

        const tdPhone=document.createElement("td");
        tdPhone.innerHTML=reg.phone;
      
        tr.appendChild(tdName);
        tr.appendChild(tdSurname);
        tr.appendChild(tdYear);
        tr.appendChild(tdGender);
        tr.appendChild(tdEmail);
        tr.appendChild(tdPhone);
       
        dataTableBody.appendChild(tr);

        tr.onclick=()=>{
            (<HTMLElement>document.getElementById("dataTable")).style.display="none";
            (<HTMLElement>document.getElementById("editForm")).style.display="block";

            (<HTMLInputElement>document.getElementById("nameEdit")).value=reg.name;
            (<HTMLInputElement>document.getElementById("surnameEdit")).value=reg.surname;
            (<HTMLInputElement>document.getElementById("yearEdit")).value=reg.year.toString();
             if (reg.gender === 'male') {
                (<HTMLInputElement>document.getElementById('maleEdit')).checked = true;
            } else if (reg.gender === 'female') {
                (<HTMLInputElement>document.getElementById('femaleEdit')).checked = true;
            } else {
                (<HTMLInputElement>document.getElementById('maleEdit')).checked = false;
                (<HTMLInputElement>document.getElementById('femaleEdit')).checked = false;
            }
            (<HTMLInputElement>document.getElementById("emailEdit")).value=reg.email;
            (<HTMLInputElement>document.getElementById("phoneEdit")).value=reg.phone;


            (<HTMLButtonElement>document.getElementById("updateRegistration")).onclick=()=>{
                const genderEdit = (<HTMLInputElement>document.getElementById('maleEdit')).checked ? 'male' : (<HTMLInputElement>document.getElementById('femaleEdit')).checked ? 'female' : 'unknown';

                const upReg:Registration={
                    name:(<HTMLInputElement>document.getElementById("nameEdit")).value,
                    surname:(<HTMLInputElement>document.getElementById("surnameEdit")).value,
                    year:(<HTMLInputElement>document.getElementById("yearEdit")).valueAsNumber,
                    gender:genderEdit,
                    email:(<HTMLInputElement>document.getElementById("emailEdit")).value,
                    phone:(<HTMLInputElement>document.getElementById("phoneEdit")).value,
                }
                fetchRegistrations(`registration/${reg.id}`, "PUT", upReg)
                .then((response)=>{
                    return response.json();
                })
                .then((data)=>{
                    console.log("Įrašas atnaujintas");
                    console.log(data);
                    (<HTMLElement>document.getElementById("dataTable")).style.display="block";
                    (<HTMLElement>document.getElementById("editForm")).style.display="none";
                    loadData();
                })
            }
            (<HTMLButtonElement>document.getElementById("deleteRegistration")).onclick=()=>{ 

                fetchRegistrations(`registration/${reg.id}`, "DELETE", null)
                .then((response)=>{
                    return response.json();
                })
                .then((data)=>{
                    (<HTMLElement>document.getElementById("dataTable")).style.display="block";
                    (<HTMLElement>document.getElementById("editForm")).style.display="none";
                    loadData();
                });

            }   
          }
    })
}

