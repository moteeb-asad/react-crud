// Master Layout props
export interface MasterLayoutProps {
  children: React.ReactNode;
}

// Record interface
export interface Record {
  id: number;
  title: string;
  upvotes: number;
  date: string;
}

// Form Data interface
export interface FormData {
  title: string;
  upvotes: string;
  date: string;
}

// Database types
export interface Database {
  transaction: (
    storeNames: string | string[],
    mode?: IDBTransactionMode
  ) => IDBTransaction;
}

// Object Store types
export interface ObjectStore {
  add: (value: any, key?: IDBValidKey) => IDBRequest;
  getAll: () => IDBRequest;
  delete: (key: IDBValidKey) => IDBRequest;
  put: (value: any, key?: IDBValidKey) => IDBRequest;
}

// Context types
export interface DataContextType {
  data: Record[];
  setData: React.Dispatch<React.SetStateAction<Record[]>>;
}
