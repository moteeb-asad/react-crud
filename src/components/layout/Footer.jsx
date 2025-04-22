import React from "react";
import { Box, Text, Flex, Link, Container } from "@chakra-ui/react";

const Footer = () => {
  return (
    <Box as="footer" bg="gray.100" py={4} mt="auto" bgColor="#fff">
      <Container maxW="container.xl">
        <Flex justify="space-between" align="center">
          <Text fontSize={"12px"}>
            &copy; {new Date().getFullYear()} All rights reserved.
          </Text>
          <Flex gap={4} fontSize={"12px"}>
            <Link href="/privacy">Privacy Policy</Link>
            <Link href="/terms">Terms of Service</Link>
          </Flex>
        </Flex>
      </Container>
    </Box>
  );
};

export default Footer;
