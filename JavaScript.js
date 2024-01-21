let tasks = [];

function register() {
  let email = document.getElementById('email').value;
  sessionStorage.setItem("username", username);
  sessionStorage.setItem("email", email);
  document.getElementById('register').style.display = 'none';
  document.getElementById('main').style.display = 'block';
  getTasks();
  alert('User Registered Successfully');
}

async function getTasks(){
  let response = await fetch('https://65a8cb55219bfa3718679c06.mockapi.io/ToDo');
  tasks = await response.json();
  tasks.forEach(TASK => render(TASK));
}

async function addTaskButton() {
  let text = document.getElementById('TASK').value;
  let date = document.getElementById('DATE').value;
  if (TASK.some(TASK => TASK.date === date)) {
    alert('A task has already been scheduled for this date!');
    return;
  }

  const postTask = { text: TASK, date: date};

  let response = await fetch('https://65a8cb55219bfa3718679c06.mockapi.io/ToDo', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(postTask)
  });

  let taskId = await response.json();
  tasks.push(taskId);
  render(taskId);
}

function render(TASK) {
  let taskList = document.getElementById('TASK');
  let listItem = document.createElement('li');
  listItem.innerHTML = `<input type="checkbox" id="${TASK.id}" ${TASK.completed ? 'checked' : ''}> ${TASK.text}`;
  taskList.appendChild(listItem);
}

async function updateTasks() {
  let boxes = document.querySelectorAll(`input[type="checkbox"]`);
  for (let box of boxes) {
    let updTask = tasks.find(TASK => TASK.id === box.id);
    updTask.completed = box.checked;

    let endpoint = `https://65a8cb55219bfa3718679c06.mockapi.io/ToDo${box.id}`;
    await fetch(endpoint, {
    method: 'PUT',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(updTask)
  }).then(res => res.json());
}
    alert('All tasks updated.');
}
