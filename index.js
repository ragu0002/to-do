"use strict";
import { getRandomNum, getQ } from "../utils/utils.js";
const Task = getQ(".addTask");
const listDone = getQ(".listDone");
const list = getQ(".list");

const taskArr = [];
window.taskArr = taskArr;
const doneArr = [];

Task.addEventListener("click", addTask);

function addTask() {
  console.log("add task");

  const li = document.createElement("li");
  li.classList.add("element");
  li.dataset.id = "";
  li.innerHTML = `
    <input type="checkbox" name="todoCheck">
    <input type="text">
    <button class="submit">Submit</button>
    <button class="delete">Delete</button>
  `;
  list.appendChild(li);
  const submitButton = li.querySelector(".submit");
  const deleteButton = li.querySelector(".delete");
  deleteButton.addEventListener("click", deleteObject);
  submitButton.addEventListener("click", addToArr);
}

function addToArr(evt) {
  console.log("add to arr");
  const element = evt.target.closest(".element");
  const input = element.querySelector('input[type="text"]');
  const inputCheck = element.querySelector('input[type="checkbox"]');
  console.log("Checkbox is checked?", inputCheck.checked);

  if (element.dataset.id) {
    console.log("Task already exists. Not adding again.");
    return;
  }
  const toDoObj = {
    name: input.value,
    id: self.crypto.randomUUID(),
    done: inputCheck.checked,
  };
  element.dataset.id = toDoObj.id;

  taskArr.push(toDoObj);

  input.addEventListener("input", () => {
    const obj = taskArr.find((task) => task.id === toDoObj.id);
    if (obj) {
      obj.name = input.value;
      console.log("Live update:", obj);
    }
  });
  console.log("arr", taskArr);

  inputCheck.addEventListener("change", () => {
    const correspondingDataObject = taskArr.find((toDo) => toDo.id === toDoObj.id);
    if (correspondingDataObject) {
      correspondingDataObject.done = inputCheck.checked;
      console.log("Checkbox updated:", correspondingDataObject);
      writeTodo(correspondingDataObject);
    }
  });
  function writeTodo(elm) {
    const li = document.querySelector(`.element[data-id="${elm.id}"]`);
    if (!li) return;

    if (elm.done) {
      if (list.contains(li)) list.removeChild(li);

      listDone.appendChild(li);
    } else {
      if (listDone.contains(li)) listDone.removeChild(li);
      list.appendChild(li);
    }
  }
}
function deleteObject(evt) {
  const li = evt.target.closest(".element");
  const id = li.dataset.id;

  li.remove();

  const indexInTasks = taskArr.findIndex((task) => task.id === id);
  if (indexInTasks !== -1) {
    taskArr.splice(indexInTasks, 1);
    console.log("Deleted from taskArr:", id);
  }

  const indexInDone = doneArr.findIndex((task) => task.id === id);
  if (indexInDone !== -1) {
    doneArr.splice(indexInDone, 1);
    console.log("Deleted from doneArr:", id);
  }

  console.log("Current taskArr:", taskArr);
  console.log("Current doneArr:", doneArr);
}

/*function addTask() {
  console.log("add task");

  const li = document.createElement("li");
  const p = document.createElement("p");
  p.textContent = "submit";

  const input = document.createElement("input");
  input.type = "text";

  li.appendChild(p);
  li.appendChild(input);

  const list = getQ(".list");
  list.appendChild(li);

  li.firstChild.addEventListener("click", subMitTodo);

  function subMitTodo(evt) {
    const toDoObj = {
      name: input.value,
      id: self.crypto.randomUUID(),
      done: false,
    };
    taskArr.unshift(toDoObj);
    console.log("arr", taskArr);
    writeTodo(toDoObj);
  }
  function writeTodo(evt) {
    list.innerHTML = "";
    taskArr.forEach((toDoObj) => {
      let isChecked;
      if (toDoObj.done === true) {
        isChecked = "checked";
      } else {
        isChecked = "";
      }
      list.innerHTML += `<li data-id="${toDoObj.id}"class="to_do_elm"><input type="checkbox" name="todoCheck" ${isChecked}/><p> ${toDoObj.name}</p></li>`;
    });
    list.querySelectorAll("li").forEach((li) => {
      const checkBox = li.querySelector("input");
      checkBox.addEventListener("click", (evt) => {
        evt.preventDefault();

        const correspondingDataObject = taskArr.find((toDo) => toDo.id === li.dataset.id);
        correspondingDataObject.done = !correspondingDataObject.done;
        console.log("corresponding data is:", correspondingDataObject);
        writeTodo(correspondingDataObject);
      });
      taskDone();
      function taskDone(elm) {
        console.log("task done");
      }
    });
  }
}

/*function addTask() {
  console.log("add task");
  const li = document.createElement("li");
  let textString = "queen shit";
  const input = document.createElement("input");
  input.type = "text";
  input.placeholder = "Type your task here...";
  li.textContent = textString;
  li.appendChild(input);
  list.appendChild(li);
  li.firstChild.addEventListener("click", taskDone);
  function taskDone(elm) {
    console.log("task done");
    elm.target.classList.add("hide");

    elm.target.appendChild(input);
    list.appendChild(elm.target);
  }
}*/
