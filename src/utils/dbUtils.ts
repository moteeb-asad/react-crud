import { Record } from "../types";

// open database and create object store if it doesn't exist
export function openDatabase(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open("crudDB", 1);

    request.onerror = (event: Event) => {
      const target = event.target as IDBOpenDBRequest;
      console.error("Database error:", target.error?.code);
      reject(target.error?.code);
    };

    request.onsuccess = (event: Event) => {
      const target = event.target as IDBOpenDBRequest;
      const db = target.result;
      resolve(db);
    };

    request.onupgradeneeded = (event: IDBVersionChangeEvent) => {
      const target = event.target as IDBOpenDBRequest;
      const db = target.result;
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

// get all records from the database
export async function getAllRecords(): Promise<Record[]> {
  const db = await openDatabase();
  const transaction = db.transaction("records", "readonly");
  const objectStore = transaction.objectStore("records");

  return new Promise((resolve, reject) => {
    const request = objectStore.getAll();
    request.onsuccess = (event: Event) => {
      const target = event.target as IDBRequest;
      resolve(target.result);
    };
    request.onerror = (event: Event) => {
      const target = event.target as IDBRequest;
      reject(target.error);
    };
  });
}

// delete a record from the database
export async function deleteRecord(id: number): Promise<void> {
  const db = await openDatabase();
  const transaction = db.transaction("records", "readwrite");
  const objectStore = transaction.objectStore("records");

  return new Promise((resolve, reject) => {
    const request = objectStore.delete(id);
    request.onsuccess = () => resolve();
    request.onerror = (event: Event) => {
      const target = event.target as IDBRequest;
      reject(target.error);
    };
  });
}

// update a record in the database
export async function updateRecord(record: Record): Promise<void> {
  const db = await openDatabase();
  const transaction = db.transaction("records", "readwrite");
  const objectStore = transaction.objectStore("records");

  return new Promise((resolve, reject) => {
    const request = objectStore.put(record);
    request.onsuccess = () => resolve();
    request.onerror = (event: Event) => {
      const target = event.target as IDBRequest;
      reject(target.error);
    };
  });
}
