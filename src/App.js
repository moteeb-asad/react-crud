import './App.css';
import '../src/assets/css/styles.css';
import "@fontsource/montserrat"
import '@fontsource/montserrat/700.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { 
  ChakraProvider,
  extendBaseTheme,
  theme as chakraTheme,
  Link as ChakraLink
 } from '@chakra-ui/react'
import theme from './theme'
import Home from './pages/Home';
import Header from './components/Header';
import { DataProvider } from './context/DataProvider';
import Detail from './pages/Detail';

function App() {
  return (
    <DataProvider>
      <ChakraProvider theme={theme}>
        <Router>
          <Header />
          <Routes>
                <Route exact path="/" element={<Home  />} />
                <Route exact path="/details" element={<Detail />} />
          </Routes>
          {/* <Footer /> */}
        </Router>
      </ChakraProvider>
    </DataProvider>  
  );
}

export default App;
