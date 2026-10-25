import { useEffect } from 'react';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import SignIn from './pages/SignIn.jsx';
import SignUp from './pages/SignUp.jsx';
import Passwordless from './pages/Passwordless.jsx';

/** Full-screen auth example pages (no app shell). */
export default function AuthApp() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <Routes>
      <Route path="sign-in" element={<SignIn />} />
      <Route path="sign-up" element={<SignUp />} />
      <Route path="passwordless" element={<Passwordless />} />
      <Route path="*" element={<Navigate to="/examples/auth/sign-in" replace />} />
    </Routes>
  );
}
