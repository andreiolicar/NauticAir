import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Verification from './pages/TwoFactorAuth';
import Dashboard from './pages/Dashboard';
import Alerts from './pages/Alerts';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/verification" element={<Verification />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/dashboard/alerts" element={<Alerts />} />
        <Route path="/dashboard/alerts/:alertId" element={<Alerts />} />
        <Route path="/dashboard/devices" element={<Dashboard />} />
        <Route path="/dashboard/history" element={<Dashboard />} />
        <Route path="/dashboard/settings" element={<Dashboard />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
