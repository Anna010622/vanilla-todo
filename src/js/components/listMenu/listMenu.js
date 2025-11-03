import { removeList, updateListName } from '../../listsManager.js';
import { renderTabs } from '../tabs/tabsUI.js';

export function handleOpenListMenu({ menu, e }) {
	e.stopPropagation();

	const isActive = menu.classList.toggle('active');
	menu.setAttribute('aria-expanded', isActive);

	if (menu.classList.contains('active')) {
		setTimeout(() => {
			document.addEventListener('click', handleOutsideClick);
		});
	} else {
		document.removeEventListener('click', handleOutsideClick);
	}

	function handleOutsideClick(e) {
		if (!menu.contains(e.target)) {
			menu.classList.remove('active');
			menu.setAttribute('aria-expanded', false);
			document.removeEventListener('click', handleOutsideClick);
		}
	}
}

function handleRenameList() {
	const newListName = prompt('Enter new list name', '');
	if (!newListName) return;

	updateListName(newListName);
	renderTabs();
}

function handleDeleteList() {
	removeList();
	renderTabs();
}

export function createListMenu() {
	const menu = document.createElement('div');
	menu.className = 'list-menu';
	menu.setAttribute('aria-expanded', 'false');
	menu.innerHTML = `
	 <button class="menu-item" data-action="rename">Rename list</button>
	 <button class="menu-item" data-action="delete">Delete list</button>
	`;
	menu.addEventListener('click', addActions);
	return menu;
}

function addActions(e) {
	e.stopPropagation();

	const action = e.target.dataset.action;
	if (action === 'rename') handleRenameList();
	if (action === 'delete') handleDeleteList();
}
