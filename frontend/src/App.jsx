import React from 'react'
import { Route, Routes, useNavigate } from 'react-router';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import EmailVerify from './pages/EmailVerify';
import ResetPassword from './pages/ResetPassword';
import Dashboard from './pages/Dashboard';
import Input from './pages/Input';
import Quiz from './pages/Quiz';
import Projects from './pages/Projects';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import ProjectSuggester from './pages/ProjectSuggester';

const App = () => {
  return (
    <AuthProvider>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/email-verify' element={<EmailVerify />} />
        <Route path='/reset-password' element={<ResetPassword />} />
        <Route path='/input' element={<ProtectedRoute><Input /></ProtectedRoute>} />
        <Route path='/dashboard' element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path='/quiz' element={<Quiz />} />
        <Route path='/projects' element={<ProtectedRoute><Projects /></ProtectedRoute>} />
        <Route path='/suggest-project' element={<ProtectedRoute><ProjectSuggester/></ProtectedRoute>} />
      </Routes>
    </AuthProvider>
  )
}

export default App;