const addButton = document.getElementById("addItem");
const itemInput = document.getElementById("itemInput");
const itemList = document.getElementById("itemList")

loadItems();

function addItem() {

    const item = itemInput.value.trim();

    if (item) {

        createItemElement(item);

        itemInput.value = "";

        saveItems();

    }
}

addButton.addEventListener("click", addItem);

function createItemElement(item) {

    const listItem = document.createElement("li");
    
    listItem.textContent = item;

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Löschen";
    deleteButton.className = "deleteItem";

    listItem.appendChild(deleteButton);

    itemList.appendChild(listItem);

    deleteButton.addEventListener("click", function(){
        itemList.removeChild(listItem);
        saveItems();
    });

}

function saveItems() {
    
    let items = [];
    itemList.querySelectorAll("li").forEach(function(item) {
        items.push(item.textContent.replace("Löschen", "").trim());
    });

    localStorage.setItem("items", JSON.stringify(items));

}

function loadItems() {
    
    const items = JSON.parse(localStorage.getItem("items")) || [];

    items.forEach(createItemElement);

}