// okay I need to build an indexDb 
// the indexDb is connected to the index.js on line 142 with a function 
// called saveRecord.

// not sure which activity to look at to get info on checking if the 
// app is online again.

export function saveRecord(transactions, budget, method, transaction) {
    const request = window.indexedDB.open(transactions, 1);
    let db,
    item,
    store;

    request.onupgradeneeded = (event) => {
        const db = request.result;
        db.createObjectStore(budget, {keyPath: "id"});
    };

    request.onerror = (event) => {
        console.log("We ran into an error")
    };

    request.onsuccess = (event) => {
        db = request.result;
        item = db.transaction(budget, "readwrite");
        store = item.odjectStore(budget);

        db.onerror = (event) => {
            console.log("we ran into an error");
        };
        if (method === "put") {
            store.put(transaction);
        }
        if (method === "get") {
            store.getAll();
        }
        item.oncomplete = () => {
            db.close();
        }
    };
}