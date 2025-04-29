// Chakra UI
import { Box, Input } from "@chakra-ui/react";

// Utils
import { getAllRecords } from "../utils/dbUtils";

// Types
import { Record } from "../types";

const SearchTable = ({
  searchText,
  setSearchText,
  setData,
  data,
}: {
  searchText: string;
  setSearchText: (text: string) => void;
  setData: (data: Record[]) => void;
  data: Record[];
}) => {
  // Search Records Table
  const handleSearchChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const text = e.target.value;
    setSearchText(text);
    if (text) {
      const filteredData = data.filter((item: any) =>
        item.title.toLowerCase().includes(text.toLowerCase())
      );
      setData(filteredData);
    } else {
      // When search text is cleared, fetch all records again
      try {
        const allRecords = await getAllRecords();
        setData(allRecords);
      } catch (error) {
        console.error("Error fetching all records:", error);
      }
    }
  };
  return (
    <Box className="search-wrap">
      <Input
        placeholder="Search by title..."
        bg="#fff"
        color="#000"
        value={searchText}
        onChange={handleSearchChange}
      />
    </Box>
  );
};

export default SearchTable;
