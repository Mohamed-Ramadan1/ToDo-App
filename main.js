let input = document.querySelector(".input "),
    submit = document.querySelector(".add"),
    tasksContainer = document.querySelector(".tasks")
    deleteAllBtn=document.querySelector(".delet-all");


// Array to save the tasks.
let arrayOfTasks = [];

//update array with local storage data.
if (localStorage.getItem("tasks")) {
    arrayOfTasks = JSON.parse(localStorage.getItem("tasks"));
}

getDataFromLocalStorage();

submit.onclick = () => {
    if (input.value !== "") {
        addTaskToArray(input.value);
        input.value = "";
    } 
}

//dealing with modify and delete tasks.
tasksContainer.addEventListener("click", (e) => {
    //if user click on delete button
    if (e.target.classList.contains("del")) {
         //remove task form local storage.
        deleteTaskById(e.target.parentElement.getAttribute("data-id"));

        //remove task from page.
        e.target.parentElement.remove();
    }
    
    if (e.target.classList.contains("task")) {
        toggleTaskStatus(e.target.getAttribute("data-id"));
        e.target.classList.toggle("done");
    }
});


function addTaskToArray(taskText) {
    const task = {
        id: Date.now(),
        title: taskText,
        completed: false,
    }
    arrayOfTasks.push(task);
    
    //fron the array of task add the task to page.
    addElementsToPageFrom(arrayOfTasks);

    //add data on the local storage .
    addToLocalStorage(arrayOfTasks);

}

// creaate new task and append it to page
function addElementsToPageFrom(arrayOfTasks){
    tasksContainer.innerHTML = "";

    arrayOfTasks.forEach((task) => {
        let div = document.createElement("div");
        div.className = "task";
        
        //check the task state.
        if (task.completed) {
        div.className = "task done";
        
        }
        div.setAttribute("data-id", task.id);
        div.appendChild(document.createTextNode(task.title));

        //create delete button
        let span = document.createElement("span");
        span.className = "del";
        span.appendChild(document.createTextNode("Delete"));
        div.appendChild(span);

        tasksContainer.appendChild(div)

    });
}


function addToLocalStorage(arrayOfTasks) {
    window.localStorage.setItem("tasks", JSON.stringify(arrayOfTasks));
}

function getDataFromLocalStorage() {
    let data = window.localStorage.getItem("tasks");
    if (data) {
        let tasks = JSON.parse(data);
        addElementsToPageFrom(tasks);
    }
}


// delete the task from the local storage.
function deleteTaskById(taskid) {
    arrayOfTasks = arrayOfTasks.filter((task)=>task.id !=taskid);
    addToLocalStorage(arrayOfTasks);
}


// updating the completed status (true or false)
function toggleTaskStatus(taskId) {
    for (let i = 0; i < arrayOfTasks.length; i++){
        if (arrayOfTasks[i].id == taskId) {
            arrayOfTasks[i].completed == false ? (arrayOfTasks[i].completed =true):(arrayOfTasks[i].completed = false);
        }
    }
    addToLocalStorage(arrayOfTasks);
}

// remove all of the data on clik this button
deleteAllBtn.onclick = () => {
    tasksContainer.innerHTML = "";
    arrayOfTasks = [];
    window.localStorage.removeItem("tasks");
}