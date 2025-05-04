import {todoss, notess} from './template.js';

// localStorage.clear();
// localStorage.setItem("todoObject", JSON.stringify(todoss));
// localStorage.setItem("notesArray", JSON.stringify(notess));

let todoObject = JSON.parse(localStorage.getItem("todoObject")) || { home: [], today: [], week: [] };
let notesArray = JSON.parse(localStorage.getItem("notesArray")) || [];

console.log(todoObject);

const homePage = document.getElementById("home");
const todayPage = document.getElementById("today");
const weekPage = document.getElementById("week");
const notes = document.getElementById("notes");
const container = document.getElementById("content");
const addBtn = document.getElementById("add");
let currentPage = "home";

const makeMonth = function(string) {
    const num = Number(string);
    if (num === 1) return "Jan";
    else if (num === 2) return "Feb";
    else if (num === 3) return "Mar";
    else if (num === 4) return "Apr";
    else if (num === 5) return "May";
    else if (num === 6) return "Jun";
    else if (num === 7) return "Jul";
    else if (num === 8) return "Aug";
    else if (num === 9) return "Sep";
    else if (num === 10) return "Oct";
    else if (num === 11) return "Nov";
    else if (num === 12) return "Dec";
}

const uid = function(){
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

function clearOtherPages(page) {
    const pages = document.querySelector(".nav");
    for (const child of pages.children) {
        if (page !== child.id && !child.classList.contains("projects")) {
            child.classList.remove("nav_selected");
            const name = child.id;
            const firstChar = name[0];
            child.children[0].innerText = `${String(firstChar).toUpperCase()}${name.substring(1)}`;
        }
    }
    const projectPages = document.querySelector(".project_nav");
    for (const child of projectPages.children) {
        if (page !== child.id && !child.classList.contains("projects")) {
            child.classList.remove("nav_selected");
            const name = child.id;
            child.children[0].innerText = `${name}`;
        }
    }
}

homePage.addEventListener("mouseover", () => {
    homePage.classList.add("nav_selected");
    const text = homePage.children[0];
    text.innerText = "// Home";
});
homePage.addEventListener("mouseout", () => {
    if(currentPage !== "home") {
        const text = homePage.children[0];
        text.innerText = "Home";
        homePage.classList.remove("nav_selected");
    }
});

todayPage.addEventListener("mouseover", () => {
    todayPage.classList.add("nav_selected");
    const text = todayPage.children[0];
    text.innerText = "// Today";
});
todayPage.addEventListener("mouseout", () => {
    if(currentPage !== "today") {
        const text = todayPage.children[0];
        text.innerText = "Today";
        todayPage.classList.remove("nav_selected");
    }
});

weekPage.addEventListener("mouseover", () => {
    weekPage.classList.add("nav_selected");
    const text = weekPage.children[0];
    text.innerText = "// Week";
});
weekPage.addEventListener("mouseout", () => {
    if(currentPage !== "week") {
        const text = weekPage.children[0];
        text.innerText = "Week";
        weekPage.classList.remove("nav_selected");
    }
});

notes.addEventListener("mouseover", () => {
    notes.classList.add("nav_selected");
    const text = notes.children[0];
    text.innerText = "// Notes";
});
notes.addEventListener("mouseout", () => {
    if(currentPage !== "notes") {
        const text = notes.children[0];
        text.innerText = "Notes";
        notes.classList.remove("nav_selected");
    }
});

function addNote(page) {
    // Always reload notesArray from localStorage
    notesArray = JSON.parse(localStorage.getItem("notesArray")) || [];
    const main = document.querySelector(".add-modal-main");
    if (!main) return;
    currentPage = page;

    const header = document.createElement("span");
    const noteTitle = document.createElement("input");
    const noteDescription = document.createElement("input");
    const confirm = document.createElement("button");

    header.innerText = "Create a new note";
    noteTitle.value = "";
    noteDescription.value = "";
    confirm.innerText = "CONFIRM EDIT";

    noteTitle.type = "text";
    noteDescription.type = "text";
    noteTitle.placeholder = "Title...";
    noteDescription.placeholder = "Description...";

    header.className = "add-header";
    noteTitle.className = "add-note-title";
    noteDescription.className = "add-note-description";
    confirm.className = "note-confirm";

    main.appendChild(header);
    main.appendChild(noteTitle);
    main.appendChild(noteDescription);
    main.appendChild(confirm);

    confirm.addEventListener("click", () => confirmAdd());

    function confirmAdd() {
        const newNote = {
            id: uid(),
            title: noteTitle.value,
            description: noteDescription.value
        };
        notesArray.push(newNote);
        localStorage.setItem("notesArray", JSON.stringify(notesArray));
        renderNotes("notes");
        const overlay = document.querySelector(".overlay");
        overlay.innerHTML = "";
        document.body.removeChild(overlay);
    }
}

function addTodo(page) {
    // Always reload todoObject from localStorage
    todoObject = JSON.parse(localStorage.getItem("todoObject")) || { home: [], today: [], week: [] };
    const main = document.querySelector(".add-modal-main");
    if (!main) return;
    
    currentPage = page;
    let priorityStatus = "";

    const header = document.createElement("span");
    const todoTitle = document.createElement("input");
    const todoDescription = document.createElement("input");
    const dueDateContainer = document.createElement("div");
    const dueDate = document.createElement("span");
    const dueDateInput = document.createElement("input");
    const priorityContainer = document.createElement("div");
    const priority = document.createElement("span");
    const priorityLow = document.createElement("button");
    const priorityMedium = document.createElement("button");
    const priorityHigh = document.createElement("button");
    const confirm = document.createElement("button");

    todoTitle.value = "";
    todoDescription.value = "";
    dueDate.innerText = "Due Date:";
    dueDateInput.value = "2025-05-03";
    priority.innerText = "Priority:";
    priorityLow.innerText = "LOW";
    priorityMedium.innerText = "MEDIUM";
    priorityHigh.innerText = "HIGH";
    confirm.innerText = "CONFIRM EDIT";
    header.innerText = "Create a new task";

    todoTitle.type = "text";
    todoDescription.type = "text";
    dueDateInput.type = "date";
    todoTitle.placeholder = "Title...";
    todoDescription.placeholder = "Description...";

    todoTitle.className = "add-title";
    todoDescription.className = "add-description";
    dueDateContainer.className = "add-due-date-container";
    dueDate.className = "add-text";
    priority.className = "add-text";
    dueDateInput.className = "add-due-date-input";
    priorityContainer.className = "add-priority-container";
    priorityLow.className = "edit-priority-btn priority-low-btn";
    priorityMedium.className = "edit-priority-btn priority-medium-btn";
    priorityHigh.className = "edit-priority-btn priority-high-btn";
    confirm.className = "note-confirm";
    header.className = "add-header";

    if (priorityStatus === "low") setPriority("low");
    else if (priorityStatus === "medium") setPriority("medium");
    if (priorityStatus === "high") setPriority("high");

    dueDateContainer.appendChild(dueDate);
    dueDateContainer.appendChild(dueDateInput);
    priorityContainer.appendChild(priority);
    priorityContainer.appendChild(priorityLow);
    priorityContainer.appendChild(priorityMedium);
    priorityContainer.appendChild(priorityHigh);
    priorityContainer.appendChild(confirm);
    main.appendChild(header);
    main.appendChild(todoTitle);
    main.appendChild(todoDescription);
    main.appendChild(dueDateContainer);
    main.appendChild(priorityContainer);

    priorityLow.addEventListener("click", () => setPriority("low"));
    priorityMedium.addEventListener("click", () => setPriority("medium"));
    priorityHigh.addEventListener("click", () => setPriority("high"));
    confirm.addEventListener("click", () => confirmAdd());

    function setPriority(value) {
        priorityStatus = value;
        if(value === "low" && !priorityLow.classList.contains("priority-low-active")) {
            priorityLow.classList.add("priority-low-active");
            priorityMedium.classList.remove("priority-medium-active");
            priorityHigh.classList.remove("priority-high-active");
        } else if(value === "medium" && !priorityMedium.classList.contains("priority-medium-active")) {
            priorityMedium.classList.add("priority-medium-active");
            priorityLow.classList.remove("priority-low-active");
            priorityHigh.classList.remove("priority-high-active");
        } else if(value === "high" && !priorityHigh.classList.contains("priority-high-active")) {
            priorityHigh.classList.add("priority-high-active");
            priorityLow.classList.remove("priority-low-active");
            priorityMedium.classList.remove("priority-medium-active");
        }
    }
    function confirmAdd() {
        const newTodo = {
            id: uid(),
            checked: false,
            dueDate: dueDateInput.value,
            title: todoTitle.value,
            description: todoDescription.value,
            priority: priorityStatus,
            project: currentPage
        };
        if (!todoObject[page]) todoObject[page] = [];
        todoObject[page].push(newTodo);
        localStorage.setItem("todoObject", JSON.stringify(todoObject));
        renderTodos(page);
        const overlay = document.querySelector(".overlay");
        overlay.innerHTML = "";
        document.body.removeChild(overlay);
    }
}

function renderNotes(page) {
    notesArray = JSON.parse(localStorage.getItem("notesArray")) || [];
    container.innerHTML = '';
    container.classList.add("notes-container");

    const col1 = document.createElement("div");
    const col2 = document.createElement("div");
    const col3 = document.createElement("div");
    col1.className = "col1";
    col2.className = "col2";
    col3.className = "col3";

    container.appendChild(col1);
    container.appendChild(col2);
    container.appendChild(col3);
    
    currentPage = page;
    clearOtherPages(page);

    let k = "col1";
    
    notesArray.slice().reverse().forEach(note => {
        const div = document.createElement("div");
        const deleteBtn = document.createElement("div");
        const title = document.createElement("div");
        const description = document.createElement("div");

        div.className = "note";
        deleteBtn.className = "delete-btn";
        title.className = "note-title";
        description.className = "note-description";
        title.contentEditable = "true";
        description.contentEditable = "true";

        deleteBtn.innerText = "×";
        title.value = note.title;
        description.value = note.description;
        title.innerText = note.title;
        description.innerText = note.description;

        div.appendChild(deleteBtn);
        div.appendChild(title);
        div.appendChild(description);
        if (k === "col1") {col1.appendChild(div); k = "col2";}
        else if (k === "col2") {col2.appendChild(div); k = "col3";}
        else if (k === "col3") {col3.appendChild(div); k = "col1";}

        let shouldFireChangeTitle = false;
        let shouldFireChangeDesc = false;

        title.addEventListener("focus", () => shouldFireChangeTitle = true);
        description.addEventListener("focus", () => shouldFireChangeDesc = true);
        title.addEventListener("focusout", () => {
            if(shouldFireChangeTitle) {
                shouldFireChangeTitle = false;
                note.title = title.value;
                localStorage.setItem("notesArray", JSON.stringify(notesArray));
            }
        });
        description.addEventListener("focusout", () => {
            if(shouldFireChangeDesc) {
                shouldFireChangeDesc = false;
                note.description = description.value;
                localStorage.setItem("notesArray", JSON.stringify(notesArray));
            }
        });
        deleteBtn.addEventListener("click", () => deleteNote(note.id));
    });
}

function deleteNote(noteId) {
    notesArray = JSON.parse(localStorage.getItem("notesArray")) || [];
    const index = notesArray.findIndex(note => note.id === noteId);
    if (index !== -1) {
        notesArray.splice(index, 1);
    }
    localStorage.setItem("notesArray", JSON.stringify(notesArray));
    renderNotes("notes");
}

function renderTodos(page) {
    todoObject = JSON.parse(localStorage.getItem("todoObject")) || { home: [], today: [], week: [] };
    container.innerHTML = '';
    container.classList.remove("notes-container");
    
    const editIcon = "assets/edit.png";
    const binIcon = "assets/bin.png";

    currentPage = page;
    clearOtherPages(page);

    (todoObject[page] || []).forEach(todo => {
        const li = document.createElement("li");
        const left = document.createElement("div");
        const right = document.createElement("div");
        const checkBox = document.createElement("input");
        const title = document.createElement("span");
        const details = document.createElement("button");
        const date = document.createElement("span");
        const edit = document.createElement("img");
        const remove = document.createElement("img");
    
        li.className = "task-item";
        setupPriority(todo.priority);
        checkBox.className = "checkbox";
        title.className = "title";
        details.className = "details";
        date.className = "date";
        edit.className = "edit";
        edit.className = "task-btn";
        remove.className = "bin";
        remove.className = "task-btn";
    
        checkBox.type = "checkbox";
        checkBox.checked = todo.checked;
        setupChecked(todo.checked);
        title.innerText = todo.title;
        details.innerText = "DETAILS";
        const month = makeMonth(String(todo.dueDate).substring(5, 7));
        const day = String(todo.dueDate).substring(8, 10);
        date.innerText = `${day} ${month}`;
        edit.src = editIcon;
        remove.src = binIcon;
    
        left.appendChild(checkBox);
        left.appendChild(title);
    
        right.appendChild(details);
        right.appendChild(date);
        right.appendChild(edit);
        right.appendChild(remove);
    
        li.appendChild(left);
        li.appendChild(right);

        container.appendChild(li);
        
        checkBox.addEventListener("click", () => {
            setupChecked(checkBox.checked);
            todo.checked = checkBox.checked;
            localStorage.setItem("todoObject", JSON.stringify(todoObject));
        });
        details.addEventListener("click", () => todoDetails(todo));
        edit.addEventListener("click", () => editTodo(todo.id, page));
        remove.addEventListener("click", () => deleteTodo(todo.id, page)); 
   
        function setupChecked(check) {
            if(check) {
                title.classList.add("checked");
                details.classList.add("checked-btn");
                date.classList.add("checked-date");
                edit.classList.add("checked-icon");
                remove.classList.add("checked-icon");
            } else {
                title.classList.remove("checked");
                details.classList.remove("checked-btn");
                date.classList.remove("checked-date");
                edit.classList.remove("checked-icon");
                remove.classList.remove("checked-icon");
            }
        }

        function setupPriority(priority) {
            if(priority === "low") {
                li.classList.add("li-low");
                li.classList.remove("li-medium");
                li.classList.remove("li-high");
            } else if(priority === "medium") {
                li.classList.add("li-medium");
                li.classList.remove("li-low");
                li.classList.remove("li-high");
            } else {
                li.classList.add("li-high");
                li.classList.remove("li-low");
                li.classList.remove("li-medium");
            }
        }
    });
}

function todoDetails(todo) {
    const overlay = document.createElement("div");
    const detailContainer = document.createElement("div");
    const exitBtn = document.createElement("div");
    const todoTitle = document.createElement("span");
    const leftRight = document.createElement("div");
    const left = document.createElement("div");
    const right = document.createElement("div");
    const project = document.createElement("span");
    const priority = document.createElement("span");
    const dueDate = document.createElement("span");
    const details = document.createElement("span");
    const projectText = document.createElement("span");
    const priorityText = document.createElement("span");
    const dueDateText = document.createElement("span");
    const detailsText = document.createElement("span");
    
    exitBtn.innerText = "×";
    todoTitle.innerText = todo.title;
    project.innerText = "Project:";
    priority.innerText = "Priority:";
    dueDate.innerText = "Due Date:";
    details.innerText = "Details:";
    projectText.innerText = todo.project;
    priorityText.innerText = todo.priority;
    dueDateText.innerText = todo.dueDate;
    detailsText.innerText = todo.description;

    detailContainer.className = "detail-container";
    overlay.className = "overlay";
    leftRight.className = "left-right";
    exitBtn.className = "details-exit";
    todoTitle.className = "details-title";
    left.className = "details-left";
    right.className = "details-right";
    project.className = "details-left-item";
    priority.className = "details-left-item";
    dueDate.className = "details-left-item";
    details.className = "details-left-item";
    projectText.className = "details-right-item";
    priorityText.className = "details-right-item";
    dueDateText.className = "details-right-item";
    detailsText.className = "details-right-item";
    detailsText.classList.add("details-description");

    left.appendChild(project);
    left.appendChild(priority);
    left.appendChild(dueDate);
    left.appendChild(details);
    right.appendChild(projectText);
    right.appendChild(priorityText);
    right.appendChild(dueDateText);
    right.appendChild(detailsText);
    leftRight.appendChild(left);
    leftRight.appendChild(right);
    detailContainer.appendChild(exitBtn);
    detailContainer.appendChild(todoTitle);
    detailContainer.appendChild(leftRight);
    overlay.appendChild(detailContainer);
    document.body.appendChild(overlay);

    exitBtn.addEventListener("click", () => exitDetails());

    function exitDetails() {
        overlay.innerHTML = "";
        document.body.removeChild(overlay);
    }
}

function editTodo(todoId, page) {
    todoObject = JSON.parse(localStorage.getItem("todoObject")) || { home: [], today: [], week: [] };
    const todo = (todoObject[page] || []).find((t) => t.id === todoId);
    let priorityStatus = todo.priority || "";

    const overlay = document.createElement("div");
    const editContainer = document.createElement("div");
    const exitBtn = document.createElement("div");
    const todoTitle = document.createElement("textarea");
    const todoDescription = document.createElement("textarea");
    const dueDateContainer = document.createElement("div");
    const dueDate = document.createElement("span");
    const dueDateInput = document.createElement("input");
    const lastRow = document.createElement("div");
    const priorityContainer = document.createElement("div");
    const priority = document.createElement("span");
    const priorityLow = document.createElement("button");
    const priorityMedium = document.createElement("button");
    const priorityHigh = document.createElement("button");
    const confirm = document.createElement("button");

    exitBtn.innerText = "×";
    todoTitle.innerText = todo.title;
    todoDescription.innerText = todo.description;
    dueDate.innerText = "Due Date:";
    dueDateInput.value = todo.dueDate;
    priority.innerText = "Priority:";
    priorityLow.innerText = "LOW";
    priorityMedium.innerText = "MEDIUM";
    priorityHigh.innerText = "HIGH";
    confirm.innerText = "CONFIRM EDIT";

    dueDateInput.type = "date";

    overlay.className = "overlay";
    editContainer.className = "edit-container";
    exitBtn.className = "exit-btn";
    todoTitle.className = "edit-title";
    todoDescription.className = "edit-description";
    dueDateContainer.className = "due-date-container";
    dueDate.className = "edit-text";
    priority.className = "edit-text";
    dueDateInput.className = "edit-due-date-input";
    lastRow.className = "last-row";
    priorityContainer.className = "priority-container";
    priorityLow.className = "edit-priority-btn priority-low-btn";
    priorityMedium.className = "edit-priority-btn priority-medium-btn";
    priorityHigh.className = "edit-priority-btn priority-high-btn";
    confirm.className = "confirm";

    todoTitle.spellcheck = "false";
    todoDescription.spellcheck = "false";

    if (priorityStatus === "low") setPriority("low");
    else if (priorityStatus === "medium") setPriority("medium");
    if (priorityStatus === "high") setPriority("high");

    dueDateContainer.appendChild(dueDate);
    dueDateContainer.appendChild(dueDateInput);
    priorityContainer.appendChild(priority);
    priorityContainer.appendChild(priorityLow);
    priorityContainer.appendChild(priorityMedium);
    priorityContainer.appendChild(priorityHigh);
    priorityContainer.appendChild(confirm);
    editContainer.appendChild(exitBtn);
    editContainer.appendChild(todoTitle);
    editContainer.appendChild(todoDescription);
    editContainer.appendChild(dueDateContainer);
    editContainer.appendChild(priorityContainer);
    overlay.appendChild(editContainer);
    document.body.appendChild(overlay);

    exitBtn.addEventListener("click", () => exitEdit());
    priorityLow.addEventListener("click", () => setPriority("low"));
    priorityMedium.addEventListener("click", () => setPriority("medium"));
    priorityHigh.addEventListener("click", () => setPriority("high"));
    confirm.addEventListener("click", () => confirmEdit());

    function exitEdit() {
        overlay.innerHTML = "";
        document.body.removeChild(overlay);
    }
    function setPriority(value) {
        priorityStatus = value;
        if(value === "low" && !priorityLow.classList.contains("priority-low-active")) {
            priorityLow.classList.add("priority-low-active");
            priorityMedium.classList.remove("priority-medium-active");
            priorityHigh.classList.remove("priority-high-active");
        } else if(value === "medium" && !priorityMedium.classList.contains("priority-medium-active")) {
            priorityMedium.classList.add("priority-medium-active");
            priorityLow.classList.remove("priority-low-active");
            priorityHigh.classList.remove("priority-high-active");
        } else if(value === "high" && !priorityHigh.classList.contains("priority-high-active")) {
            priorityHigh.classList.add("priority-high-active");
            priorityLow.classList.remove("priority-low-active");
            priorityMedium.classList.remove("priority-medium-active");
        }
    }
    function confirmEdit() {
        todo.title = todoTitle.value;
        todo.description = todoDescription.value;
        todo.priority = priorityStatus;
        todo.dueDate = dueDateInput.value;
        localStorage.setItem("todoObject", JSON.stringify(todoObject));
        exitEdit();
        renderTodos(currentPage);
    }
}

function deleteTodo(todoId, page) {
    todoObject = JSON.parse(localStorage.getItem("todoObject")) || { home: [], today: [], week: [] };
    const arr = todoObject[page] || [];
    const index = arr.findIndex(todo => todo.id === todoId);
    if (index !== -1) {
        arr.splice(index, 1);
    }
    todoObject[page] = arr;
    localStorage.setItem("todoObject", JSON.stringify(todoObject));
    renderTodos(currentPage);
}

function renderProjects() {
    todoObject = JSON.parse(localStorage.getItem("todoObject")) || { home: [], today: [], week: [] };
    const projectContainer = document.querySelector(".project_nav");
    projectContainer.innerHTML = "";

    for (const [key, value] of Object.entries(todoObject)) {
        if(key === "home" || key === "today" || key === "week") continue;

        const li = document.createElement("li");
        const projectName = document.createElement("span");
        const counter = document.createElement("span")
        const counterSpan = document.createElement("span");
        
        li.className = "nav_item_container";
        li.id = key;
        projectName.className = "project_item";
        counter.className = "unchecked_task_counter";

        projectName.innerText = key;
        counterSpan.innerText = "0";

        li.appendChild(projectName);
        li.appendChild(counter);
        counter.appendChild(counterSpan);
        projectContainer.appendChild(li);

        li.addEventListener("click", () => renderTodos(key));

        li.addEventListener("mouseover", () => {
            li.classList.add("nav_selected");
            const text = li.children[0];
            text.innerText = `// ${key}`;
        });
        li.addEventListener("mouseout", () => {
            if(currentPage !== key) {
                const text = li.children[0];
                text.innerText = key;
                li.classList.remove("nav_selected");
            }
        });
    }
}

function add() {
    const overlay = document.createElement("div");
    overlay.className = "overlay";
    const modal = document.createElement("div");
    modal.className = "add-modal-container";

    const sidebar = document.createElement("div");
    sidebar.className = "add-modal-sidebar";
    const todoBtn = document.createElement("div");
    todoBtn.className = "add-modal-option";
    todoBtn.innerText = "To-Do";
    const projectBtn = document.createElement("div");
    projectBtn.className = "add-modal-option";
    projectBtn.innerText = "Project";
    const noteBtn = document.createElement("div");
    noteBtn.className = "add-modal-option";
    noteBtn.innerText = "Note";
    sidebar.appendChild(todoBtn);
    sidebar.appendChild(projectBtn);
    sidebar.appendChild(noteBtn);

    const main = document.createElement("div");
    main.className = "add-modal-main";

    const exitBtn = document.createElement("div");
    exitBtn.className = "exit-btn";
    exitBtn.innerText = "×";
    exitBtn.addEventListener("click", () => {
        overlay.innerHTML = "";
        document.body.removeChild(overlay);
    });

    modal.appendChild(sidebar);
    modal.appendChild(main);
    modal.appendChild(exitBtn);
    overlay.appendChild(modal);
    document.body.appendChild(overlay);

    function loadContent(fn) {
        main.innerHTML = "";
        fn();
    }

    todoBtn.addEventListener("click", () => loadContent(() => addTodo(currentPage)));
    noteBtn.addEventListener("click", () => loadContent(() => addNote("notes")));
    projectBtn.addEventListener("click", () => loadContent(() => addProject()));

    loadContent(() => addTodo(currentPage));
}

function addProject() {
    todoObject = JSON.parse(localStorage.getItem("todoObject")) || { home: [], today: [], week: [] };
    const main = document.querySelector(".add-modal-main");
    if (!main) return;

    const container = document.createElement("div");
    container.className = "add-project-container";

    const header = document.createElement("span");
    header.className = "add-header";
    header.innerText = "Create a new project";

    const input = document.createElement("input");
    input.className = "add-title";
    input.type = "text";
    input.placeholder = "Project Title...";

    const confirm = document.createElement("button");
    confirm.className = "note-confirm";
    confirm.innerText = "CONFIRM";

    container.appendChild(header);
    container.appendChild(input);
    container.appendChild(confirm);
    main.appendChild(container);

    confirm.addEventListener("click", () => {
        const title = input.value.trim();
        if (!title || todoObject[title]) return;
        todoObject[title] = [];
        localStorage.setItem("todoObject", JSON.stringify(todoObject));
        document.body.querySelector(".overlay").remove();
        renderProjects();
        renderTodos(title);
    });
}

renderProjects();
renderTodos("home");
homePage.addEventListener("click", () => renderTodos("home"));
todayPage.addEventListener("click", () => renderTodos("today"));
weekPage.addEventListener("click", () => renderTodos("week"));
notes.addEventListener("click", () => renderNotes("notes"));
addBtn.addEventListener("click", () => add());