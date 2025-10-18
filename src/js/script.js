import { handleAddTodo, todoFormEl } from './components/todo/addTodoForm.js';
import { renderTabs, renderPanels } from './components/tabs/tabsUI.js';

renderTabs();
renderPanels();

todoFormEl.addEventListener('submit', handleAddTodo);
