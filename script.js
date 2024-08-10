let add = document.getElementById("add");
let input = document.getElementById("input");

// Helper function to get items from local storage
function getItems() {
  const items = localStorage.getItem("items");
  return items ? JSON.parse(items) : [];
}

// Helper function to save items to local storage
function saveItems(items) {
  localStorage.setItem("items", JSON.stringify(items));
}

// Function to render items
function renderItems() {
  const items = getItems();
  const itemList = document.querySelector(".task-con");
  itemList.innerHTML = "";
  items.forEach((item) => {
    const li = document.createElement("li");
    li.innerHTML = `
      <input type="checkbox" ${item.isStatus ? "checked" : ""} data-id="${
      item.id
    }"/>
      <span class="${item.isStatus ? "completed" : ""}">${item.task}</span>
    `;
    itemList.appendChild(li);
  });

  // Add event listeners to the checkboxes
  document.querySelectorAll(".task-con li input").forEach((checkbox) => {
    checkbox.addEventListener("change", (e) => {
      const id = parseInt(e.target.getAttribute("data-id"));
      updateStatus(id, e.target.checked);
    });
  });
}

function addTask() {
  if (input.value === "") {
    alert("You must write something");
  } else {
    const newItem = {
      id: Date.now(),
      task: input.value,
      isStatus: false,
    };

    const items = getItems();
    items.push(newItem);
    saveItems(items);

    input.value = "";
    renderItems();
  }
}

function updateStatus(id, isChecked) {
  let items = getItems();
  items = items.map((item) => {
    if (item.id === id) {
      return { ...item, isStatus: isChecked };
    }
    return item;
  });
  saveItems(items);
  renderItems();
}

function selects() {
  var ele = document.querySelectorAll(".task-con li input");
  for (var i = 0; i < ele.length; i++) {
    ele[i].checked = true;
    ele[i].nextElementSibling.classList.add("completed");
  }

  let items = getItems();
  items = items.map((e) => {
    if (!e.isStatus) {
      return { ...e, isStatus: true };
    }
    return e;
  });

  saveItems(items);
  renderItems();
}

// Function to handle item deletion
function deleteItem() {
  let items = getItems();
  items = items.filter((item) => !item.isStatus);
  saveItems(items);
  renderItems();
}

// Initial render
renderItems();

function checkedTask1() {
  const items = getItems();
  const container = document.querySelector(".task-con");
  container.innerHTML = "";
  items.forEach((item) => {
    if (item.isStatus) {
      container.innerHTML += `<li><input type="checkbox" checked data-id="${
        item.id
      }"/><span  class="${item.isStatus ? "completed" : ""}">${
        item.task
      }</span></li>`;
    }
  });
}

function uncheckedTask1() {
  const items = getItems();
  const container = document.querySelector(".task-con");
  container.innerHTML = "";
  items.forEach((item) => {
    if (!item.isStatus) {
      container.innerHTML += `<li><input type="checkbox" data-id="${item.id}"/><span>${item.task}</span></li>`;
    }
  });
}

function all1() {
  renderItems();
}
