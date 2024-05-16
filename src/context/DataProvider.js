import React, { createContext, useState, useEffect } from 'react';

const DataContext = createContext();

const DataProvider = ({ children }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const db = await new Promise((resolve, reject) => {
        const request = indexedDB.open('crudDB', 1);

        request.onerror = (event) => {
          console.error('Database error:', event.target.errorCode);
          reject(event.target.errorCode);
        };

        request.onsuccess = (event) => {
          const db = event.target.result;
          resolve(db);
        };

        request.onupgradeneeded = (event) => {
          const db = event.target.result;
          const objectStore = db.createObjectStore('records', { keyPath: 'id', autoIncrement: true });
          objectStore.createIndex('title', 'title', { unique: false });
          objectStore.createIndex('upvotes', 'upvotes', { unique: false });
          objectStore.createIndex('date', 'date', { unique: false });
        };
      });

      const transaction = db.transaction('records', 'readonly');
      const objectStore = transaction.objectStore('records');
      const allRecords = await objectStore.getAll();
      setData(allRecords);
    };

    fetchData();
  }, []);

  return (
    <DataContext.Provider value={{ data, setData:setData }}>
      {children}
    </DataContext.Provider>
  );
};

export { DataContext, DataProvider };
