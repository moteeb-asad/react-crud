import React from "react";
import { Box } from "@chakra-ui/react";
import Header from "./Header";
import Footer from "./Footer";

// Regular component version
const MasterLayout = ({ children }) => {
  return (
    <Box minH="100vh" display="flex" flexDirection="column">
      <Header />
      <Box flex="1">{children}</Box>
      <Footer />
    </Box>
  );
};

// HOC version
export const withMasterLayout = (WrappedComponent) => {
  return (props) => (
    <MasterLayout>
      <WrappedComponent {...props} />
    </MasterLayout>
  );
};

export default MasterLayout;
