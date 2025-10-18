import { getActiveList, updateTaskText } from '../../listsManager.js';
import { renderTodoList } from './todoList.js';

const editDialogEl = document.getElementById('editDialog');
const dialogInputEl = editDialogEl.querySelector('input');
const dialogSaveBtn = editDialogEl.querySelector('#saveBtn');
const dialogCloseBtn = editDialogEl.querySelector('#closeBtn');

dialogSaveBtn.addEventListener('click', handleEditSave);
dialogCloseBtn.addEventListener('click', () => editDialogEl.close());

export function openEditDialog(taskId) {
	const activeList = getActiveList();
	const task = activeList.tasks.find(t => t.id === taskId);
	dialogInputEl.value = task.text;
	dialogInputEl.dataset.id = taskId;
	editDialogEl.showModal();
}

function handleEditSave() {
	const activeList = getActiveList();
	const taskId = dialogInputEl.dataset.id;
	const task = activeList.tasks.find(task => task.id === taskId);
	const newText = dialogInputEl.value.trim();

	if (!newText || newText === task.text) return;

	updateTaskText(taskId, newText);

	renderTodoList(activeList);
}
