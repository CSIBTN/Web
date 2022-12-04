import './App.css';
import { React } from 'react'
import LoginForm from './components/loginform'
import { Route, Routes } from 'react-router-dom'
import { BrowserRouter } from 'react-router-dom'
import { CookiesProvider } from "react-cookie";
import Weather from './components/weather-page';
function App() {
  return (
    <CookiesProvider>
      <BrowserRouter >
        <>
          <Routes>
            <Route path="/" element={<LoginForm />} />
            <Route path="/weather" element={<Weather />} />
          </Routes>
        </>
      </BrowserRouter>
    </CookiesProvider>

  );
}

export default App;
