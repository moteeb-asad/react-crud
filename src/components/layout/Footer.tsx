// Chakra UI
import { Box, Text, Flex, Container } from "@chakra-ui/react";

const Footer = () => {
  return (
    <Box as="footer" bg="gray.100" py={4} mt="auto" bgColor="#fff">
      <Container maxW="container.xl">
        <Flex justify="center" align="center">
          <Text fontSize={"12px"}>
            &copy; {new Date().getFullYear()} All rights reserved.
          </Text>
        </Flex>
      </Container>
    </Box>
  );
};

export default Footer;
