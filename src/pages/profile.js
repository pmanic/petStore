import { useDispatch, useSelector } from 'react-redux';
import { useParams, Navigate, useNavigate } from 'react-router-dom';
import { logout, selectUser } from '../redux/authSlice';

const Profile = () => {
  const { id } = useParams();
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  if (!user || user.id.toString() !== id) {
    return <Navigate to="/" />;
  }

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  return (
    <div className="profile-page">
      <div className="profile-page__card">
        <img src={user.image_url} alt={user.username} className="profile-page__image" />
        <h2>{user.username}</h2>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Username:</strong> {user.username}</p>
        <button className="btn" onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
};

export default Profile;
