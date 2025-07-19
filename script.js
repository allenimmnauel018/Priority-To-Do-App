// ==== Task Handling ====

function getTasksFromStorage() {
  return JSON.parse(localStorage.getItem("tasks")) || [];
}

function saveTasksToStorage(tasks) {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function renderTasks() {
  const categories = [
    "urgentImportant",
    "notUrgentImportant",
    "urgentNotImportant",
    "notUrgentNotImportant"
  ];

  const tasks = getTasksFromStorage();

  categories.forEach(category => {
    const ul = document.querySelector(`#${category} ul`);
    ul.innerHTML = "";

    tasks
      .filter(task => task.category === category)
      .forEach((task, index) => {
        const li = document.createElement("li");
        li.textContent = task.text;

        const delBtn = document.createElement("button");
        delBtn.textContent = "✖";
        delBtn.onclick = () => {
          deleteTask(task.text, task.category);
        };

        li.appendChild(delBtn);
        ul.appendChild(li);
      });
  });
}

function addTask() {
  const taskInput = document.getElementById("taskInput");
  const category = document.getElementById("taskCategory").value;
  const text = taskInput.value.trim();

  if (!text) {
    alert("Please enter a task.");
    return;
  }

  const tasks = getTasksFromStorage();
  tasks.push({ text, category });
  saveTasksToStorage(tasks);
  renderTasks();

  taskInput.value = "";
}

function deleteTask(text, category) {
  let tasks = getTasksFromStorage();
  tasks = tasks.filter(task => !(task.text === text && task.category === category));
  saveTasksToStorage(tasks);
  renderTasks();
}

// === Contact Form Validation and Alert on Submit ===
document.querySelector("form").addEventListener("submit", function (e) {
  e.preventDefault(); // Prevent form from submitting normally

  const name = this.querySelector('input[placeholder="Your Name"]').value.trim();
  const email = this.querySelector('input[placeholder="Your Email"]').value.trim();
  const message = this.querySelector("textarea").value.trim();

  if (!name || !email || !message) {
    alert("Please fill in all contact form fields.");
    return;
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(email)) {
    alert("Please enter a valid email address.");
    return;
  }

  // Simulate successful submission
  alert("Thank you! Your message has been received.");

  // Optionally reset the form
  this.reset();
});


// ==== Initialize on Load ====
window.onload = renderTasks;
