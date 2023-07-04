{
    let tasks = [];

    const toggleTask = (arrayElement) => {
        tasks = tasks.map((task, index) =>
            index === arrayElement ? { ...task, done: !task.done } : task);
        render();
    }

    const removeTask = (arrayElement) => {
        tasks = tasks.filter((task, index) => index !== arrayElement);
        render();
    }

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

    const deleteTaskButtons = () => {
        const deleteButtons = document.querySelectorAll(".delete__button");
        deleteButtons.forEach((removeButton, index) => {
            removeButton.addEventListener("click", () => {
                removeTask(index);
            })
        })
    }
    const toggleTaskButtons = () => {
        const toggleButtons = document.querySelectorAll(".toggle__button");
        toggleButtons.forEach((toggleButton, index) => {
            toggleButton.addEventListener("click", () => {
                toggleTask(index);
            })
        })
    }

    const render = () => {
        newTaskContent();
        toggleTaskButtons();
        deleteTaskButtons();
    }

    const init = () => {
        render();
        const formElement = document.querySelector(".js-form");
        formElement.addEventListener("submit", formLock);
    };


    init();

}