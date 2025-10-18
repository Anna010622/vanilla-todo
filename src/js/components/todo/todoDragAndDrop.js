import { getActiveList, getLists } from '../../listsManager.js';
import { saveLists } from '../../storage.js';

export function handleDragOver(e) {
	e.preventDefault();
	const draggingEl = document.querySelector('.dragging');
	if (!draggingEl) return;

	const todoListEl = document.getElementById(`panel-${getActiveList().id}`);
	const afterEl = getDragAfterElement(todoListEl, e.clientY);
	if (afterEl === null) {
		todoListEl.appendChild(draggingEl);
	} else {
		todoListEl.insertBefore(draggingEl, afterEl);
	}
}

export function handleDrop(e) {
	e.preventDefault();

	const activeList = getActiveList();
	const todoListEl = document.getElementById(`panel-${activeList.id}`);

	const ids = Array.from(todoListEl.querySelectorAll('.todo-item')).map(
		el => el.dataset.id
	);

	activeList.tasks = ids.map(id => activeList.tasks.find(t => t.id === id));
	saveLists(getLists());
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

export function addDragHandlersOnLi(li) {
	li.addEventListener('dragstart', () => {
		li.classList.add('dragging');
	});

	li.addEventListener('dragend', () => {
		li.classList.remove('dragging');
	});
}
