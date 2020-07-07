let state = {
  todos: [
    {id: 1, title: 'First todo', status: 'Open'},
    {id: 2, title: 'Second todo', status: 'In progress'},
    {id: 3, title: 'Third todo', status: 'Open'},
    {id: 4, title: 'Fourth todo', status: 'Close'}
  ],
  filter: ''
};

const todoList = document.querySelector('.todo-list');
const todoForm = document.querySelector('.todo-form');
const todoInput = todoForm.querySelector('.todo-input');
const modal = document.querySelector('.modal');
const filterButtons = document.querySelectorAll('.filter');
const instance = M.Modal.init(modal);

filterButtons.forEach(btn => btn.addEventListener('click', (e) => filterTodos(e.target.value)))

const renderTodo = ({title, status}) => {
  let container = document.createElement('li');
  container.classList.add('collection-item');
  container.classList.add('row');
  container.insertAdjacentHTML('beforeend',
    `<span class="col s9">${title}</span><span class="col s2">${status}</span>`);
  container.insertAdjacentHTML('beforeend',
    `<a class="waves-effect waves-light btn remove col s1"><i class="material-icons">delete</i></a>`);
  return container;
};

const removeHandler = (idx) => {
  state.todos.splice(idx, 1);
  updateTodos();
};

const filterTodos = (value) => {
  state.filter = value;
  updateTodos();
};

const renderTodos = () => {
  state.todos.filter(el => el.status.includes(state.filter)).forEach(el => todoList.append(renderTodo(el)));
  const removeButtons = document.querySelectorAll('.remove');
  removeButtons.forEach((btn, idx) => btn.addEventListener('click', () => removeHandler(idx)));
};

const clearTodos = () => todoList.querySelectorAll('.collection-item').forEach(el => el.remove());

const updateTodos = () => {
  clearTodos();
  renderTodos();
};

const submitHandler = (e) => {
  e.preventDefault();
  const newTodo = {
    id: state.length + 1,
    title: todoInput.value,
    status: 'Open'
  };
  state.todos.push(newTodo);
  updateTodos();
  todoInput.blur();
  todoForm.reset();
  instance.close()
};

todoForm.addEventListener('submit', (e) => submitHandler(e));
renderTodos();

