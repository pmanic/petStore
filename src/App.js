import { Route, Routes, Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Navigation from './components/navigation/navigation';
import Home from './pages/home';
import Cart from './pages/cart';
import PetDetails from './pages/petDetails';
import { selectUser } from './redux/authSlice';
import Login from './components/login/login';
import Profile from './pages/profile';
import Chatbot from './components/chatbot/chatbot';

const ProtectedRoute = ({ children }) => {
  const user = useSelector(selectUser);
  const location = useLocation();

  if (!user) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  return children;
};

const App = () => {
  const user = useSelector(selectUser);

  return (
    <div className="app-layout">
      <Navigation />
      <Routes>
        <Route path="/" element={user ? <Home /> : <Login />} />
        <Route
          path="/cart"
          element={
            <ProtectedRoute>
              <Cart />
            </ProtectedRoute>
          }
        />
        <Route
          path="/pets/:petId"
          element={
            <ProtectedRoute>
              <PetDetails />
            </ProtectedRoute>
          }
        />
        <Route path="/profile/:id" element={<Profile />} />
      </Routes>
      <Chatbot />
    </div>
  );
};

export default App;
