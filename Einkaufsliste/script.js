const addButton = document.getElementById("addItem");
const itemInput = document.getElementById("itemInput");
const itemList = document.getElementById("itemList");

db.collection("einkaufsliste").orderBy("timestamp").onSnapshot((snapshot) => {
    itemList.innerHTML = "";
    snapshot.forEach((doc) => {
        createItemElement(doc.data().text, doc.id);
    });
});

function addItem() {
    const item = itemInput.value.trim();
    if (item) {
        db.collection("einkaufsliste").add({
            text: item,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        });
        itemInput.value = "";
    }
}

function createItemElement(text, id) {
    const listItem = document.createElement("li");
    listItem.textContent = text;

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Löschen";
    deleteButton.className = "deleteItem";
    listItem.appendChild(deleteButton);

    itemList.appendChild(listItem);

    deleteButton.addEventListener("click", () => {
        db.collection("einkaufsliste").doc(id).delete();
    });
}

addButton.addEventListener("click", addItem);