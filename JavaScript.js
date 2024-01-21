const dataDiv = document.getElementById('table-body');
const addBtn = document.getElementById('add');
const apiLink = 'https://65a8cb55219bfa3718679c06.mockapi.io/PROJ';
fetchData();

async function fetchData() {
    let api = apiLink;
    dataDiv.innerHTML = "<h2>Loading...</h2>";
    try {
        let data = await fetch(api);
        let records = await data.json();
        drawTable(records);
    } catch (e) {
        dataDiv.innerHTML = `<h2>Error! Could not fetch data!</h2>`;
    }
}

function drawTable(data) {
    let table = '';
    data.forEach(function(record) {
        table += `<tr id=${record.id}>
                    <td>${record.id}</td>
                    <td>${record.name}</td>
                    <td>${record.createdAt}</td>
                    <td><img src="${record.avatar}" alt="avatar" width="50" height="50"></td>
                    <td><button onclick="editRecord(${record.id})">Edit</button> 
                        <button onclick="deleteRecord(${record.id})">Delete</button>
                    </td>
                </tr>`;
    });
    dataDiv.innerHTML = table;
}

addBtn.addEventListener('click', fetchData);

async function editRecord(id) {
    let api = apiLink;

    let response = await fetch(`${api}/${id}`);
    let record = await response.json();
    
    let name = window.prompt("Enter new name", record.name);
    let avatar = window.prompt("Enter new avatar URL", record.avatar);

    name = name ? name : record.name;
    avatar = avatar ? avatar : record.avatar;

    let newData = {
        id: id,
        name: name,
        avatar: avatar,
    }

    try{
        response = await fetch(`${api}/${id}`, {
            method: 'PUT', 
            body: JSON.stringify(newData), 
            headers: {
                'Content-Type': 'application/json'
            }
        });
        fetchData();
    } catch(e){
        console.log("Error! Could not edit data!");
    }
}

async function deleteRecord(id) {
    let api = apiLink;
    try{
        let response = await fetch(`${api}/${id}`, {
            method: 'DELETE'
        });
        fetchData();
    } catch(e){
        console.log("Error! Could not delete data!");
    }
}
