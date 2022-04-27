import './App.css';
import TaskBar from './components/TaskBar/TaskBar';
import Home from './components/Home/Home';
import Settings from './components/Settings/Settings';
import {BrowserRouter,Route,Routes} from "react-router-dom"
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Graph from './components/Graph/Graph';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

function App() {
  return (
    <ThemeProvider theme={darkTheme}>
    <BrowserRouter>
        <div className="App">
          <h1>Appliance Controller</h1>
          <TaskBar/>
       </div>
       <Routes>
         <Route path="/" element={<Home/>}/>
         <Route path="/graph" element={<Graph/>}/>
         <Route path="/settings" element={<Settings/>}/>
       </Routes>
    </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
