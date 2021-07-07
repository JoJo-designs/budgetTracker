export function useIndexDb() {

let db;

const request = window.indexedDB.open("Transactions", 1);

request.onupgradeneeded = (event) => {
    const db = request.results;
    db.createObjectStore(storeName, { keyPath: "_id" });
}

}