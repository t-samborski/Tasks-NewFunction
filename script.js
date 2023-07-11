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

    const completeAllQuests = () => {
        tasks = tasks.map((task) => ({
            ...task,
            done: true,
        }));
        render();
    };

    const completionStatus = () => {
        hideDoneStatus = !hideDoneStatus;
        render();
    }

    const statusChangingButtons = () => {

        const allDoneTask = document.querySelector(".js-allDoneTaskButton");

        if (allDoneTask) {
            allDoneTask.addEventListener("click", completeAllQuests);
        }

        const visibleTaskStatus = document.querySelector(".js-visibleButton");

        if (visibleTaskStatus) {
            visibleTaskStatus.addEventListener("click", completionStatus);
        }
    };

    const visibilityStatus = () => {
        const visibilityButtonsStatus = document.querySelector(".js-visibilityButtons");

        if (!tasks.length) {
            visibilityButtonsStatus.innerHTML = "";
            return;
        }

        visibilityButtonsStatus.innerHTML = ` 
        <button class="container__button js-visibleButton">${hideDoneStatus ? "Pokaż" : "Ukryj"} ukończone</button>
        <button class="container__button js-allDoneTaskButton" ${tasks.every(({done})=>done) ? "disabled" : ""}>Ukończ wszystkie</button>
        `;
    }

    const contentList = () => {
        const taskToHTML = task =>
        
            `<li class = "container__row--grid${hideDoneStatus && task.done ? " task__hiden" : ""}">
            <button class="toggle__button">${task.done ? "✔" : ""}</button>
            <div class="task__list ${task.done ? "task__list--done" : ""}">${task.content}</div>
            <button class="delete__button">🗑</button>
            </li>
            `
            const taskElement = document.querySelector(".js-taskList");
            taskElement.innerHTML = tasks.map(taskToHTML).join("");
        }

    const addNewTask = (newTask) => {
        tasks = [...tasks,
        { content: newTask }
        ];
        render();
    }

    const formBlock = (event) => {
        event.preventDefault();

        const newContent = document.querySelector(".js-input");
        const newTask = newContent.value.trim();

        if (newTask !== "") {
            addNewTask(newTask);
            newContent.value = "";
        }

        newContent.focus();
    }
    const removeEvents = () => {
        const deleteButtons = document.querySelectorAll(".delete__button");
        deleteButtons.forEach((removeButton, index) => {
            removeButton.addEventListener("click", () => {
                removeTask(index);
            })
        })
    }
    const toggleEvents = () => {
        const toggleButtons = document.querySelectorAll(".toggle__button");
        toggleButtons.forEach((toggleButton, index) => {
            toggleButton.addEventListener("click", () => {
                toggleTask(index);
            })
        })
    }

    const render = () => {
        contentList();
        removeEvents();
        toggleEvents();
        visibilityStatus();
        statusChangingButtons();
    }

    const init = () => {
        render();
        const formElement = document.querySelector(".js-form");
        formElement.addEventListener("submit", formBlock);
    };

    init();
}