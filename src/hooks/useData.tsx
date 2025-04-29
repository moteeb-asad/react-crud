// React
import { useState, useEffect } from "react";

// Types
import { Record } from "../types";

export const useData = (initialData: Record[] = []) => {
  const [data, setData] = useState<Record[]>(initialData);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      const db = await new Promise<IDBDatabase>((resolve, reject) => {
        const request = indexedDB.open("crudDB", 1);

        request.onerror = (event: Event) => {
          const target = event.target as IDBRequest;
          console.error("Database error:", target.error);
          reject(target.error);
        };

        request.onsuccess = (event) => {
          const target = event.target as IDBRequest;
          const db = target.result;
          resolve(db);
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
    } catch (err) {
      setError(err as Error);
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
