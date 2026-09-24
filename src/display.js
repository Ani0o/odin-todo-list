import { changeComplete, projects, updateTodoInProject, deleteTodoFromProject } from "./projectManager.js";
import { storeData } from "./storage.js";
import editIcon from "./icons/edit.svg";
import deleteIcon from "./icons/delete.svg";
import { formatDistanceToNow } from "date-fns";

const projectList = document.querySelector('.side-nav-project-list');
const selectedProjectHeading = document.querySelector('.selected-project');

function displayProjects(selectedProject) {
    projectList.replaceChildren();
    projects.forEach((project) => {
        const p = document.createElement('p');

        p.textContent = project.title;
        p.classList.add('project');
        if (project.id === selectedProject.id) p.classList.add('active-project');
        p.setAttribute('data-id', project.id);

        projectList.appendChild(p);
    });
    selectedProjectHeading.textContent = `# ${selectedProject.title}`;
}

const todoList = document.querySelector('.todo-section-content');

function displayTodos(selectedProject) {
    todoList.replaceChildren();
    selectedProject.todos.forEach((todo) => {
        const todoWrapper = document.createElement('div');
        const todoHeader = document.createElement('div');
        const todoHeaderLeftWrapper = document.createElement('div');
        const checkbox = document.createElement('div');
        const todoTitle = document.createElement('p');
        const todoHeaderRightWrapper = document.createElement('div');
        const todoPriority = document.createElement('p');
        const todoDueDate = document.createElement('p');
        const todoMenu = document.createElement('div');
        const todoContentWrapper = document.createElement('div');
        const todoContent = document.createElement('div');
        const todoDescription = document.createElement('p');
        const todoContentRightWrapper = document.createElement('div');
        const editPriorityButton = document.createElement('button');
        const editPriorityIcon = document.createElement('img');
        const editDueDateButton = document.createElement('button');
        const editDueDateIcon = document.createElement('img');
        const deleteTodoButton = document.createElement('button');
        const deleteTodoIcon = document.createElement('img');
        const editPriorityDialog = document.createElement('dialog');
        const editPriorityForm = document.createElement('form');
        const editPriorityFormInputWrapper = document.createElement('div');
        const editPriorityFormLabel = document.createElement('label');
        const editPriorityFormSelect = document.createElement('select');
        const editPriorityFormSelectOption1 = document.createElement('option');
        const editPriorityFormSelectOption2 = document.createElement('option');
        const editPriorityFormSelectOption3 = document.createElement('option');
        const editPriorityFormButtonsWrapper = document.createElement('div');
        const editPriorityFormCancelButton = document.createElement('button');
        const editPriorityFormSubmitButton = document.createElement('button');
        const editDueDateDialog = document.createElement('dialog');
        const editDueDateForm = document.createElement('form');
        const editDueDateFormInputWrapper = document.createElement('div');
        const editDueDateFormLabel = document.createElement('label');
        const editDueDateFormInput = document.createElement('input');
        const editDueDateFormButtonsWrapper = document.createElement('div');
        const editDueDateFormCancelButton = document.createElement('button');
        const editDueDateFormSubmitButton = document.createElement('button');

        todoWrapper.setAttribute('data-id', todo.id);
        todoWrapper.classList.add('todo');
        if (todo.complete === "true") todoWrapper.classList.add('todo-complete');

        todoHeader.classList.add('todo-header');
        todoHeaderLeftWrapper.classList.add('todo-header-left-wrapper');
        checkbox.classList.add('checkbox');
        checkbox.setAttribute('data-id', todo.id);

        checkbox.addEventListener('click', (e) => {
            changeComplete(selectedProject.id, todo.id);
            todoWrapper.classList.toggle('todo-complete');
            storeData();
        });

        todoTitle.classList.add('todo-title');
        todoTitle.textContent = todo.title;

        todoHeaderLeftWrapper.appendChild(checkbox);
        todoHeaderLeftWrapper.appendChild(todoTitle);
        
        todoHeaderRightWrapper.classList.add('todo-header-right-wrapper');
        todoPriority.classList.add('todo-priority');

        if (todo.priority === "1") todoPriority.textContent = "Low Priority";
        else if (todo.priority === "2") todoPriority.textContent = "Medium Priority";
        else todoPriority.textContent = "High Priority";

        todoDueDate.classList.add('todo-duedate');

        let [year, month, day] = todo.date.split('-');
        month = Number(month) - 1;
        todoDueDate.textContent = `Due ${formatDistanceToNow(new Date(year, month, day), { addSuffix: true, includeSeconds: true })}`;

        todoMenu.classList.add('todo-menu');

        todoHeaderRightWrapper.appendChild(todoPriority);
        todoHeaderRightWrapper.appendChild(todoDueDate);
        todoHeaderRightWrapper.appendChild(todoMenu);

        todoHeader.appendChild(todoHeaderLeftWrapper);
        todoHeader.appendChild(todoHeaderRightWrapper);

        todoHeader.addEventListener('click', (e) => {
            if (e.target.classList.contains('checkbox')) return;

            todoWrapper.classList.toggle('todo-open');
        });

        todoContentWrapper.classList.add('todo-content-wrapper');
        todoContent.classList.add('todo-content');
        todoDescription.classList.add('todo-description');
        todoDescription.textContent = todo.description;
        todoContentRightWrapper.classList.add('todo-content-right-wrapper');

        editPriorityButton.classList.add('edit-priority-button');
        editPriorityButton.setAttribute('data-id', todo.id);
        editPriorityButton.textContent = "Edit Priority";
        editPriorityIcon.src = editIcon;
        editPriorityButton.addEventListener('click', (e) => {
            editPriorityDialog.showModal();
        });
        editPriorityButton.appendChild(editPriorityIcon);

        editDueDateButton.classList.add('edit-duedate-button');
        editDueDateButton.setAttribute('data-id', todo.id);
        editDueDateButton.textContent = "Edit Due Date";
        editDueDateIcon.src = editIcon;
        editDueDateButton.addEventListener('click', (e) => {
            editDueDateDialog.showModal();
        });
        editDueDateButton.appendChild(editDueDateIcon);

        deleteTodoButton.classList.add('delete-todo-button');
        deleteTodoButton.setAttribute('data-id', todo.id);
        deleteTodoButton.textContent = "Delete";
        deleteTodoIcon.src = deleteIcon;
        deleteTodoButton.addEventListener('click', (e) => {
            const todoId = e.target.getAttribute('data-id');

            deleteTodoFromProject(selectedProject.id, todoId);
            displayTodos(selectedProject);
            storeData();
        });
        deleteTodoButton.appendChild(deleteTodoIcon);

        editPriorityDialog.classList.add('edit-priority-dialog');
        editPriorityDialog.setAttribute('data-id', todo.id);
        editPriorityDialog.addEventListener('close', (e) => {
            if (editPriorityDialog.returnValue === 'submit') {
                const formData = new FormData(editPriorityForm);
                const data = Object.fromEntries(formData.entries());
                const todoId = e.target.getAttribute('data-id');

                updateTodoInProject(selectedProject.id, todoId, data.priority, selectedProject.getTodo(todoId).date);
                displayTodos(selectedProject);
                storeData();

                editPriorityForm.reset();
            }
            editPriorityDialog.returnValue = '';
        });

        editPriorityForm.method = "dialog";
        editPriorityFormLabel.htmlFor = 'edit-form-priority';
        editPriorityFormSelect.id = 'edit-form-priority';
        editPriorityFormSelect.name = 'priority';
        editPriorityFormSelectOption1.value = '1';
        editPriorityFormSelectOption1.textContent = "Low";
        editPriorityFormSelectOption2.value = '2';
        editPriorityFormSelectOption2.setAttribute('selected', 'selected');
        editPriorityFormSelectOption2.textContent = "Medium";
        editPriorityFormSelectOption3.value = '3';
        editPriorityFormSelectOption3.textContent = "High";
        editPriorityFormSelect.appendChild(editPriorityFormSelectOption1);
        editPriorityFormSelect.appendChild(editPriorityFormSelectOption2);
        editPriorityFormSelect.appendChild(editPriorityFormSelectOption3);

        editPriorityFormInputWrapper.appendChild(editPriorityFormLabel);
        editPriorityFormInputWrapper.appendChild(editPriorityFormSelect);

        editPriorityFormCancelButton.classList.add('edit-priority-form-cancel-button');
        editPriorityFormCancelButton.type = 'button';
        editPriorityFormCancelButton.value = 'cancel';
        editPriorityFormCancelButton.formNoValidate = true;
        editPriorityFormCancelButton.textContent = "Cancel";
        editPriorityFormCancelButton.addEventListener('click', (e) => {
            editPriorityForm.reset();
            editPriorityDialog.close();
        });

        editPriorityFormSubmitButton.classList.add('edit-priority-form-submit-button');
        editPriorityFormSubmitButton.type = 'submit';
        editPriorityFormSubmitButton.value = 'submit';
        editPriorityFormSubmitButton.textContent = "Add";

        editPriorityFormButtonsWrapper.appendChild(editPriorityFormCancelButton);
        editPriorityFormButtonsWrapper.appendChild(editPriorityFormSubmitButton);

        editPriorityForm.appendChild(editPriorityFormInputWrapper);
        editPriorityForm.appendChild(editPriorityFormButtonsWrapper);
        editPriorityDialog.appendChild(editPriorityForm);

        editDueDateDialog.classList.add('edit-duedate-dialog');
        editDueDateDialog.setAttribute('data-id', todo.id);
        editDueDateDialog.addEventListener('close', (e) => {
            if (editDueDateDialog.returnValue === 'submit') {
                const formData = new FormData(editDueDateForm);
                const data = Object.fromEntries(formData.entries());
                const todoId = e.target.getAttribute('data-id');

                updateTodoInProject(selectedProject.id, todoId, selectedProject.getTodo(todoId).priority, data.duedate);
                displayTodos(selectedProject);
                storeData();

                editDueDateForm.reset();
            }
            editDueDateDialog.returnValue = '';
        });
        editDueDateForm.method = "dialog";
        editDueDateFormLabel.htmlFor = 'edit-form-duedate';
        editDueDateFormLabel.textContent = "Due Date:";
        editDueDateFormInput.id = 'edit-form-duedate';
        editDueDateFormInput.type = 'date';
        editDueDateFormInput.name = 'duedate';
        editDueDateFormInput.required = true;

        editDueDateFormInputWrapper.appendChild(editDueDateFormLabel);
        editDueDateFormInputWrapper.appendChild(editDueDateFormInput);

        editDueDateFormCancelButton.classList.add('edit-duedate-form-cancel-button');
        editDueDateFormCancelButton.type = 'button';
        editDueDateFormCancelButton.value = 'cancel';
        editDueDateFormCancelButton.formNoValidate = true;
        editDueDateFormCancelButton.textContent = "Cancel";
        editDueDateFormCancelButton.addEventListener('click', (e) => {
            editDueDateForm.reset();
            editDueDateDialog.close();
        });

        editDueDateFormSubmitButton.classList.add('edit-duedate-form-submit-button');
        editDueDateFormSubmitButton.type = 'submit';
        editDueDateFormSubmitButton.value = 'submit';
        editDueDateFormSubmitButton.textContent = "Add";

        editDueDateFormButtonsWrapper.appendChild(editDueDateFormCancelButton);
        editDueDateFormButtonsWrapper.appendChild(editDueDateFormSubmitButton);

        editDueDateForm.appendChild(editDueDateFormInputWrapper);
        editDueDateForm.appendChild(editDueDateFormButtonsWrapper);
        editDueDateDialog.appendChild(editDueDateForm);

        todoContentRightWrapper.appendChild(editPriorityButton);
        todoContentRightWrapper.appendChild(editDueDateButton);
        todoContentRightWrapper.appendChild(deleteTodoButton);
        todoContentRightWrapper.appendChild(editPriorityDialog);
        todoContentRightWrapper.appendChild(editDueDateDialog);

        todoContent.appendChild(todoDescription);
        todoContent.appendChild(todoContentRightWrapper);
        todoContentWrapper.appendChild(todoContent);

        todoWrapper.appendChild(todoHeader);
        todoWrapper.appendChild(todoContentWrapper);

        todoList.appendChild(todoWrapper);
    });
}

export { displayProjects, displayTodos };
