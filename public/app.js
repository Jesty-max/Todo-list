class TodoApp {
  constructor() {
    this.tasks = [];
    this.currentFilter = "all";
    this.init();
  }

  init() {
    // DOM Elements
    this.taskForm = document.getElementById("task-form");
    this.taskInput = document.getElementById("task-input");
    this.tasksList = document.getElementById("tasks-list");
    this.filterButtons = document.querySelectorAll(".filter-btn");

    // Event Listeners
    this.taskForm.addEventListener("submit", (e) => this.handleSubmit(e));
    this.filterButtons.forEach((btn) => {
      btn.addEventListener("click", () => this.handleFilter(btn));
    });

    // Initial load
    this.loadTasks();
  }

  async loadTasks() {
    try {
      const response = await fetch("http://localhost:3000/api/tasks");
      this.tasks = await response.json();
      this.renderTasks();
    } catch (error) {
      console.error("Error loading tasks:", error);
      this.showError("Failed to load tasks");
    }
  }

  async handleSubmit(e) {
    e.preventDefault();
    const text = this.taskInput.value.trim();

    if (!text) return;

    try {
      const response = await fetch("http://localhost:3000/api/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text }),
      });

      if (!response.ok) throw new Error("Failed to create task");

      const newTask = await response.json();
      this.tasks.push(newTask);
      this.renderTasks();
      this.taskInput.value = "";
    } catch (error) {
      console.error("Error creating task:", error);
      this.showError("Failed to create task");
    }
  }

  async toggleTask(taskId) {
    const task = this.tasks.find((t) => t.id === taskId);
    if (!task) return;

    try {
      const response = await fetch(
        `http://localhost:3000/api/tasks/${taskId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            completed: !task.completed,
          }),
        }
      );

      if (!response.ok) throw new Error("Failed to update task");

      task.completed = !task.completed;
      this.renderTasks();
    } catch (error) {
      console.error("Error updating task:", error);
      this.showError("Failed to update task");
    }
  }

  async deleteTask(taskId) {
    try {
      const response = await fetch(
        `http://localhost:3000/api/tasks/${taskId}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) throw new Error("Failed to delete task");

      this.tasks = this.tasks.filter((task) => task.id !== taskId);
      this.renderTasks();
    } catch (error) {
      console.error("Error deleting task:", error);
      this.showError("Failed to delete task");
    }
  }

  handleFilter(button) {
    this.filterButtons.forEach((btn) => btn.classList.remove("active"));
    button.classList.add("active");
    this.currentFilter = button.dataset.filter;
    this.renderTasks();
  }

  getFilteredTasks() {
    switch (this.currentFilter) {
      case "active":
        return this.tasks.filter((task) => !task.completed);
      case "completed":
        return this.tasks.filter((task) => task.completed);
      default:
        return this.tasks;
    }
  }

  renderTasks() {
    const filteredTasks = this.getFilteredTasks();
    this.tasksList.innerHTML = filteredTasks
      .map(
        (task) => `
            <li class="task-item">
                <input 
                    type="checkbox" 
                    class="task-checkbox"
                    ${task.completed ? "checked" : ""}
                    onchange="todoApp.toggleTask('${task.id}')"
                >
                <span class="task-text ${task.completed ? "completed" : ""}">
                    ${this.escapeHtml(task.text)}
                </span>
                <div class="task-actions">
                    <button class="delete-btn" onclick="todoApp.deleteTask('${
                      task.id
                    }')">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </li>
        `
      )
      .join("");
  }

  escapeHtml(unsafe) {
    return unsafe
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  showError(message) {
    // You could implement a more sophisticated error display here
    alert(message);
  }
}

// Initialize the app
const todoApp = new TodoApp();
