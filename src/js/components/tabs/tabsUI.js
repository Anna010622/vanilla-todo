import {
	getLists,
	getActiveListId,
	getActiveList,
} from '../../listsManager.js';
import { handleOpenListMenu } from '../listMenu/listMenu.js';
import { handleDragOver, handleDrop } from '../todo/todoDragAndDrop.js';
import { renderTodoList } from '../todo/todoList.js';
import { tabsHeader, tabPanelsContainer } from './tabs.js';

export function createNewTab(tabName, id) {
	const li = document.createElement('li');

	const button = document.createElement('button');
	button.setAttribute('id', `tab-${id}`);
	button.className = 'btn tab-button';
	button.textContent = tabName;

	const editButton = document.createElement('button');
	editButton.className = 'tab-button tab-button-icon';
	editButton.setAttribute('hidden', true);
	editButton.innerHTML = `
		<svg class="icon" width="20" height="20">
			<use href="./assets/icons/sprite.svg#dots"></use>
		</svg>`;
	editButton.addEventListener('click', handleOpenListMenu);

	li.appendChild(button);
	li.appendChild(editButton);
	return li;
}

export function createNewTabPanel(id) {
	const ul = document.createElement('ul');
	ul.setAttribute('aria-labelledby', `tab-${id}`);
	ul.setAttribute('id', `panel-${id}`);
	ul.className = 'todo-list';

	ul.addEventListener('dragover', handleDragOver);
	ul.addEventListener('drop', handleDrop);

	return ul;
}

export function renderTabs() {
	if (!tabsHeader) return;
	tabsHeader.innerHTML = '';
	const fragment = document.createDocumentFragment();
	getLists().forEach(list => {
		const newTab = createNewTab(list.title, list.id);
		if (list.id === getActiveListId()) {
			newTab.firstElementChild.setAttribute('aria-current', 'tab');
			newTab.children[1].removeAttribute('hidden');
		}
		fragment.appendChild(newTab);
	});
	tabsHeader.appendChild(fragment);
}

export function renderPanels() {
	if (!tabPanelsContainer) return;
	tabPanelsContainer.innerHTML = '';
	const fragment = document.createDocumentFragment();
	getLists().forEach(list => {
		const newPanel = createNewTabPanel(list.id);
		if (list.id !== getActiveListId()) newPanel.setAttribute('hidden', true);
		fragment.appendChild(newPanel);
	});
	tabPanelsContainer.appendChild(fragment);

	renderTodoList(getActiveList());
}
