const DB_NAME = "crudDB";
const DB_VERSION = 1;
const STORE_NAME = "records";

export const openDB = () => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onerror = (event) => {
      console.error("Database error:", event.target.errorCode);
      reject(event.target.errorCode);
    };

    request.onsuccess = (event) => {
      resolve(event.target.result);
    };

    request.onupgradeneeded = (event) => {
      const db = event.target.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        const objectStore = db.createObjectStore(STORE_NAME, {
          keyPath: "id",
          autoIncrement: true,
        });
        objectStore.createIndex("title", "title", { unique: false });
        objectStore.createIndex("upvotes", "upvotes", { unique: false });
        objectStore.createIndex("date", "date", { unique: false });
      }
    };
  });
};

export const getAllRecords = async () => {
  const db = await openDB();
  const transaction = db.transaction(STORE_NAME, "readonly");
  const objectStore = transaction.objectStore(STORE_NAME);
  return objectStore.getAll();
};

export const addRecord = async (record) => {
  const db = await openDB();
  const transaction = db.transaction(STORE_NAME, "readwrite");
  const objectStore = transaction.objectStore(STORE_NAME);
  return objectStore.add(record);
};

export const updateRecord = async (record) => {
  const db = await openDB();
  const transaction = db.transaction(STORE_NAME, "readwrite");
  const objectStore = transaction.objectStore(STORE_NAME);
  return objectStore.put(record);
};

export const deleteRecord = async (id) => {
  const db = await openDB();
  const transaction = db.transaction(STORE_NAME, "readwrite");
  const objectStore = transaction.objectStore(STORE_NAME);
  return objectStore.delete(id);
};
