const STORAGE_KEY = 'todoLists';
const ACTIVE_LIST_KEY = 'activeListId';

export function saveLists(lists) {
	localStorage.setItem(STORAGE_KEY, JSON.stringify(lists));
}

export function loadLists() {
	return JSON.parse(localStorage.getItem(STORAGE_KEY));
}

export function saveActiveListId(id) {
	localStorage.setItem(ACTIVE_LIST_KEY, id);
}

export function loadActiveListId() {
	return localStorage.getItem(ACTIVE_LIST_KEY);
}
