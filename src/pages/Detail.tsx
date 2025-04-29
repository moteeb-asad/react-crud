// Chakra UI
import { Box, Container, Heading, Flex, Text } from "@chakra-ui/react";

// Components
import { withMasterLayout } from "../components/layout/MasterLayout";

const DetailContent: React.FC = () => {
  return (
    <div className="c-wrap">
      <Container maxW="4xl" bg="white" padding={4} mt={50} mb={50}>
        <Flex alignItems="flex-start" gap="8">
          <Box>
            <Heading as="h5" size="md" pb={4} color="black">
              Tools:{" "}
            </Heading>
            <Text fontSize="sm" mb={2}>
              <strong>Tech :</strong> ReactJS, React Router DOM, TypeScript
            </Text>
            <Text fontSize="sm" mb={2}>
              <strong>CSS Framework :</strong> Chakra UI
            </Text>
            <Text fontSize="sm" mb={2}>
              <strong>State Management :</strong> React Context
            </Text>
            <Text fontSize="sm" mb={2}>
              <strong>Other :</strong> React Formik, IndexDB For Storage, Vite
            </Text>
          </Box>
        </Flex>
        <Flex alignItems="flex-start" gap="8" mt={5}>
          <Box>
            <Heading as="h5" size="md" pb={4} color="black">
              Summary:{" "}
            </Heading>
            <Text>
              Developed Reactjs CRUD application that allows users to perform
              operations such as adding, viewing, deleting, and editing records.
              The application includes form validation using Formik and utilizes
              the Context API for state management and data flow. Furthermore,
              it integrates browser IndexedDB to store records data, which is
              then presented using Chakra UI tables. Additionally, the
              application features data filtration by most upvoted and most
              recent records, as well as a search bar functionality for specific
              data retrieval from the table.
            </Text>
          </Box>
        </Flex>
      </Container>
    </div>
  );
};

// Wrap Detail with MasterLayout HOC
const Detail = withMasterLayout(DetailContent);

export default Detail;
