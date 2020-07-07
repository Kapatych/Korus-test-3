let state = {
  todos: [
    { id: 1, title: "First todo", status: "Open" },
    { id: 2, title: "Second todo", status: "In progress" },
    { id: 3, title: "Third todo", status: "Open" },
    { id: 4, title: "Fourth todo", status: "Close" },
  ],
  filter: "",
  search: "",
};

const todoList = document.querySelector(".todo-list");
const todoForm = document.querySelector(".todo-form");
const todoInput = todoForm.querySelector(".todo-input");
const modal = document.querySelector(".modal");
const modalInstance = M.Modal.init(modal);
const filterButtons = document.querySelectorAll(".filter");
const searchInput = document.querySelector(".search-input");

const renderTodo = ({ title, status }) => {
  let container = document.createElement("li");
  container.classList.add("collection-item");
  container.classList.add("row");
  container.insertAdjacentHTML(
    "beforeend",
    `<span class="col s9">${title}</span>`
  );

  const selects = ["Open", "In progress", "Close"].map(
    (st) =>
      `<option value="${st}" ${status === st ? "selected" : ""}>${st}</option>`
  );

  container.insertAdjacentHTML(
    "beforeend",
    `<div class="input-field col s2">
    <select> ${selects.join("")} </select>
    <label>Status</label>
  </div>`
  );
  container.insertAdjacentHTML(
    "beforeend",
    `<a class="waves-effect waves-light btn remove col s1"><i class="material-icons">delete</i></a>`
  );
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

const searchTodo = (value) => {
  state.search = value;
  updateTodos();
};

const changeStatusHandler = (value, idx) => {
  state.todos[idx].status = value;
  updateTodos();
};

const renderTodos = () => {
  state.todos
    .filter((el) => el.status.includes(state.filter))
    .filter((el) => el.title.toLowerCase().includes(state.search.toLowerCase()))
    .forEach((el) => todoList.append(renderTodo(el)));

  const removeButtons = document.querySelectorAll(".remove");
  removeButtons.forEach((btn, idx) =>
    btn.addEventListener("click", () => removeHandler(idx))
  );

  const selects = document.querySelectorAll("select");
  M.FormSelect.init(selects);
  selects.forEach((s, idx) =>
    s.addEventListener("change", (e) =>
      changeStatusHandler(e.target.value, idx)
    )
  );
};

const clearTodos = () =>
  todoList.querySelectorAll(".collection-item").forEach((el) => el.remove());

const updateTodos = () => {
  clearTodos();
  renderTodos();
};

const submitHandler = (e) => {
  e.preventDefault();
  const newTodo = {
    id: state.length + 1,
    title: todoInput.value,
    status: "Open",
  };
  state.todos.push(newTodo);
  updateTodos();
  todoInput.blur();
  todoForm.reset();
  modalInstance.close();
};

todoForm.addEventListener("submit", (e) => submitHandler(e));
searchInput.addEventListener("change", (e) => searchTodo(e.target.value));
filterButtons.forEach((btn) =>
  btn.addEventListener("click", (e) => filterTodos(e.target.value))
);

renderTodos();
