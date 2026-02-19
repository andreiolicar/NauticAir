import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Verification from './pages/TwoFactorAuth';
import Dashboard from './pages/Dashboard';
import Alerts from './pages/Alerts';
import Devices from './pages/Devices';
import RestrictedLayout from './components/Layout/RestrictedLayout';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/verification" element={<Verification />} />
        <Route path="/dashboard" element={<RestrictedLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="alerts" element={<Alerts />} />
          <Route path="alerts/:alertId" element={<Alerts />} />
          <Route path="devices" element={<Devices />} />
          <Route path="devices/:deviceId" element={<Devices />} />
          <Route path="history" element={<Dashboard />} />
          <Route path="settings" element={<Dashboard />} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
