import {
	saveLists,
	loadLists,
	loadActiveListId,
	saveActiveListId,
} from './storage.js';

const initialData = [
	{
		id: 'my-day',
		title: 'My Day',
		tasks: [],
	},
];

let lists = loadLists() || initialData;
let activeListId = loadActiveListId() || lists[0]?.id;

export function getLists() {
	return lists;
}

export function getActiveList() {
	return lists.find(list => list.id === activeListId);
}

export function getActiveListId() {
	return activeListId;
}

export function setActiveListId(id) {
	if (!id) return;
	activeListId = id;
	saveActiveListId(id);
}

export function addList(id, title) {
	const newList = { id, title, tasks: [] };
	lists.push(newList);
	saveLists(lists);
	return newList;
}

export function removeList() {
	const previousIndex = lists.findIndex(el => el.id === activeListId) - 1;

	lists = lists.filter(list => list.id !== activeListId);

	setActiveListId(lists[previousIndex].id);
	saveLists(lists);
}

export function updateListName(newListName) {
	getActiveList().title = newListName;
	saveLists(lists);
}

export function addTask(text) {
	const newTask = { id: Date.now().toString(), text, completed: false };
	getActiveList().tasks.push(newTask);
	saveLists(lists);
	return newTask;
}

export function deleteTask(taskId) {
	const activeList = getActiveList();
	activeList.tasks = activeList.tasks.filter(t => t.id !== taskId);
	saveLists(lists);
}

export function changeTaskState(e) {
	const id = e.currentTarget.getAttribute('id');
	const activeList = getActiveList();
	const task = activeList.tasks.find(task => task.id === id);
	task.completed = !task.completed;
	saveLists(getLists());
}

export function updateTaskText(taskId, newText) {
	const task = getActiveList().tasks.find(t => t.id === taskId);
	task.text = newText;
	saveLists(lists);
}
