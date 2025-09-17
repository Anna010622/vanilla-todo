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
todoListEl.addEventListener('dragover', handleDragOver);
todoListEl.addEventListener('drop', handleDop);

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
	addDragHandlersOnLi(li, task);

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

	const editBtn = createButton(
		'btn-edit',
		() => openEditDialog(task.id),
		'edit',
		'Edit'
	);
	const deleteBtn = createButton(
		'btn-delete',
		() => deleteTask(task.id),
		'delete',
		'Delete'
	);

	buttonGroup.append(editBtn, deleteBtn);
	li.appendChild(buttonGroup);

	return li;
}

function createButton(className, handler, iconName, text) {
	const button = document.createElement('button');
	button.type = 'button';
	button.className = `btn ${className}`;
	button.setAttribute('aria-label', `${text}.`);
	button.innerHTML = `
		<svg class="icon" width="20" height="20">
			<use href="./sprite.svg#${iconName}"></use>
		</svg>`;
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

function handleDragOver(e) {
	e.preventDefault();
	const draggingEl = document.querySelector('.dragging');
	if (!draggingEl) return;

	const afterEl = getDragAfterElement(todoListEl, e.clientY);
	if (afterEl === null) {
		todoListEl.appendChild(draggingEl);
	} else {
		todoListEl.insertBefore(draggingEl, afterEl);
	}
}

function handleDop(e) {
	e.preventDefault();

	const ids = Array.from(todoListEl.querySelectorAll('.todo-item')).map(
		el => el.dataset.id
	);

	tasks = ids.map(id => tasks.find(t => t.id === id));
	updateLocalStorage();
}

function getDragAfterElement(container, mouseY) {
	const elements = [...container.querySelectorAll('.todo-item:not(.dragging)')];

	for (const el of elements) {
		const rect = el.getBoundingClientRect();
		if (mouseY < rect.top + rect.height / 2) {
			return el;
		}
	}

	return null;
}

function addDragHandlersOnLi(li) {
	li.addEventListener('dragstart', () => {
		li.classList.add('dragging');
	});

	li.addEventListener('dragend', () => {
		li.classList.remove('dragging');
	});
}
