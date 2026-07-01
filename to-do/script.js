document.addEventListener("DOMContentLoaded", () => {
  const welcomePage = document.getElementById("welcomePage");
  const todoPage = document.getElementById("todoPage");
  const startBtn = document.getElementById("startBtn");
  const taskInput = document.getElementById("taskInput");
  const prioritySelect = document.getElementById("prioritySelect");
  const addBtn = document.getElementById("addBtn");
  const taskList = document.getElementById("taskList");

  // Switch to To-Do Page
  startBtn.addEventListener("click", () => {
    welcomePage.classList.add("hidden");
    todoPage.classList.remove("hidden");
  });

  // Add Task
  addBtn.addEventListener("click", () => {
    const taskText = taskInput.value.trim();
    const priority = prioritySelect.value;
    if (taskText === "") return;

    const li = document.createElement("li");
    li.className = `task-item ${priority}`;
    li.innerHTML = `
      <span class="task-text">${taskText}</span>
      <div class="task-actions">
        <button class="tickBtn">✔</button>
        <button class="editBtn">✎</button>
        <button class="deleteBtn">✖</button>
      </div>
    `;

    taskList.appendChild(li);
    taskInput.value = "";

    // Tick task
    li.querySelector(".tickBtn").addEventListener("click", () => {
      li.classList.toggle("completed");
      if (li.classList.contains("completed")) {
        taskList.appendChild(li); // move to bottom
      } else {
        sortTasks(); // re-sort when uncompleted
      }
    });

    // Edit task
    li.querySelector(".editBtn").addEventListener("click", () => {
      const newText = prompt("Edit your task:", li.querySelector(".task-text").textContent);
      if (newText !== null && newText.trim() !== "") {
        li.querySelector(".task-text").textContent = newText.trim();
      }

      const newPriority = prompt("Change priority color (red, blue, yellow, green):", priority);
      if (["red", "blue", "yellow", "green"].includes(newPriority)) {
        li.className = `task-item ${newPriority}`;
        sortTasks();
      }
    });

    // Delete task
    li.querySelector(".deleteBtn").addEventListener("click", () => {
      li.remove();
    });

    sortTasks();
  });

  // Sort tasks by priority: red > blue > yellow > green
  function sortTasks() {
    const tasks = Array.from(taskList.children).filter(t => !t.classList.contains("completed"));
    const completed = Array.from(taskList.children).filter(t => t.classList.contains("completed"));

    const priorityOrder = { red: 1, blue: 2, yellow: 3, green: 4 };

    tasks.sort((a, b) => {
      const aPriority = Object.keys(priorityOrder).find(p => a.classList.contains(p));
      const bPriority = Object.keys(priorityOrder).find(p => b.classList.contains(p));
      return priorityOrder[aPriority] - priorityOrder[bPriority];
    });

    taskList.innerHTML = "";
    tasks.forEach(t => taskList.appendChild(t));
    completed.forEach(c => taskList.appendChild(c));
  }
});
