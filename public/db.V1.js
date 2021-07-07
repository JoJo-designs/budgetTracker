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

request.onerror = () => {
    console.log("we ran into an error");
};

request.onsuccess = () => {
   const db = request.result;
   const transaction = db.Transactions(["budget"], "readwrite");
   const budegtItem = transaction.odjectStore("name");

   db.onerror = (event) => {
       console.log("error");
   };
   if (method === "put") {
       budegtItem.put(odject);
   }
   if (method === "clear") {
       budgetItem.clear();
   }
   if (method === "get") {
       const all = budegtItem.getAll();
       all.onsuccess = function() {
           resolve(all.result);
       };
   }
   transaction.oncomplete = () => {
       db.close();
   }
}


//21 ins chuncking