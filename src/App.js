import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import react, { useEffect, useState } from 'react';
import Home from "./pages/home"
import Form from './pages/Form';
import Navbar from "./components/navbar"
import UserInfo from "./pages/userInfo"
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import { CircularProgress } from '@mui/material';

const employeeObject = { name: "", id: "", salary: "", email: "", phone: "", age: "", department: "", position: "" }
function App() {
  const [alert, setAlert] = useState({ enable: "", type: "", message: "" })
  const [isLoading, setLoading] = useState(false);
  const [formdetails, setFormDetails] = useState(employeeObject)

  
  return (
    <>
      {isLoading ? <div className='center-container'><CircularProgress /></div> : <>
        <BrowserRouter>
          <Navbar />
          {
            alert.enable ? <Stack sx={{ width: '100%' }} spacing={2}>
              <Alert severity={alert.type}>{alert.message}</Alert>
            </Stack> : ""
          }
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/form' element={<Form alert={alert} setAlert={setAlert} formdetails={formdetails} setFormDetails={setFormDetails}  isLoading={isLoading} setLoading={setLoading} />} />
            <Route path='/user' element={<UserInfo formdetails={formdetails} setFormDetails={setFormDetails} alert={alert} setAlert={setAlert} isLoading={isLoading} setLoading={setLoading} />} />
          </Routes>
        </BrowserRouter>
      </>}

    </>
  );
}

export default App;
