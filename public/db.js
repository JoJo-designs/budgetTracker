// This file will be what build the indexDb that we 
// use off line I think.

const request = window.indexedDB.open("Transactions", 1);

request.onupgradeneeded = ({ target }) => {
    const db = target.result;

    const budget = db.createObjectStore("budget", {
        keyPath: "itemID"
    });

    budget.createIndex("name", "name");
    budget.createIndex("value", "value");
}