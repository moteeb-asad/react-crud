// Chakra UI
import { Button, Flex, Text } from "@chakra-ui/react";

// Context
import { DataContext } from "../context/DataProvider";
import { useContext } from "react";

const SortFilters = ({
  sortBy,
  setSortBy,
}: {
  sortBy: string | null;
  setSortBy: (sortBy: string) => void;
}) => {
  const { data, setData } = useContext(DataContext);
  const sortTable = (key: string) => {
    let sortedData = [...data];
    if (key === "upvotes") {
      sortedData.sort((a, b) => b.upvotes - a.upvotes);
    } else if (key === "date") {
      sortedData.sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
      );
    }
    setSortBy(key);
    setData(sortedData);
  };
  return (
    <>
      <Flex justify="center" mt={6} mb={6} gap={5} alignItems="center">
        <Text color="#000">SORT BY</Text>
        <Button
          bg="#00a233"
          color="#fff"
          borderRadius={0}
          onClick={() => sortTable("upvotes")}
          colorScheme={sortBy === "upvotes" ? "blue" : "gray"}
        >
          Most Upvoted
        </Button>
        <Button
          bg="#00a233"
          color="#fff"
          borderRadius={0}
          onClick={() => sortTable("date")}
          colorScheme={sortBy === "date" ? "blue" : "gray"}
        >
          Most Recent
        </Button>
      </Flex>
    </>
  );
};

export default SortFilters;
