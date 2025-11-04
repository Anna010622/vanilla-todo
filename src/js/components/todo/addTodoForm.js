import { addTask, getActiveList } from '../../listsManager.js';
import { renderTodoList } from './todoList.js';

export const todoFormEl = document.querySelector('#add-todo-form');
export const todoInput = todoFormEl.querySelector('#input');

export function handleAddTodo(e) {
	e.preventDefault();
	const taskText = todoInput.value.trim();

	addTask(taskText);

	renderTodoList(getActiveList());

	todoFormEl.reset();
}
