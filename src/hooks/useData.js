import { useState, useEffect } from "react";

export const useData = (initialData = []) => {
  const [data, setData] = useState(initialData);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      const db = await new Promise((resolve, reject) => {
        const request = indexedDB.open("crudDB", 1);

        request.onerror = (event) => {
          console.error("Database error:", event.target.errorCode);
          reject(event.target.errorCode);
        };

        request.onsuccess = (event) => {
          const db = event.target.result;
          resolve(db);
        };
      });

      const transaction = db.transaction("records", "readonly");
      const objectStore = transaction.objectStore("records");
      const request = objectStore.getAll();

      request.onsuccess = (event) => {
        const allRecords = event.target.result;
        setData(Array.isArray(allRecords) ? allRecords : []);
      };

      request.onerror = (event) => {
        console.error("Error fetching records:", event.target.error);
        setData([]);
      };
    } catch (err) {
      setError(err);
      setData([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return {
    data: Array.isArray(data) ? data : [],
    loading,
    error,
    refetch: fetchData,
  };
};
