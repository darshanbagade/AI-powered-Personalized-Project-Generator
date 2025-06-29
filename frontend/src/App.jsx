import React from 'react'
import { Route, Routes, useNavigate } from 'react-router';
import HomeComp from './pages/Home';
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
import CognitiveTest from './pages/CognitiveTest';
import CognitiveResults from './pages/CognitiveResults';
// import ErrorBoundary from './components/ErrorBoundary';
// import DebugInfo from './components/DebugInfo';
const App = () => {
  return (
    <AuthProvider>
      <Routes>
        <Route path='/' element={<HomeComp />} />
        <Route path='/login' element={<Login />} />
        
        <Route path='/register' element={<Register />} />
        <Route path='/email-verify' element={<EmailVerify />} />
        <Route path='/reset-password' element={<ResetPassword />} />
        <Route path='/input' element={<ProtectedRoute><Input /></ProtectedRoute>} />
        <Route path='/dashboard' element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path='/quiz' element={<Quiz />} />
        <Route path='/projects' element={<ProtectedRoute><Projects /></ProtectedRoute>} />
        <Route path='/suggest-project' element={<ProtectedRoute><ProjectSuggester/></ProtectedRoute>} />
        <Route path='/cognitive-test' element={<CognitiveTest />} />
        <Route path='/cognitive-results' element={<CognitiveResults />} />
      </Routes>
    </AuthProvider>
  )
}

export default App;