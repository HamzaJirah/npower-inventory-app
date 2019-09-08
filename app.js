// Item class
class Item {
  constructor(item, quantity, agent){
    this.item = item;
    this.quantity = quantity;
    this.agent = agent;
  }
}

// UI class
class UI {
  // add item
  addItemToInventory(laptop){
    // get tbody from DOM
    const tableBody = document.querySelector('#inventory-content');
    // create row in the table 
    const row = document.createElement('tr');
    // insert laptop object in the UI 
    row.innerHTML = `
      <td>${laptop.item}</td>
      <td>${laptop.quantity}</td>
      <td>${laptop.agent}</td>
      <td><i class="fas fa-trash"></i></td>
  `
    // append row to table body 
    tableBody.appendChild(row);
  }

  // show alert
  displayAlert(message, className){
    // create div element 
    const div = document.createElement('div');
    // add class name to div
    div.className = `alert ${className}`;
    // create text node 
    div.appendChild(document.createTextNode(message));
    // get div parent element
    const formSection = document.querySelector('#form-section')
    // get div sibling element
    const form = document.querySelector('#inventory-list');
    // append div to parent 
    formSection.insertBefore(div, form)
    // dismiss alert in 3secs
    setTimeout(function(){
      document.querySelector('.alert').remove();
    }, 3000)
  }

  // clear input fields
  clearInputFields(){
    document.querySelector('#item').value = '';
    document.querySelector('#quantity').value = '';
    document.querySelector('#agent').value = '';
  }

  // delete item 
  deleteItem(target){
    if(target.classList.contains('fa-trash')){
      target.parentElement.parentElement.remove();
    }
  }
}

// Local Storage
class Store {

  static getItems(){
    let laptops;
    if(localStorage.getItem('laptops') === null){
      laptops = [];
    } else {
      laptops = JSON.parse(localStorage.getItem('laptops'));
    }

    return laptops;
  }

  static displayItems(){
    const laptops = Store.getItems();

    laptops.forEach(laptop => {
      // instantiate ui object from UI class
      const ui = new UI();

      // add laptop to ui 
      ui.addItemToInventory(laptop);
    });
  }

  static addItem(laptop){
    const laptops = Store.getItems();

    laptops.push(laptop);

    localStorage.setItem('laptops', JSON.stringify(laptops));
  }

  static removeItem(agent){
    const laptops = Store.getItems();

    laptops.forEach((laptop, index) => {
      if(laptop.agent === agent){
        laptops.splice(index, 1);
      }
    });
    // set local storage again 
    localStorage.setItem('laptops', JSON.stringify(laptops));
  }
}

// DOM load event to add laptop/item to ui from the local storage
document.addEventListener('DOMContentLoaded', Store.displayItems);

// event listener to get form submission
document.querySelector('#inventory-list').addEventListener('submit', e => {
  const item = document.querySelector('#item').value;
  const quantity = document.querySelector('#quantity').value;
  const agent = document.querySelector('#agent').value;

  // instantiate Item object
  const laptop = new Item(item, quantity, agent);

  // instantiate UI class
  const ui = new UI();

  console.log(ui);
  // validate form field
  if(item === '' || quantity === '' || agent === ''){
    // display error message
    ui.displayAlert('Please fill in all fields', 'error');
  } else {  
    // add item to UI 
    ui.addItemToInventory(laptop);
    // add item to local storage
    Store.addItem(laptop)
    // display success message
    ui.displayAlert('item added successfully', 'success');
    // clear input fields
    ui.clearInputFields();
  }
  
  e.preventDefault();
});

// event listener to delete item
document.querySelector('#inventory-content').addEventListener('click', e => {
  
  // instantiate UI object 
  const ui = new UI();

  // invoke delete item(from ui) prototype
  ui.deleteItem(e.target);

  // remove item from local storage
  Store.removeItem(e.target.parentElement.previousElementSibling.textContent);

  // show alert
  ui.displayAlert('Item removed successfully', 'success');

  e.preventDefault();
})


// Side Menu 
class Menu {

  static menuShowHide(e){
    if(e.target.classList.contains('fa-bars')){
      Menu.displaySideMenu();
    } else if(e.target.classList.contains('modal-container') || e.target.classList.contains('fa-window-close')){
      Menu.closeSideMenu();
    }
  }

  static displaySideMenu(){
    let modal = document.querySelector('.modal-container');
    let sideMenu = document.querySelector('.side-menu');
    let hamburgerIcon = document.querySelector('.fa-bars');
    modal.style.display = 'block';
    sideMenu.style.display = 'block';
    hamburgerIcon.style.display = 'none';
  }

  static closeSideMenu(){
    let modal = document.querySelector('.modal-container');
    let sideMenu = document.querySelector('.side-menu');
    let hamburgerIcon = document.querySelector('.fa-bars');
    modal.style.display = 'none';
    sideMenu.style.display = 'none';
    hamburgerIcon.style.display = 'block';
  }
}

// select all side menu components
const SideMenuComp = document.querySelectorAll('.side-menu-comp');

SideMenuComp.forEach(menu => {
  menu.addEventListener('click', Menu.menuShowHide);
})




