let toDoList = JSON.parse(localStorage.getItem("todos")) || [];

const form = document.querySelector(".form");
const todoContent = document.querySelector(".todo__content");
const removeCompletedBtn = document.querySelector(".btn__delete");
const removeAllTasksBtn = document.querySelector(".btn__deleteall");

// Событие DOMContentLoaded в JavaScript означает,
// что HTML-документ был полностью загружен и разобран браузером,
// но внешние ресурсы (например, картинки, стили, видео) могут ещё загружаться.
document.addEventListener("DOMContentLoaded", () => {
  renderTasks();
});

form.addEventListener("submit", (event) => {
  event.preventDefault();
  let input = event.target[0];
  let inputValue = input.value.trim();

  if (inputValue) {
    addTask(inputValue);
  }

  input.value = ""; //! отчистка input после добавления задачи
});

removeCompletedBtn.addEventListener("click", () => removeCompletedTasks());
removeAllTasksBtn.addEventListener("click", () => removeAllTasks());

function removeAllTasks() {
  toDoList.length = 0;
  /*   localStorage.clear(); */
  saveToLocolStorage();
  renderTasks();
}

function removeCompletedTasks() {
  toDoList = toDoList.filter((el) => !el.isCompleted);
  saveToLocolStorage();
  renderTasks();
}

function saveToLocolStorage() {
  localStorage.setItem("todos", JSON.stringify(toDoList));
}

function addTask(taskText) {
  let task = {
    text: taskText,
    id: Date.now(),
    isCompleted: false,
  };

  toDoList.push(task);
  saveToLocolStorage();
  renderTasks();
}

function removeTask(id, arr) {
  toDoList = arr.filter((el) => el.id !== id);
  saveToLocolStorage();
  renderTasks();
}

function toggleTaskCompletion(id, arr) {
  toDoList = arr.map((el) =>
    el.id === id ? { ...el, isCompleted: !el.isCompleted } : el
  );
  saveToLocolStorage();
  renderTasks();
}

function editTask(id, text) {
  toDoList = toDoList.map((el) => (el.id === id ? { ...el, text } : el));
  saveToLocolStorage();
  renderTasks();
}

function renderTasks() {
  let tasks = document.querySelector(".tasks");

  if (!tasks) {
    // Если списка нет — создаём и добавляем
    tasks = document.createElement("ul");
    tasks.classList.add("tasks");
    todoContent.append(tasks);
  } else {
    // Если есть — очищаем
    tasks.innerHTML = "";
  }

  toDoList.forEach((task) => {
    const listItem = document.createElement("li");
    listItem.classList.add("listItem");

    listItem.innerHTML = `
      <input type="checkbox" ${task.isCompleted ? "checked" : ""}/>
      <p class="task__text ${task.isCompleted ? "completed" : ""}" >${
      task.text
    }</p>
    <input type="text" class="edit__input" value="${
      task.text
    }" style="display: none;"/>
    <div class="buttons__task">
    <button class="edit__btn" type="button"><img src="./icons/✏️.png" alt=""/>
</button>
      <button class="remove__btn" type="button"><img src="./icons/❌.png" alt=""/></button>
    </div>
      
      
    `;

    const checkbox = listItem.querySelector('input[type="checkbox"]');
    checkbox.addEventListener("change", () =>
      toggleTaskCompletion(task.id, toDoList)
    );

    const removeBtn = listItem.querySelector(".remove__btn");
    removeBtn.addEventListener("click", () => removeTask(task.id, toDoList));

    const editBtn = listItem.querySelector(".edit__btn");
    const taskText = listItem.querySelector(".task__text");
    const editInput = listItem.querySelector(".edit__input");
    editBtn.addEventListener("click", () => {
      listItem.classList.toggle("editing");
      editBtn.innerHTML = listItem.classList.contains("editing")
        ? `<img src="./icons/✅.png" alt="" >`
        : `<img src="./icons/✏️.png" alt=""/>`;
      removeBtn.innerHTML = listItem.classList.contains("editing")
        ? `<img src="./icons/🗑.png" alt="" />`
        : `<img src="./icons/❌.png" alt=""/>`;
      taskText.style.display = listItem.classList.contains("editing")
        ? "none"
        : "block";
      editInput.style.display = listItem.classList.contains("editing")
        ? "block"
        : "none";
    });
    if (listItem.classList.contains("editing")) {
      editInput.focus();
    }
    editInput.addEventListener("blur", () => {
      const newText = editInput.value.trim();

      if (newText) {
        editTask(task.id, newText);
        listItem.classList.remove("editing");
        taskText.style.display = "block";
        editInput.style.display = "none";
        return;
      }
      taskText.style.display = "block";
      editInput.style.display = "none";
    });

    tasks.append(listItem);
  });
}


/* 1. написать функцию редактирования 
которвая принимает в качестве параметра отредактированный текст и id 
2. Функция должна отработать либо при потере фокуса, либо при клике на карандаш


3. посмотьреть тему LocolStorage
*/

/* console.log(form); */

/* 1. ВЫВЕСТИ В КОНСоль как добавляются задачи в масив
1.1 повесить слушатель событий на форму (событие отправки формы)
1.2. достать value input 
event.target.value
сщдать объект task

рендерить список с задачами

todocontent ввынести из forEach

Сделать проверку
при ввызое renderTasks, существует ли уже список с задачами, если нет, 
то создать и сделать append, если существует, то отчистить.

Вынести логику создания задачи в отдельную функцию

вывести текст задачи
*/
