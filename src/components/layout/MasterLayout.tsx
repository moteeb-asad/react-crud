// Chakra UI
import { Box } from "@chakra-ui/react";

// Components
import Header from "./Header";
import Footer from "./Footer";

// Types
import { MasterLayoutProps } from "../../types";

const MasterLayout: React.FC<MasterLayoutProps> = ({ children }) => {
  return (
    <Box minH="100vh" display="flex" flexDirection="column">
      <Header />
      <Box flex="1">{children}</Box>
      <Footer />
    </Box>
  );
};

export const withMasterLayout = <P extends object>(
  Component: React.ComponentType<P>
): React.FC<P> => {
  return (props: P) => (
    <MasterLayout>
      <Component {...props} />
    </MasterLayout>
  );
};

export default MasterLayout;
