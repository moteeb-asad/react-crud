// Chakra UI
import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  styles: {
    global: () => ({
      body: {
        color: "default",
        bg: "#F1F2F3",
      },
    }),
  },
  fonts: {
    heading: `"Montserrat", sans-serif`,
    body: `"Montserrat", sans-serif`,
  },
});

export default theme;
