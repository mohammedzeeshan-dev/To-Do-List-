// Load tasks from localStorage on startup
window.onload = function () {
  const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
  savedTasks.forEach(task => addTask(task.text, task.completed));
};

function addTask(text = null, completed = false) {
  const taskInput = document.getElementById("taskInput");
  const taskText = text || taskInput.value.trim();
  if (taskText === "") return;

  const taskList = document.getElementById("taskList");
  const li = document.createElement("li");
  li.textContent = taskText;
  if (completed) li.classList.add("completed");

  li.addEventListener("click", () => {
    li.classList.toggle("completed");
    saveTasks();
  });

  const delBtn = document.createElement("button");
  delBtn.textContent = "🗑️";
  delBtn.onclick = (e) => {
    e.stopPropagation();
    li.remove();
    saveTasks();
  };

  li.appendChild(delBtn);
  taskList.appendChild(li);

  if (!text) taskInput.value = "";
  saveTasks();
}

function saveTasks() {
  const taskList = document.querySelectorAll("#taskList li");
  const tasks = Array.from(taskList).map(li => ({
    text: li.firstChild.textContent,
    completed: li.classList.contains("completed")
  }));
  localStorage.setItem("tasks", JSON.stringify(tasks));
}
