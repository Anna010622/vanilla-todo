import { getActiveList, getActiveListId } from '../../listsManager.js';
import { createTodoElement } from './todoUi.js';

export function renderTodoList(list) {
	const todoListEl = document.getElementById(`panel-${getActiveListId()}`);
	if (!todoListEl) return;

	if (getActiveList().tasks.length === 0) {
		todoListEl.innerHTML =
			'<li class="empty-message">There are no tasks in this list.</li>';
		return;
	}

	todoListEl.innerHTML = '';
	const fragment = document.createDocumentFragment();
	list.tasks.forEach(task => fragment.appendChild(createTodoElement(task)));
	todoListEl.appendChild(fragment);
}
