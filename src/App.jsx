import { BrowserRouter, Route, Routes } from "react-router-dom"
import UsersList from "./components/UsersList"
import JobForm from "./components/JobForm"
import DeleteApplication from "./components/DeleteApplication"

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route>
            <Route path="/" element={<UsersList />} />
            <Route path="/add-application" element={<JobForm />} />
            <Route path="/update-application/:id" element={<JobForm />} />
            <Route path="/delete-application/:id" element={<DeleteApplication />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
