const taskForm = document.querySelector('#task-form');
const taskList = document.getElementById('task-list');

//Event that detect the submit 
taskForm.addEventListener('submit', (event)=>{
    event.preventDefault();

    const taskInput = document.getElementById('task-input');
    const task = taskInput.value;
    console.log(task)

    if(task){
        storeTaskInLocalStorage(task)
        taskList.append(createTaskElement(task));
        taskInput.value=''
    }
   
})


// This create any button with a text an assing a class
function createButton(text, className){
    const btn = document.createElement('span')
    btn.textContent= text
    btn.className=className
    return btn
}

// //Create a task with buttons to delete and edit
function createTaskElement(task){
    const li = document.createElement('li')
    li.textContent = task
    li.append(createButton('❌','delete-btn'), createButton('✍️','edit-btn'))
    return li
}

//Listener to decide if delete or edit a task
taskList.addEventListener('click', (event)=>{
       if(event.target.classList.contains('delete-btn')){
        deleteTask(event.target.parentElement)
    } else if(event.target.classList.contains('edit-btn')){
        editTask(event.target.parentElement)
    }    
})


function deleteTask(taskItem){
    if(confirm('Are you sure that you would like to delete this task?')){
        taskItem.remove()
    }
}

function editTask(taskItem){
    const newTask = prompt('Edit your task', taskItem.firstChild.textContent);
    if(newTask !== null){
        taskItem.firstChild.textContent = newTask;
    }
    
}

function storeTaskInLocalStorage(task){
  let tasks =  JSON.parse(localStorage.getItem('tasks')|| "[]")

  tasks.push(task)
  localStorage.setItem('tasks', JSON.stringify(tasks))

}