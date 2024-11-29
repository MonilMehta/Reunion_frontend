import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import Navbar from './components/Navbar';
import TaskList from './components/TaskList';


const Dashboard = React.lazy(() => import('./components/Dashboard'));

function App() {
  const token = localStorage.getItem('token');

  return (
    <Suspense fallback={<div>Loading...</div>}>
    <Router>
    <Navbar />
      <Routes>

        <Route path="/" element={token ? <Navigate to="/dashboard" /> : <Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={token ? <Dashboard /> : <Navigate to="/" />} />
        <Route path="/task-list" element={token ? <TaskList /> : <Navigate to="/" />} />
      </Routes>
    </Router>
    </Suspense>
  );
}

export default App;
