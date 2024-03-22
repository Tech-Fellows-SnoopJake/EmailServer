import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  Outlet,
} from "react-router-dom"
import Header from "./components/Header/Header"
import Sidebar from "./components/Sidebar/Sidebar"
import EmailList from "./components/EmailList/EmailList"
import EmailDetail from "./components/EmailDetail/EmailDetail"
import ComposeEmail from "./components/ComposeEmail/ComposeEmail"
import Login from "./components/Login/Login"
import Register from "./components/Register/Register"
import { useState } from "react"

const handleLoginSuccess = () => {
  // Esta función se llamará cuando el inicio de sesión sea exitoso
  localStorage.setItem("isLoggedIn", "true")

  // Redireccionar al usuario a la bandeja de entrada
  window.location.href = "/inbox"
  return <Navigate to="/inbox" />
}

function App() {
  const [listType, setListType] = useState("inbox") 

  // Assuming you have a way to check if the user is logged in
  const isLoggedIn = () => {
    // Check if there are any jwt tokens in local storage
    return !!localStorage.getItem("userToken")
  }

  return (
    <Router>
      <Routes>
        <Route
          path="/login"
          element={<Login onLoginSuccess={handleLoginSuccess} />}
        />
        <Route path="/register" element={<Register />} />
        
        {/* Redirect from root to either Login or Inbox based on login status */}
        <Route
          path="/"
          element={
            isLoggedIn() ? <Navigate to="/inbox" /> : <Navigate to="/login" />
          }
        />

        {/* Layout route for authenticated users */}

        <Route path="/" element={<Layout setListType={setListType}/>}>
          <Route path="inbox" element={<EmailList typeEmail={listType} />} />
          <Route path="sent" element={<EmailList typeEmail={listType} />} />

          <Route path="email/:id" element={<EmailDetail />} />
          <Route path="compose" element={<ComposeEmail />} />
        </Route>
      </Routes>
    </Router>
  )
}

interface LayoutProps {
  setListType: React.Dispatch<React.SetStateAction<string>>
}

// Component to wrap the layout with Header and Sidebar
const Layout = ( {setListType} : LayoutProps) => (
  <>
    <Header />
    <div className="main-container flex">
      <Sidebar setListType={setListType}/>
      <div className="content-area grow p-5 overflow-y-auto ">
        {/* Outlet will render the nested route components */}
        <Outlet />
      </div>
    </div>
  </>
)

export default App
