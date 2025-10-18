import { addTask, getActiveList } from '../../listsManager.js';
import { createTodoElement } from './todoUi.js';

export const todoFormEl = document.querySelector('#add-todo-form');
export const todoInput = todoFormEl.querySelector('#input');

export function handleAddTodo(e) {
	e.preventDefault();
	const taskText = todoInput.value.trim();
	const activeList = getActiveList();

	const newTask = addTask(taskText);

	const todoListEl = document.getElementById(`panel-${activeList.id}`);

	todoListEl.appendChild(createTodoElement(newTask));

	todoFormEl.reset();
}
