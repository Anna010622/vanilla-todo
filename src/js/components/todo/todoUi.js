import { addDragHandlersOnLi } from './todoDragAndDrop.js';
import {
	changeTaskState,
	deleteTask,
	getActiveList,
} from '../../listsManager.js';
import { renderTodoList } from './todoList.js';
import { openEditDialog } from './todoDialog.js';

export function createTodoElement(task) {
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

	const editBtn = createButton({
		className: 'btn-edit',
		icon: 'edit',
		label: 'Edit',
		onClick: () => openEditDialog(task.id),
	});

	const deleteBtn = createButton({
		className: 'btn-delete',
		icon: 'delete',
		label: 'Delete',
		onClick: () => {
			deleteTask(task.id);
			renderTodoList(getActiveList());
		},
	});

	buttonGroup.append(editBtn, deleteBtn);
	li.appendChild(buttonGroup);

	return li;
}

function createButton({ className, icon, label, onClick }) {
	const button = document.createElement('button');
	button.type = 'button';
	button.className = `btn ${className}`;
	button.setAttribute('aria-label', `${label}.`);
	button.innerHTML = `
		<svg class="icon" width="20" height="20">
			<use href="./assets/icons/sprite.svg#${icon}"></use>
		</svg>`;
	button.addEventListener('click', onClick);
	return button;
}
