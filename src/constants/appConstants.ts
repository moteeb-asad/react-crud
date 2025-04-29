// Application Routes
export const ROUTES = {
  HOME: "/",
  DETAILS: "/details",
};

// Application Configuration
export const APP_CONFIG = {
  APP_NAME: "",
  DEFAULT_PAGE_SIZE: 10,
  MAX_RECORDS: 100,
};

// Database Configuration
export const DB_CONFIG = {
  NAME: "crudDB",
  VERSION: 1,
  STORE_NAME: "records",
  STORE_CONFIG: {
    keyPath: "id",
    autoIncrement: true,
  },
  INDEXES: [
    { name: "title", keyPath: "title", options: { unique: false } },
    { name: "upvotes", keyPath: "upvotes", options: { unique: false } },
    { name: "date", keyPath: "date", options: { unique: false } },
  ],
};

// UI Constants
export const UI = {
  COLORS: {
    PRIMARY: "#00a233",
    SECONDARY: "#007ea6",
    DANGER: "#a81502",
    SUCCESS: "#00a233",
  },
  SIZES: {
    CONTAINER_MAX_WIDTH: "8xl",
    FORM_WIDTH: "3",
    TABLE_WIDTH: "6",
  },
};
