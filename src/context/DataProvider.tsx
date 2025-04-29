// React
import React, { createContext, useState, useEffect } from "react";

// Types
import { DataContextType, Record } from "../types";

// Context
const DataContext = createContext<DataContextType>({
  data: [],
  setData: () => {},
});

const DataProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [data, setData] = useState<Record[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const db = await new Promise<IDBDatabase>((resolve, reject) => {
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

        const transaction = db.transaction("records", "readonly");
        const objectStore = transaction.objectStore("records");
        const request = objectStore.getAll();

        request.onsuccess = (event: Event) => {
          const target = event.target as IDBRequest;
          const allRecords = target.result;
          setData(Array.isArray(allRecords) ? allRecords : []);
        };

        request.onerror = (event: Event) => {
          const target = event.target as IDBRequest;
          console.error("Error fetching records:", target.error);
          setData([]);
        };
      } catch (error) {
        console.error("Error in fetchData:", error);
        setData([]);
      }
    };

    fetchData();
  }, []);

  return (
    <DataContext.Provider value={{ data, setData }}>
      {children}
    </DataContext.Provider>
  );
};

export { DataContext, DataProvider };
