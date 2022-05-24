'use strict';

const input = document.querySelector('.input .divtext');
const inputCon = document.querySelector('.input');
const inputBtn = document.querySelector('.input button');
const todo = document.querySelector('.todo');

const completedTasks = document.querySelector('.completed-tasks');

const actionBtn = document.querySelector('.action-btn');

const confirmWindow = document.querySelector('.confirm-window');
const confirmDelete = document.querySelector('.confirm-window .delete');
const confirmCancel = document.querySelector('.confirm-window .cancel');
const confirmBG = document.querySelector('.confirm-close-bg');


const todoDetails = document.querySelector('.todo-details');
const todoDetailsSummary = document.querySelector('.todo-details__summary');
const todoDetailsTriangle = document.querySelector('.todo-details__triangle');
if(localStorage.getItem("todoDetails")) {
  todoDetails.open = JSON.parse(localStorage.getItem("todoDetails"));
}
if(todoDetails.open) {
  todoDetailsTriangle.style.transform = "rotate(90deg)";
} else {
  todoDetailsTriangle.style.transform = "rotate(0)";
}
todoDetailsSummary.onclick = () => {
  localStorage.setItem("todoDetails", JSON.stringify(!todoDetails.open));
  if(!todoDetails.open) {
    todoDetailsTriangle.style.transform = "rotate(90deg)";
  } else {
    todoDetailsTriangle.style.transform = "rotate(0)";
  }
};


if(localStorage.getItem("todo")) {
  todo.innerHTML = localStorage.getItem("todo");
}
if(localStorage.getItem("completedTasks")) {
  completedTasks.innerHTML = localStorage.getItem("completedTasks");
}
let todoElem = document.querySelectorAll('.todo__elem');
let todoDeleteBtn = document.querySelectorAll('.todo__delete-btn');

let todoCheckbox = document.querySelectorAll(".todo__checkbox");
const completedTasksCheckbox = document.querySelectorAll(".completed-tasks .todo__checkbox");

for(let i=0; i<completedTasksCheckbox.length; i++) {
  completedTasksCheckbox[i].checked = true;
}

for(let i=0; i<todoCheckbox.length; i++) {
  todoCheckbox[i].onclick = () => {
    if(todoCheckbox[i].checked) {
      completedTasks.prepend(todoElem[i]);
    } else {
      todo.prepend(todoElem[i]);
    }
    localStorage.setItem("todo", todo.innerHTML);
    localStorage.setItem("completedTasks", completedTasks.innerHTML);
  };
}


for (let i=0; i<todoDeleteBtn.length; i++) {
  todoDeleteBtn[i].onclick = () => {
    confirmWindow.style.transform = "translateY(0)";
    confirmBG.className = "confirm-close-bg__open";
    confirmDelete.onclick = () => {
      todoElem[i].remove();
      localStorage.setItem("todo", todo.innerHTML);
      localStorage.setItem("completedTasks", completedTasks.innerHTML);
      confirmBG.className = "confirm-close-bg";
      confirmWindow.style.transform = "translateY(100%)";
    };
  };
}

inputBtn.onclick = () => {
  if (input.innerText !== '') {
    todo.insertAdjacentHTML('afterbegin', `
      <div class="todo__elem">
        <label class="checkbox-label">
          <input type="checkbox" class="todo__checkbox">
          <div class="checkbox-label__checkbox"></div>
        </label>
        <span class="todo__text">${input.innerText}</span>
        <button class="todo__delete-btn"></button>
      </div>
    `);
    input.innerHTML = '';
    
    todoElem = document.querySelectorAll('.todo__elem');
    todoDeleteBtn = document.querySelectorAll('.todo__delete-btn');
    for (let i=0; i<todoDeleteBtn.length; i++) {
      todoDeleteBtn[i].onclick = () => {
        confirmWindow.style.transform = "translateY(0)";
        confirmBG.className = "confirm-close-bg__open";
        confirmDelete.onclick = () => {
          todoElem[i].remove();
          localStorage.setItem("todo", todo.innerHTML);
          confirmBG.className = "confirm-close-bg";
          confirmWindow.style.transform = "translateY(100%)";
        };
      };
    }
    localStorage.setItem("todo", todo.innerHTML);
    
    todoCheckbox = document.querySelectorAll(".todo__checkbox");
    for(let i=0; i<todoCheckbox.length; i++) {
      todoCheckbox[i].onclick = () => {
        if(todoCheckbox[i].checked) {
          completedTasks.prepend(todoElem[i]);
        } else {
          todo.prepend(todoElem[i]);
        }
        localStorage.setItem("todo", todo.innerHTML);
        localStorage.setItem("completedTasks", completedTasks.innerHTML);
      };
    }
  }
};

confirmCancel.onclick = () => {
  confirmWindow.style.transform = "translateY(100%)";
  confirmBG.className = "confirm-close-bg";
};
confirmBG.onclick = () => {
  confirmWindow.style.transform = "translateY(100%)";
  confirmBG.className = "confirm-close-bg";

  actionBtn.style.transform = "rotate(0)";
  actionBtn.className = "action-btn";
  inputCon.style.transform = "translateY(-100%)";
};


input.onkeydown = (event) => {
  if(event.keyCode === 13) {  // В данном случае "13" равен клавише "Enter"
    inputBtn.click();
    input.blur();
    confirmBG.className = "confirm-close-bg";
    actionBtn.style.transform = "rotate(0)";
    actionBtn.className = "action-btn";
    inputCon.style.transform = "translateY(-100%)";
  }
};


/*=== ACTION BTN ===*/
actionBtn.onclick = () => {
  if(actionBtn.style.transform === "rotate(0deg)" || actionBtn.style.transform === "") {
    actionBtn.style.transform = "rotate(45deg)";
    input.focus();
    inputCon.style.transform = "translateY(0%)";
    confirmBG.className = "confirm-close-bg__open";
    if(input.innerText !== '' && actionBtn.className === "action-btn") {
      actionBtn.style.transform = "rotate(180deg)";
      actionBtn.className = "action-btn__check-mark";
    }
  } else if(actionBtn.style.transform === "rotate(180deg)") {
    inputBtn.click();
    confirmBG.className = "confirm-close-bg";
    actionBtn.style.transform = "rotate(0)";
    actionBtn.className = "action-btn";
    inputCon.style.transform = "translateY(-100%)";
  } else {
    actionBtn.style.transform = "rotate(0)";
    inputCon.style.transform = "translateY(-100%)";
    confirmBG.className = "confirm-close-bg";
    if(input.innerText !== '') {
      inputBtn.click();
    }
  }
};

input.oninput = () => {
  if(input.innerText !== '') {
    actionBtn.style.transform = "rotate(180deg)";
    actionBtn.className = "action-btn__check-mark";
  } else {
    actionBtn.style.transform = "rotate(45deg)";
    actionBtn.className = "action-btn";
  }
};
