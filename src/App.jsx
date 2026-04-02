import { Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";
import { setUser, clearUser } from "./store/slices/authSlice";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
import HomePage from "./pages/HomePage";
import ReportPage from "./pages/ReportPage";
import HelpPage from "./pages/HelpPage";
import ChatPage from "./pages/ChatPage";
import AuthPage from "./pages/AuthPage";

function App() {
  const dispatch = useDispatch();
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        dispatch(setUser({
          uid: firebaseUser.uid,
          name: firebaseUser.displayName || "User",
          email: firebaseUser.email,
          photo: firebaseUser.photoURL || null,
        }));
      } else {
        dispatch(clearUser());
      }
      setChecking(false);
    });
    return () => unsubscribe();
  }, [dispatch]);

  if (checking) {
    return (
      <div
        style={{ backgroundColor: "#FEFAE0" }}
        className="min-h-screen flex items-center justify-center"
      >
        <div className="text-center">
          <img
            src="/src/assets/local roots logo.jpg"
            alt="Local Roots"
            className="w-16 h-16 rounded-full object-cover mx-auto mb-4"
          />
          <p style={{ color: "#606C38" }} className="text-lg font-semibold">
            Loading Local Roots...
          </p>
        </div>
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/report" element={
          <ProtectedRoute><ReportPage /></ProtectedRoute>
        } />
        <Route path="/help" element={
          <ProtectedRoute><HelpPage /></ProtectedRoute>
        } />
        <Route path="/chat" element={
          <ProtectedRoute><ChatPage /></ProtectedRoute>
        } />
      </Routes>
    </>
  );
}

export default App;