let db;

//create the indexBD database.
const request = indexedDB.open('transactions', 1);

request.onupgradeneeded = (event) => {
    db = event.target.result;
    db.createObjectStore('budget', { autoIncrement: true });
};

request.onerror = (event) => {
    console.log(`Looks like we ran into an issue ${event.target.errorCode}`);
};

function checkDataBase() {
    console.log("checking the database");
    let transactions = db.transaction(['budget'], 'readwrite');
    const store = transactions.objectStore('budget');
    const getItems = store.getAll();

    getItems.onsuccess = () => {
        if (getItems.result.length > 0) {
            fetch('/api/transaction/bulk', {
                method: 'POST',
                body: JSON.stringify(getItems.result),
                headers: {
                    Accept: 'application/json, text/plain, */*',
                    'Content-Type': 'application/json',
                }
            })
                .then((response) => response.json())
                .then((res) => {
                    if (res.length !== 0) {
                        transactions = db.transaction(['budget'], 'readwrite');
                        const currentValue = transactions.objectStore('budget');
                        currentValue.clear();
                        console.log('Storage Cleared');
                    }
                });
        }
    };
}

request.onsuccess = (event) => {
    console.log('success');
    db = event.target.result;

    if (navigator.onLine) {
        console.log("Online");
        checkDataBase();
    }
}

const saveRecord = (record) => {
    console.log('saving new records');
    console.log(record);
    const transaction = db.transaction(['budget'], 'readwrite');
    const store = transaction.objectStore('budget');
    store.add(record);
}

window.addEventListener('online', checkDataBase);