import { Suspense, lazy } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import FormProvider from "./context/FormContext";
import Loader from "./components/commonComponents/Loader";
import ErrorBoundary from "./components/commonComponents/ErrorBoundary";
import AlertProvider from "./context/AlertContext";
const UsersList = lazy(() => import("./pages/users/UsersList"));
const JobForm = lazy(() => import("./pages/jobForm"));

function App() {
  return (
    <div>
      <FormProvider>
        <AlertProvider>
          <BrowserRouter>
            <ErrorBoundary>
              <Suspense fallback={<Loader />}>
                <Routes>
                  <Route>
                    <Route path="/" element={<UsersList />} />
                    <Route path="/add-application" element={<JobForm />} />
                    <Route
                      path="/update-application/:id"
                      element={<JobForm />}
                    />
                  </Route>
                </Routes>
              </Suspense>
            </ErrorBoundary>
          </BrowserRouter>
        </AlertProvider>
      </FormProvider>
      <ToastContainer />
    </div>
  );
}

export default App;
