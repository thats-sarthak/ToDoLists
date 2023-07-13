const addUserBtn = document.getElementById('addUser');
const btnText = addUserBtn.innerText;
const usernameTextField = document.getElementById('username');
const recordsDisplay = document.getElementById('records');
const completedFilter = document.getElementById('completedFilter');
const nonCompletedFilter = document.getElementById('nonCompletedFilter');
let userArray = [];
let editId = null;

let objStr = localStorage.getItem('users');

if (objStr != null) {
   userArray = JSON.parse(objStr);
}

displayInfo();
addUserBtn.onclick = () => {
   //get user's name from text field
   const name = usernameTextField.value;
   if (editId != null) {
      //edit action
      userArray.splice(editId, 1, {
         'name': name
      });
      editId = null;
   } else {
      //insert action
      userArray.push({
         'name': name
      });
   }

   saveInfo(userArray);
   usernameTextField.value = '';
   addUserBtn.innerText = btnText;
}

// store user's name in local storage
function saveInfo(userArray) {
   let str = JSON.stringify(userArray);
   localStorage.setItem('users', str);
   displayInfo();
}

// display user's name
function displayInfo() {
   let statement = '';
   const completed = completedFilter.checked;
   const nonCompleted = nonCompletedFilter.checked;
   userArray.forEach((user, i) => {
      if ((completed && user.completed) || (nonCompleted && !user.completed) || (!completed && !nonCompleted)) {
         statement += `<tr>
             <th scope="row">${i + 1}</th>
             <td>${user.name}</td>
             <td><i class="btn text-white fa fa-edit btn-info mx-2" onclick='editInfo(${i})'></i> <i class="btn btn-danger text-white fa fa-trash" onclick='deleteInfo(${i})'></i></td>
           </tr>`;
      }
   });
   recordsDisplay.innerHTML = statement;
}

// edit user's name
function editInfo(id) {
   editId = id;
   usernameTextField.value = userArray[id].name;
   addUserBtn.innerText = 'Save Changes';
}

//delete user's name
function deleteInfo(id) {
   userArray.splice(id, 1);
   saveInfo(userArray);
}
