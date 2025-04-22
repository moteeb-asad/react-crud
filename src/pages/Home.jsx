import React, { useEffect } from "react";
import { Container, Flex, Box } from "@chakra-ui/react";
import { useData } from "../hooks/useData";
import { withMasterLayout } from "../components/layout/MasterLayout";
import AddRecord from "../components/record/AddRecord";
import ViewRecord from "../components/record/ViewRecord";

const HomeContent = () => {
  const { data, setData, loading, error } = useData([]);

  useEffect(() => {
    console.log("Current data:", data);
  }, [data]);

  const handleDataUpdate = (newData) => {
    // Ensure we're always working with an array
    const updatedData = Array.isArray(newData) ? newData : [];
    setData(updatedData);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <Container maxW="8xl" color="white" padding={4} mt={50} mb={50}>
      <Flex gap={20}>
        <Box
          flex="3"
          bg="#fff"
          pl={8}
          pr={8}
          pt={6}
          pb={6}
          className="form-box-wrap"
        >
          <AddRecord onDataUpdate={handleDataUpdate} />
        </Box>
        <Box flex="6">
          <ViewRecord tableData={Array.isArray(data) ? data : []} />
        </Box>
      </Flex>
    </Container>
  );
};

// Wrap HomeContent with MasterLayout HOC
const Home = withMasterLayout(HomeContent);

export default Home;
