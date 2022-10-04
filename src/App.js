//import logo from './logo.svg';
//import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { LoginRouter } from './Login';
import MainPage, { MainPageRouter } from "./mainPage";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginRouter />} />
        <Route path="/mainPage" element={<MainPageRouter />} />
        
      </Routes>
    </BrowserRouter>
  )
}

export default App;
