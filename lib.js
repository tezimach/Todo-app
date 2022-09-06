const setup = (tasks, rootElementId) => {
    let taskListHTML = "";
    for (let i=0; i<tasks.length; i++) {
    let task = tasks[i];
    taskListHTML += `
        <li class="task ${task.active? "": "task-completed"}" data-id="${i}">
        <div class="container">
            <div class="round">
            <input type="checkbox" ${task.active? "": "checked"} id="task-${i}" name="completed" class = "task-checkbox"/>
            <label for="task-${i}"></label>
            </div>
            <label for="task-${i}" class="task-text text-font-style-task text-very-dark-grayish-blue">${task.name}</label>
        </div>
        <button class="delete-task">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18"><path fill="#494C6B" fill-rule="evenodd" d="M16.97 0l.708.707L9.546 8.84l8.132 8.132-.707.707-8.132-8.132-8.132 8.132L0 16.97l8.132-8.132L0 .707.707 0 8.84 8.132 16.971 0z"/></svg>
        </button>
        </li>`
    }

    document.getElementById(rootElementId).innerHTML = taskListHTML;

    const tasksListHTML = document.getElementById("tasks");
    let taskItems = Array.from(tasksListHTML.querySelectorAll('.task-checkbox, .task-text'));

    taskItems.map((taskItem)=>{
        taskItem.addEventListener("click", (event)=>{
            let dataId = Number(event.target.closest("li").getAttribute("data-id"));
            tasks[dataId].active = !tasks[dataId].active;

            setup (tasks, "tasks");
        });
    });


    const deleteButtons = Array.from(tasksListHTML.querySelectorAll('.delete-task'));

    deleteButtons.map((deleteButton)=>{
        deleteButton.addEventListener("click", (event) =>{
            let dataId = Number(event.target.closest("li").getAttribute("data-id"));
            tasks.splice(dataId, 1);

            setup (tasks, "tasks");
        });
    });
}