
 
 
import TodoItem from "./todoItem.js";
 
document.getElementById("todoForm").addEventListener("submit", function(event) {
  event.preventDefault();
 
  const formData=new FormData(event.target);
 
  let todoItem = new TodoItem(
    formData.get("title"),
    formData.get("description"),
    formData.get("dueDate"),
    formData.get("assignPerson"),
    formData.getAll("fileAttachments")
  );
 
  addTodoItemToUI(todoItem);
 
});
 
function addTodoItemToUI(todoItem){

    const todoItemTemplate = document.getElementById("todoItemTemplate").content.cloneNode(true);
    const potato = todoItemTemplate.querySelector("[data-action='delete']");
    if (potato) {
        potato.addEventListener("click", function() {
            this.closest("li").remove();
        });
    }

   
    const btnAddTodo = document.getElementById("btnAddTodo");
    btnAddTodo.setAttribute("data-bs-toggle", "modal");
    btnAddTodo.setAttribute("data-bs-target", "#todoModal");  
    
    
    const titleElement = todoItemTemplate.querySelector(".todoTitle");
    const descElement = todoItemTemplate.querySelector(".todoDescription");
    const createdDateElement = todoItemTemplate.querySelector(".todoCreatedDate");
    const dueDateElement = todoItemTemplate.querySelector(".todoDueDate");
    const assigneeElement = todoItemTemplate.querySelector(".todoAssignedPerson");
    const attachmentElement = todoItemTemplate.querySelector(".todoAttachment");
    
    if (titleElement) titleElement.textContent = todoItem.title;
    if (descElement) descElement.textContent = todoItem.description;
    if (createdDateElement) createdDateElement.textContent = todoItem.createdDate.toISOString().split('T')[0];
    if (dueDateElement) dueDateElement.textContent = todoItem.dueDate;
    if (assigneeElement) assigneeElement.textContent = todoItem.assignee;
    if (attachmentElement) attachmentElement.textContent = todoItem.attachments;
    //document.querySelector(".list-group").appendChild(todoItemTemplate);
 
    document.getElementById("todoItem").appendChild(todoItemTemplate);
}
 