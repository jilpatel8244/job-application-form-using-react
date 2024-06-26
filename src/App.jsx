import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import JobForm from "./pages/jobForm";
import UsersList from "./pages/users/UsersList";
import FormProvider from "./context/FormContext";

function App() {
  return (
    <div>
      <FormProvider>
        <BrowserRouter>
          <Routes>
            <Route>
              <Route path="/" element={<UsersList />} />
              <Route path="/add-application" element={<JobForm />} />
              <Route path="/update-application/:id" element={<JobForm />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </FormProvider>
      <ToastContainer />
    </div>
  )
}

export default App
