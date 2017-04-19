const itemList = document.querySelector(".item-list");
const form = document.querySelector(".item-form");
const textInput = document.querySelector(".text-input");
const deleteButton = document.querySelector(".delete-button");
let items = JSON.parse(localStorage.getItem("items")) || [];
function addItem(e) {
  e.preventDefault();
  const text = textInput.value;
  const item = {
    text,
    done: false
  }
  items.push(item);
  addToList();
  localStorage.setItem("items", JSON.stringify(items));
  this.reset();
}
function addToList() {
  itemList.innerHTML = items.map((item, index) => {
    return `<li><input type="checkbox" data-index=${index} id="item${index}" ${item.done ? "checked" : ""}/><label for="item${index}" class="text">${item.text}</label></li>`;
  }).join("");
}
function toggleCheck(e) {
  if(!e.target.matches("input")) return;
  const elem = e.target;
  const index = elem.dataset.index;
  items[index].done = !items[index].done;
  localStorage.setItem("items", JSON.stringify(items));
}
function deleteHandler() {
  items = items.filter((item) => {
    return !item.done;
  });
  localStorage.setItem("items", JSON.stringify(items));
  addToList();
}
form.addEventListener("submit", addItem);
itemList.addEventListener("click", toggleCheck);
deleteButton.addEventListener('click', deleteHandler);
addToList();
