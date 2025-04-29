// Chakra UI
import { Container, Flex, Box } from "@chakra-ui/react";

// Components
import { withMasterLayout } from "../components/layout/MasterLayout";
import AddRecord from "../components/record/AddRecord";
import ViewRecord from "../components/record/ViewRecord";

const HomeContent: React.FC = () => {
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
          <AddRecord />
        </Box>
        <Box flex="6">
          <ViewRecord />
        </Box>
      </Flex>
    </Container>
  );
};

// Wrap HomeContent with MasterLayout HOC
const Home = withMasterLayout(HomeContent);

export default Home;
