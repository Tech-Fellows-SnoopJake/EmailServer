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
import { useEffect, useState } from "react"
import { API_URL } from "./utils/constants"

const handleLoginSuccess = () => {
  // Esta función se llamará cuando el inicio de sesión sea exitoso
  // localStorage.setItem("isLoggedIn", "true")

  // Redireccionar al usuario a la bandeja de entrada
  window.location.href = "/inbox"
  return <Navigate to="/inbox" />
}

function App() {
  const [listType, setListType] = useState("inbox")

  const validateToken = async () => {
    const token = localStorage.getItem("jwtToken")
    if (token) {
      try {
        const response = await fetch(`${API_URL}/validate/token`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        if (!response.ok) {
          localStorage.removeItem("jwtToken")
          localStorage.removeItem("refreshToken")
          localStorage.removeItem("id")
          localStorage.removeItem("username")
        }
      } catch (error) {
          localStorage.removeItem("jwtToken")
          localStorage.removeItem("refreshToken")
          localStorage.removeItem("id")
          localStorage.removeItem("username")
      }
    }
  }
  const isLoggedIn = !!localStorage.getItem("jwtToken")

  useEffect(() => { 
    validateToken()
  }, [])

  return (
    <Router>
      <Routes>
        <Route
          path="/login"
          element={!isLoggedIn ? <Login onLoginSuccess={handleLoginSuccess} /> : <Navigate to="/inbox" />}
        />
        <Route path="/register" element={!isLoggedIn ? <Register /> : <Navigate to="/inbox" />} />
        
        {/* Redirect from root to either Login or Inbox based on login status */}
        
        <Route
          path="/"
          element={
            isLoggedIn ? <Navigate to="/inbox" /> : <Navigate to="/login" />
          }
        />

        {/* Layout route for authenticated users */}

        <Route path="/" element={<Layout setListType={setListType}/>}>
          <Route path="inbox" element={isLoggedIn ? <EmailList typeEmail={listType} />: <Navigate to="/login" />} />
          <Route path="sent" element={isLoggedIn ? <EmailList typeEmail={listType} />: <Navigate to="/login" />} />
          <Route path="email/:id" element={isLoggedIn ? <EmailDetail />: <Navigate to="/login" />} />
          <Route path="compose" element={isLoggedIn ? <ComposeEmail /> : <Navigate to="/login" />} />
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
