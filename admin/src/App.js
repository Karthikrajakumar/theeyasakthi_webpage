import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminLayout from "./layouts/AdminLayout";
import AdminBlogs from "./pages/AdminBlogs";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Songs from "./pages/Songs";
import Podcasts from "./pages/Podcasts";
import Videos from "./pages/Videos";
import Posts from "./pages/Posts";

import "./styles/adminButtons.css";
import { auth } from "./firebase/firebase";

console.log("Firebase auth object:", auth);



function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          {/* Public */}
          <Route path="/login" element={<Login />} />

          {/* Protected Layout */}
          <Route
            element={
              <ProtectedRoute>
                <AdminLayout />
              </ProtectedRoute>
            }
          >
            <Route path="/" element={<Navigate to="/dashboard" />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/songs" element={<Songs />} />
            <Route path="/podcasts" element={<Podcasts />} />
            <Route path="/videos" element={<Videos />} />
            <Route path="/blogs" element={<AdminBlogs />} />
            <Route path="/posts" element={<Posts />} />


          </Route>

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/dashboard" />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
