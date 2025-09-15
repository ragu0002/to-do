"use strict";
import { getRandomNum, getQ } from "../utils/utils.js";
const Task = getQ(".addTask");
const listDone = getQ(".listDone");
const list = getQ(".list");

//lager arrayet vi skal putte objektene inn i
const taskArr = [];
//gjør det mulig å vise arrayet i consolen
window.taskArr = taskArr;
//lager arrayet vi skal flytte objektene til når oppgaven er "ferdig"
const doneArr = [];

Task.addEventListener("click", addTask);

function addTask() {
  console.log("add task");
  //lager li elementet og gir det en class og et dataset
  const li = document.createElement("li");
  li.classList.add("element");
  li.dataset.id = "";
  //putter elenter inne i li
  li.innerHTML = `
    <input type="checkbox" name="todoCheck">
    <input type="text">
    <button class="submit">Submit</button>
    <button class="delete">Delete</button>
  `;
  //putter li elementet inne i listen vi allerede har hardcodet i html
  list.appendChild(li);
  //peker på submit og delete knappene og viser dem til forskjellige fungsjoner
  const submitButton = li.querySelector(".submit");
  const deleteButton = li.querySelector(".delete");
  deleteButton.addEventListener("click", deleteObject);
  submitButton.addEventListener("click", addToArr);
}

function addToArr(evt) {
  console.log("add to arr");
  //finner det nærmeste .elemtet utenfor det som bli klikket på. I dette tilfellet <li> som ligger rundt submittbutton
  const element = evt.target.closest(".element");
  //finner inputfeltene inne i <li>-elementet
  const input = element.querySelector('input[type="text"]');
  const inputCheck = element.querySelector('input[type="checkbox"]');
  console.log("Checkbox is checked?", inputCheck.checked);
  //hvis elementet allerede har en id, betyr det at det er lagt til før — da skal vi ikke legge det til i arrayet på nytt
  if (element.dataset.id) {
    console.log("Task already exists. Not adding again.");
    return;
  }
  //lager objektet som skal inn i arrayet
  const toDoObj = {
    //navnet er det man skrev i input feltet
    name: input.value,
    //id er et random id nr
    id: self.crypto.randomUUID(),
    done: inputCheck.checked,
  };

  //gir elementet den samme ideen som obj
  element.dataset.id = toDoObj.id;
  //putter objektet i arrayet
  taskArr.push(toDoObj);
  //gjør det mulig å endre på inputet og oppdatere arrayet på samme tid
  input.addEventListener("input", () => {
    const obj = taskArr.find((task) => task.id === toDoObj.id);
    if (obj) {
      obj.name = input.value;
      console.log("Live update:", obj);
    }
  });
  console.log("arr", taskArr);
  //når brukeren klikker på checkboxen, oppdaterer vi objektets "done"-verdi og flytter li til riktig liste
  inputCheck.addEventListener("change", () => {
    const correspondingDataObject = taskArr.find((toDo) => toDo.id === toDoObj.id);
    if (correspondingDataObject) {
      correspondingDataObject.done = inputCheck.checked;
      console.log("Checkbox updated:", correspondingDataObject);
      writeTodo(correspondingDataObject);
    }
  });
  //flytter <li>-elementet mellom "to-do"-listen og "done"-listen basert på objektets done-status
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
//fjerner <li>-elementet fra DOM-en og sletter det fra taskArr eller doneArr
function deleteObject(evt) {
  const li = evt.target.closest(".element");
  const id = li.dataset.id;

  li.remove();
  //findIndex returnerer -1 hvis objektet ikke finnes i arrayet, så vi sjekker først at det faktisk finnes før vi sletter

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
