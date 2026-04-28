import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider, useAuth } from './context/AuthContext'
import Navbar from './components/Navbar'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import Quiz from './pages/Quiz'
import Results from './pages/Results'
import Leaderboard from './pages/Leaderboard'

function ProtectedRoute({ children }) {
  const { user } = useAuth()
  return user ? children : <Navigate to="/login" replace />
}

function AppLayout({ children }) {
  return (
    <div className="app-shell">
      <Navbar />
      <main style={{ overflow: 'auto', background: 'var(--bg)' }}>
        {children}
      </main>
    </div>
  )
}

function AppRoutes() {
  const { user } = useAuth()
  return (
    <Routes>
      <Route path="/login"    element={user ? <Navigate to="/" /> : <Login />} />
      <Route path="/register" element={user ? <Navigate to="/" /> : <Register />} />
      <Route path="/" element={
        <ProtectedRoute>
          <AppLayout><Dashboard /></AppLayout>
        </ProtectedRoute>
      }/>
      <Route path="/quiz/:category" element={
        <ProtectedRoute>
          <AppLayout><Quiz /></AppLayout>
        </ProtectedRoute>
      }/>
      <Route path="/results" element={
        <ProtectedRoute>
          <AppLayout><Results /></AppLayout>
        </ProtectedRoute>
      }/>
      <Route path="/leaderboard" element={
        <ProtectedRoute>
          <AppLayout><Leaderboard /></AppLayout>
        </ProtectedRoute>
      }/>
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  )
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </AuthProvider>
  )
}
