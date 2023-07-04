{
    let tasks = [];

    const newTaskContent = () => {
        let htmlString = "";
        for (const task of tasks) {
            htmlString += `<li class = container__row--grid>
                <button class="toggle__button"></button>
                <div class="task__list">${task.content}</div>
                <button class="delete__button">🗑</button>
                </li>`
        }
        document.querySelector(".js-taskList").innerHTML = htmlString;
    }

    const addNewTask = (addTask) => {
        tasks = [...tasks,
        { content: addTask }
        ];
        render();
    }

    const formLock = (event) => {
        event.preventDefault();

        const inputElement = document.querySelector(".js-input");
        addTask = inputElement.value.trim();

        if (addTask !== "") {
            addNewTask(addTask);
            inputElement.value = "";
        }
        inputElement.focus();
    }

    const render = () => {
        newTaskContent();
       
    }

    const init = () => {
        render();
        const formElement = document.querySelector(".js-form");
        formElement.addEventListener("submit", formLock);
    };


    init();

}