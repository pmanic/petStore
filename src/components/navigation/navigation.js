import { useState } from 'react';
import { Link } from 'react-router-dom';

import Logo from '../../assets/images/logo.png';
import { ReactComponent as LibraryIcon } from '../../assets/icons/library.svg';
import { ReactComponent as CartIcon } from '../../assets/icons/cart.svg';
import { ReactComponent as ChevronLeft } from '../../assets/icons/chevron-left.svg';

/**
 * Main navigation of the app
 */
const Navigation = () => {
    const [isNavOpened, setIsNavOpened] = useState(true);
    const [activeLink, setActiveLink] = useState('/');

    const handleLinkClick = (e) => {
        setActiveLink(e.target.getAttribute('href'));
    }

    return <div className='navigation'>
        {isNavOpened && <div className='navigation__content'>
            <img className='navigation__logo' src={Logo} alt='Logo' />
            <ul className='navigation__list'>
                <li
                    className={`navigation__item ${activeLink === '/' ? 'navigation__item--active' : ''}`}
                >
                    <LibraryIcon className='icon navigation__icon' />
                    <Link onClick={(e) => handleLinkClick(e)} to='/'>Pets</Link>
                </li>
                <li
                    className={`navigation__item ${activeLink === '/cart' ? 'navigation__item--active' : ''}`}
                >
                    <CartIcon className='icon navigation__icon' />
                    <Link onClick={(e) => handleLinkClick(e)} to='/cart'>Cart</Link>
                </li>
            </ul>
        </div>}
        <div className='navigation__toggler' onClick={() => setIsNavOpened(!isNavOpened)}>
            <ChevronLeft className={`icon navigation__toggler-icon ${!isNavOpened ? 'navigation__toggler-icon--closed' : ''}`} />
        </div>
    </div>
}

export default Navigation;