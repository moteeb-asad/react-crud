export function openDatabase() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open("crudDB", 1);

    request.onerror = (event) => {
      console.error("Database error:", event.target.errorCode);
      reject(event.target.errorCode);
    };

    request.onsuccess = (event) => {
      const db = event.target.result;
      resolve(db);
    };

    request.onupgradeneeded = (event) => {
      const db = event.target.result;
      const objectStore = db.createObjectStore("records", {
        keyPath: "id",
        autoIncrement: true,
      });
      objectStore.createIndex("title", "title", { unique: false });
      objectStore.createIndex("upvotes", "upvotes", { unique: false });
      objectStore.createIndex("date", "date", { unique: false });
    };
  });
}

export async function getAllRecords() {
  const db = await openDatabase();
  const transaction = db.transaction("records", "readonly");
  const objectStore = transaction.objectStore("records");

  return new Promise((resolve, reject) => {
    const request = objectStore.getAll();
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

export async function deleteRecord(id) {
  const db = await openDatabase();
  const transaction = db.transaction("records", "readwrite");
  const objectStore = transaction.objectStore("records");

  return new Promise((resolve, reject) => {
    const request = objectStore.delete(id);
    request.onsuccess = () => resolve();
    request.onerror = () => reject(request.error);
  });
}
