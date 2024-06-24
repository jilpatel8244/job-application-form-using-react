import { BrowserRouter, Route, Routes } from "react-router-dom"
import UsersList from "./components/UsersList"
import JobForm from "./components/JobForm"

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route>
            <Route path="/list-users" element={<UsersList />} />
            <Route path="/add-application" element={<JobForm />} />
            <Route path="/update-application/:id" element={<JobForm />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
