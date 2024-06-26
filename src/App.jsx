import { BrowserRouter, Route, Routes } from "react-router-dom"
import UsersList from "./components/UsersList"
import JobForm from "./components/JobForm"
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route>
            <Route path="/" element={<UsersList />} />
            <Route path="/add-application" element={<JobForm />} />
            <Route path="/update-application/:id" element={<JobForm />} />
          </Route>
        </Routes>
      </BrowserRouter>
      <ToastContainer />
    </div>
  )
}

export default App
