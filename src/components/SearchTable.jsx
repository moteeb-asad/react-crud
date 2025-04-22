import { Box, Input } from "@chakra-ui/react";

const SearchTable = ({
  tableData,
  onDataUpdate,
  searchText,
  setSearchText,
}) => {
  // Search Records Table
  const handleSearchChange = (e) => {
    const text = e.target.value;
    setSearchText(text);
    if (text) {
      const filteredData = tableData.filter((item) =>
        item.title.toLowerCase().includes(text.toLowerCase())
      );
      onDataUpdate(filteredData);
    } else {
      onDataUpdate(tableData);
    }
  };
  return (
    <Box className="search-wrap">
      <Input
        placeholder="Search the record..."
        bg="#fff"
        color="#000"
        value={searchText}
        onChange={handleSearchChange}
      />
    </Box>
  );
};

export default SearchTable;
