import "./App.css";
import "../src/assets/css/styles.css";
import "@fontsource/montserrat";
import "@fontsource/montserrat/700.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "./styles/theme";
import Home from "./pages/Home.jsx";
import { DataProvider } from "./context/DataProvider";
import Detail from "./pages/Detail.jsx";

function App() {
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
}

export default App;
