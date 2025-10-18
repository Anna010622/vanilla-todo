import { setActiveListId, getActiveList, addList } from '../../listsManager.js';
import { renderTodoList } from '../todo/todoList.js';
import { todoInput } from '../todo/addTodoForm.js';
import { createNewTab, createNewTabPanel } from './tabsUI.js';

const tabsContainer = document.querySelector('.tab-component');
export const tabsHeader = tabsContainer.querySelector('.tabs-header > ul');
const tabButtons = tabsHeader.getElementsByClassName('tab-button');
export const tabPanelsContainer = tabsContainer.querySelector('.tab-panels');
const tabPanels = tabsContainer.getElementsByClassName('todo-list');
const addListForm = tabsContainer.querySelector('#add-list-form');
const listNameInput = tabsContainer.querySelector('#list-name-input');

tabsHeader.addEventListener('click', e => {
	const activeTab = e.target.closest('li');

	if (!activeTab) return;
	e.preventDefault();
	setActiveTab(activeTab);

	const fullTabId = activeTab.firstElementChild.id;
	const cleanId = fullTabId.replace('tab-', '');

	setActiveListId(cleanId);
	let activeList = getActiveList();
	renderTodoList(activeList);

	const activePanel = [...tabPanels].find(
		tab => tab.getAttribute('aria-labelledby') === fullTabId
	);

	setActiveTabPanel(activePanel);
});

listNameInput.addEventListener('mouseover', () => {
	listNameInput.focus();
});

addListForm.addEventListener('submit', e => {
	e.preventDefault();

	const tabTitle = listNameInput.value;
	if (!tabTitle) return;
	const id = Date.now().toString();

	const newTab = createNewTab(tabTitle, id);
	tabsHeader.appendChild(newTab);
	setActiveTab(newTab);
	setActiveListId(id);

	addList(id, tabTitle);

	const newTabPanel = createNewTabPanel(id);
	tabPanelsContainer.appendChild(newTabPanel);
	setActiveTabPanel(newTabPanel);

	addListForm.reset();

	todoInput.focus();
});

function setActiveTab(tab) {
	[...tabButtons].forEach(tabBtn => {
		tabBtn.removeAttribute('aria-current');
		tabBtn.parentElement
			.querySelector('.tab-button-icon')
			?.setAttribute('hidden', true);
	});

	tab.firstElementChild.setAttribute('aria-current', 'tab');
	tab.children[1].removeAttribute('hidden');
}

function setActiveTabPanel(panel) {
	[...tabPanels].forEach(tabPanel => {
		tabPanel.setAttribute('hidden', true);
	});

	panel.removeAttribute('hidden');
}
