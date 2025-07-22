import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import Logo from '../../assets/images/logo.png';
import { ReactComponent as LibraryIcon } from '../../assets/icons/library.svg';
import { ReactComponent as CartIcon } from '../../assets/icons/cart.svg';
import { ReactComponent as ChevronLeft } from '../../assets/icons/chevron-left.svg';

import { selectUser } from '../../redux/authSlice';

/**
 * Main navigation of the app
 */
const Navigation = () => {
  const [isNavOpened, setIsNavOpened] = useState(true);
  const user = useSelector(selectUser);
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="navigation">
      {isNavOpened && (
        <div className="navigation__content">
          <img className="navigation__logo" src={Logo} alt="Logo" />

          {user && (
            <>
              <ul className="navigation__list">
                <li className={`navigation__item ${location.pathname === '/' ? 'navigation__item--active' : ''}`}>
                  <LibraryIcon className="icon navigation__icon" />
                  <Link to="/">Pets</Link>
                </li>
                <li className={`navigation__item ${location.pathname === '/cart' ? 'navigation__item--active' : ''}`}>
                  <CartIcon className="icon navigation__icon" />
                  <Link to="/cart">Cart</Link>
                </li>
              </ul>
              <div className="navigation__profile-wrapper">
                <div
                    className={`navigation__profile ${location.pathname.startsWith('/profile') ? 'navigation__profile--active' : ''}`}
                    onClick={() => navigate(`/profile/${user.id}`)}
                    role="button"
                    tabIndex={0}
                >
                    <img
                    src={user.image_url}
                    alt={user.username}
                    className="navigation__profile-image"
                    />
                    <span className="navigation__profile-name">{user.username}</span>
                </div>
              </div>
            </>
          )}
        </div>
      )}

      <div className="navigation__toggler" onClick={() => setIsNavOpened(!isNavOpened)}>
        <ChevronLeft
          className={`icon navigation__toggler-icon ${!isNavOpened ? 'navigation__toggler-icon--closed' : ''}`}
        />
      </div>
    </div>
  );
};

export default Navigation;
