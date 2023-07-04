{
    let tasks = [];
    let hideDoneStatus = false;

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
                <button class="toggle__button">${task.done ? "✔" : ""}</button>
                <div class="task__list ${task.done ? "task__list--done" : ""}">${task.content}</div>
                <button class="delete__button">🗑</button>
                </li>`
        }
        document.querySelector(".js-taskList").innerHTML = htmlString;
    }
    const visibilityStatus = () => {
        const visibilityButtonsStatus = document.querySelector(".js-visibilityButtons");

        if (!tasks.length) {
            visibilityButtonsStatus.innerHTML = "";
            return;
        }

        visibilityButtonsStatus.innerHTML = ` 
        <button class="container__button js-visibleButton">${hideDoneStatus ? "Pokaż" : "Ukryj"} ukończone</button>
        <button class="container__button js-allDoneTaskButton">Ukończ wszystkie</button>
        `;
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
        visibilityStatus();
    }

    const init = () => {
        render();
        const formElement = document.querySelector(".js-form");
        formElement.addEventListener("submit", formLock);
    };


    init();

}