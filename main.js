//For url visit CRUDCRUD.com

const list = document.getElementById('bookingTable');
// document.getElementById("_id").style.display = "none";
const url = "https://crudcrud.com/api/bce47d4a46ba47edb04d14fedfc900dc/users";

//form values
const first_name = document.getElementById('fname');
const last_name = document.getElementById('lname');    
const email = document.getElementById('email');
const phoneno = document.getElementById('phoneno');

const btnSubmit = document.querySelector('.btn');

const renderAppointment = (element) => {
    element.forEach(element => {
        list.innerHTML += ` 
        
    <tr data-id="${element._id}">
        <td class="name">${element.first_name} ${element.last_name}</td>
        <td class="email">${element.email}</td>
        <td class="phoneno">${element.phoneno}</td>
        <td><a class="DeleteButton" id="delete-app">Delete</td>
        <td><a class="EditButton" id="edit-app">Edit</td>
    </tr>`;
    });
    
}

//GET method
axios.get(url)
    .then(response => {
        // console.log(response.data)
        renderAppointment(response.data)})
    .catch(error => console.log(error))


list.addEventListener('click',(e)=>{
    e.preventDefault();
    let isDeleteButtonPressed = e.target.id == 'delete-app';
    let isEditButtonPressed = e.target.id == 'edit-app';
    let id = e.target.parentElement.parentElement.dataset.id;
 
    //DELETE method
    if(isDeleteButtonPressed){
        let urlstr = `${url}/${id}`;
    axios.delete(urlstr)
        .then(response => {
            console.log("Appointment Deleted")
            location.reload()
        })
        .catch(error => console.log("Some error while deleting appointment"))
    }

    //UPDATE method
    if(isEditButtonPressed){
        const parent = e.target.parentElement.parentElement;
        
        let name = parent.querySelector('.name').textContent;
        console.log(name)
        name = name.split(/\s+/);
        const emailadd = parent.querySelector('.email').textContent;
        const phoneNo = parent.querySelector('.phoneno').textContent;

        first_name.value = name[0];
        last_name.value = name[1];
        email.value = emailadd;
        phoneno.value = phoneNo;
        // console.log(first_name);
    }

    //PUT in action
    btnSubmit.addEventListener('click', (e) => {
        e.preventDefault();
        const obj = {
            first_name : first_name.value,
            last_name : last_name.value,
            email : email.value,
            phoneno : phoneno.value
        }
        axios.put(`${url}/${id}`, obj)
        .then(() => location.reload())
    })

});


    //POST Method
document.addEventListener('submit', (e) => {
    e.preventDefault();
    const obj = {
        first_name : first_name.value,
        last_name : last_name.value,
        email : email.value,
        phoneno : phoneno.value
    }
    axios.post(url, obj)
        .then(response => {
            console.log("Appointment Registered" + response.data)
            const data = [];
            data.push(response.data)
            renderAppointment(data)
        })
        .catch(error => {console.log(error)})
})