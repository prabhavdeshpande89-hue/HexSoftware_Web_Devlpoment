const form = document.getElementById("todo-form");
const taskInput = document.getElementById("task-input");
const taskList = document.getElementById("task-list");
const popup = document.getElementById("popup");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

// Save tasks to localStorage
function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Show a popup with message
function showPopup(message) {
  popup.textContent = message;
  popup.style.display = "block";
  setTimeout(() => {
    popup.style.display = "none";
  }, 2000);
}

// Render tasks to the DOM
function renderTasks() {
  taskList.innerHTML = "";
  tasks.forEach((task, index) => {
    const li = document.createElement("li");
    li.className = "task-item" + (task.completed ? " completed" : "");
    li.innerHTML = `
      <span>${task.text}</span>
      <div class="task-buttons">
        <button class="complete-btn" onclick="toggleComplete(${index})">
          ${task.completed ? "Undo" : "Complete"}
        </button>
        <button onclick="removeTask(${index})">Delete</button>
      </div>
    `;
    taskList.appendChild(li);
  });
}

// Add a task
function addTask(text) {
  tasks.push({ text, completed: false });
  saveTasks();
  renderTasks();
  showPopup("Task added successfully!");
}

// Remove a task
function removeTask(index) {
  tasks.splice(index, 1);
  saveTasks();
  renderTasks();
}

// Toggle complete
function toggleComplete(index) {
  tasks[index].completed = !tasks[index].completed;
  saveTasks();
  renderTasks();
}

// Handle form submit
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const taskText = taskInput.value.trim();
  if (taskText !== "") {
    addTask(taskText);
    taskInput.value = "";
  }
});

// Initial render
renderTasks();
