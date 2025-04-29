// Styles
import "./App.css";
import "../src/assets/css/styles.css";
import "@fontsource/montserrat";
import "@fontsource/montserrat/700.css";
import theme from "./styles/theme";

// React Router
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Chakra UI
import { ChakraProvider } from "@chakra-ui/react";

// Pages
import Home from "./pages/Home";
import Detail from "./pages/Detail";
import { DataProvider } from "./context/DataProvider";

const App: React.FC = () => {
  return (
    <DataProvider>
      <ChakraProvider theme={theme}>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/details" element={<Detail />} />
          </Routes>
        </Router>
      </ChakraProvider>
    </DataProvider>
  );
};

export default App;
