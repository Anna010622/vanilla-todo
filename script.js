const todoListEl = document.querySelector('#todoList');
const todoFormEl = document.querySelector('#form');
const editDialogEl = document.getElementById('editDialog');
const dialogInputEl = editDialogEl.querySelector('input');
const dialogSaveBtn = editDialogEl.querySelector('#saveBtn');
const dialogCloseBtn = editDialogEl.querySelector('#closeBtn');

const STORAGE_KEY = 'todoList';

let tasks = loadTodoList();
renderTodoList(tasks);

todoFormEl.addEventListener('submit', handleAddTodo);
dialogSaveBtn.addEventListener('click', handleSaveChanges);
dialogCloseBtn.addEventListener('click', () => editDialogEl.close());

function loadTodoList() {
	return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
}

function updateLocalStorage() {
	localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
}

function handleAddTodo(e) {
	e.preventDefault();
	const taskText = e.target[0].value.trim();

	const newTask = {
		id: Date.now().toString(),
		text: taskText,
		completed: false,
	};

	tasks.push(newTask);
	updateLocalStorage();
	todoListEl.appendChild(createTodoElement(newTask));
	todoFormEl.reset();
}

function createTodoElement(task) {
	const li = document.createElement('li');
	li.className = 'todo-item';
	li.dataset.id = task.id;
	li.draggable = true;

	const label = document.createElement('label');
	const checkbox = document.createElement('input');
	checkbox.setAttribute('type', 'checkbox');
	checkbox.setAttribute('id', task.id);
	if (task.completed) checkbox.setAttribute('checked', '');
	checkbox.addEventListener('change', changeTaskState);
	label.appendChild(checkbox);

	const taskText = document.createElement('span');
	taskText.textContent = task.text;
	label.appendChild(taskText);
	li.appendChild(label);

	const buttonGroup = document.createElement('div');
	buttonGroup.className = 'btn-group';

	const editBtn = createButton('Edit', 'btn-edit', () =>
		openEditDialog(task.id)
	);
	const deleteBtn = createButton('Delete', 'btn-delete', () =>
		deleteTask(task.id)
	);

	buttonGroup.append(editBtn, deleteBtn);
	li.appendChild(buttonGroup);

	return li;
}

function createButton(text, className, handler) {
	const button = document.createElement('button');
	button.type = 'button';
	button.className = `btn ${className}`;
	button.textContent = text;
	button.addEventListener('click', handler);
	return button;
}

function renderTodoList(tasks) {
	todoListEl.innerHTML = '';
	const fragment = document.createDocumentFragment();
	tasks.forEach(task => fragment.appendChild(createTodoElement(task)));
	todoListEl.appendChild(fragment);
}

function changeTaskState(e) {
	const id = e.currentTarget.getAttribute('id');
	const task = tasks.find(task => task.id === id);
	task.completed = !task.completed;
	updateLocalStorage();
}

function deleteTask(taskId) {
	tasks = tasks.filter(t => t.id !== taskId);
	updateLocalStorage();
	renderTodoList(tasks);
}

function openEditDialog(taskId) {
	const task = tasks.find(t => t.id === taskId);
	dialogInputEl.value = task.text;
	dialogInputEl.dataset.id = taskId;
	editDialogEl.showModal();
}

function handleSaveChanges() {
	const taskId = dialogInputEl.dataset.id;
	const task = tasks.find(task => task.id === taskId);

	const newText = dialogInputEl.value.trim();
	if (!newText || newText === task.text) return;

	task.text = newText;
	updateLocalStorage();
	renderTodoList(tasks);
}
