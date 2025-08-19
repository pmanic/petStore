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
        <p><strong>Address:</strong> {user.address}</p>
        <p><strong>Favorite Pets:</strong> {Array.isArray(user.favorites) ? user.favorites.join(', ') : user.favorites}</p>
        <button className="btn" onClick={handleLogout}>Logout</button>
      </div>

      {user.ownedPets && user.ownedPets.length > 0 && (
        <div className="profile-page__owned-pets">
          <h3>🐾 Owned Pets</h3>
          <div className="profile-page__owned-pets-grid">
            {user.ownedPets.map((pet) => (
              <div key={pet.id} className="profile-page__owned-pets-card">
                <img src={pet.image_url} alt={pet.name} className="profile-page__owned-pets-image" />
                <h4>{pet.name}</h4>
                <p><strong>Species:</strong> {pet.species}</p>
                <p><strong>Age:</strong> {pet.age}</p>
                <p><strong>Size:</strong> {pet.size}</p>
                <p><strong>Origin:</strong> {pet.origin}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
