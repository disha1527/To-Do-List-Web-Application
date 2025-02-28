// IEFE
(() => { 
  // state variables
  let toDoListArray = [];
  // ui variables
  const form = document.querySelector(".form"); 
  const input = form.querySelector(".form__input");
  const ul = document.querySelector(".toDoList"); 

  // event listeners
  form.addEventListener('submit', e => {
    // prevent default behaviour - Page reload
    e.preventDefault();
    // give item a unique ID
    let itemId = String(Date.now());
    // get/assign input value
    let toDoItem = input.value;
    //pass ID and item into functions
    addItemToDOM(itemId , toDoItem);
    addItemToArray(itemId, toDoItem);
    // clear the input box. (this is default behaviour but we got rid of that)
    input.value = '';
  });
  
  ul.addEventListener('click', e => {
    let id = e.target.getAttribute('data-id')
    if (!id) return // user clicked in something else      
    //pass id through to functions
    removeItemFromDOM(id);
    removeItemFromArray(id);
  });
  
  // functions 
function addItemToDOM(itemId, toDoItem) {    
  // create an li
  const li = document.createElement('li');
  li.setAttribute("data-id", itemId);

  // add toDoItem text to li
  li.innerText = toDoItem;

  // create an edit icon
  const editIcon = document.createElement('i');
  editIcon.className = 'fas fa-edit edit-icon'; // Add Font Awesome edit icon class and custom class
  editIcon.onclick = function() {
    editItem(itemId);
  };

  // append edit icon to li
  li.appendChild(editIcon);

  // add li to the DOM
  ul.appendChild(li);
}

function addItemToArray(itemId, toDoItem) {
  // add item to array as an object with an ID so we can find and delete it later
  toDoListArray.push({ itemId, toDoItem });
  console.log(toDoListArray);
}

function removeItemFromDOM(id) {
  // get the list item by data ID
  var li = document.querySelector('[data-id="' + id + '"]');
  // remove list item
  ul.removeChild(li);
}

function removeItemFromArray(id) {
  // create a new toDoListArray with all li's that don't match the ID
  toDoListArray = toDoListArray.filter(item => item.itemId !== id);
  console.log(toDoListArray);
}

function editItem(id) {
  // find the item in the array
  const item = toDoListArray.find(item => item.itemId === id);

  // prompt user to enter new text
  const newToDoItem = prompt('Edit your item:', item.toDoItem);

  if (newToDoItem !== null) {
    // update the item in the array
    item.toDoItem = newToDoItem;
    console.log(toDoListArray);

    // update the item in the DOM
    var li = document.querySelector('[data-id="' + id + '"]');
    li.childNodes[0].nodeValue = newToDoItem;
  }
}

})();