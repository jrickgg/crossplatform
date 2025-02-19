// script.js
document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('task-input');
    const addTaskButton = document.getElementById('add-task');
    const taskList = document.getElementById('task-list');

    // Load tasks from local storage
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    renderTasks();

    addTaskButton.addEventListener('click', () => {
        const taskText = taskInput.value.trim();
        if (taskText !== '') {
            tasks.push({ text: taskText, completed: false }); // Add completed status
            saveTasks();
            renderTasks();
            taskInput.value = ''; // Clear input field
        }
    });

    taskList.addEventListener('click', (event) => {
        if (event.target.tagName === 'BUTTON') {
            const index = Array.from(event.target.parentNode.parentNode.children).indexOf(event.target.parentNode); //Get the index of li
            tasks.splice(index, 1); //Remove the task from the array
            saveTasks();
            renderTasks();
        }
    });

    function renderTasks() {
        taskList.innerHTML = ''; // Clear existing tasks
        tasks.forEach((task, index) => {
            const li = document.createElement('li');
            const span = document.createElement('span');
            span.textContent = task.text;
            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Delete';
            li.appendChild(span);
            li.appendChild(deleteButton);
            taskList.appendChild(li);
        });
    }

    function saveTasks() {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }
});