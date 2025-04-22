import React from "react";
import { Box, Text, Flex, Link } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import { APP_CONFIG } from "../../constants/appConstants";
const Header = () => {
  return (
    <Box bg="#fff" color="white" p={4}>
      <Flex justify="space-between" align="center" maxW="8xl" mx="auto">
        <Text fontSize="xl" fontWeight="bold" color="#000">
          {APP_CONFIG.APP_NAME}
        </Text>
        <Flex gap={4}>
          <Link
            as={RouterLink}
            to="/"
            _hover={{ textDecoration: "none" }}
            color="#000"
          >
            Home
          </Link>
          {/* <Link
            as={RouterLink}
            to="/details"
            _hover={{ textDecoration: "none" }}
            color="#000"
          >
            Details
          </Link> */}
        </Flex>
      </Flex>
    </Box>
  );
};

export default Header;
