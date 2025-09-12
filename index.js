"use strict";
import { getRandomNum, getQ } from "../utils/utils.js";
const Task = getQ(".addTask");
const list = getQ("ul");

Task.addEventListener("click", addTask);

function addTask() {
  console.log("add task");
  const li = document.createElement("li");
  let textString = "queen shit";
  const input = document.createElement("input");
  input.type = "text";
  input.placeholder = "Type your task here...";
  li.textContent = textString;
  li.appendChild(input);
  list.appendChild(li);
}
