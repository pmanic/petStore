// src/components/petList/PetItem.js

import { useDispatch, useSelector } from 'react-redux';
import { addToCart, cartItemsState } from '../../redux/cartSlice';
import { selectUser } from '../../redux/authSlice';
import { Link } from 'react-router-dom';

const PetItem = ({ data, typeOfPage }) => {
  const {
    id,
    name,
    species,
    age,
    size,
    origin,
    price,
    rating,
    image_url
  } = data;

  const dispatch = useDispatch();
  const cartItems = useSelector(cartItemsState);
  const user = useSelector(selectUser);

  // Derive status dynamically
  const isReserved = cartItems.some(item => item.id === id);
  const isUnavailable = user?.ownedPets?.some(pet => pet.id === id);
  const status = isUnavailable ? 'unavailable' : isReserved ? 'reserved' : null;

  const handleAddToCart = () => {
    if (!isUnavailable && !isReserved) {
      dispatch(addToCart(data));
    }
  };

  const itemClass =
    status === 'reserved'
      ? 'pet-list__item--reserved'
      : status === 'unavailable'
        ? 'pet-list__item--unavailable'
        : '';

  return (
    <div className={`pet-list__item ${itemClass}`} key={id}>
      <Link
        to={`/pets/${id}`}
        state={{ petData: data }}
        className="pet-list__item-image-container"
      >
        <img
          loading="lazy"
          src={image_url}
          alt={name}
          className="pet-list__item-image"
        />
      </Link>

      <div className="pet-list__item-details">
        <h4 className="pet-list__item-title">{name}</h4>

        {typeOfPage !== 'cart' && (
          <>
            <p className="pet-list__item-info"><span className="pet-list__item-label">Species:</span> {species}</p>
            <p className="pet-list__item-info"><span className="pet-list__item-label">Age:</span> {age} year{age > 1 ? 's' : ''}</p>
            <p className="pet-list__item-info"><span className="pet-list__item-label">Size:</span> {size}</p>
            <p className="pet-list__item-info"><span className="pet-list__item-label">Origin:</span> {origin}</p>
            <p className="pet-list__item-info"><span className="pet-list__item-label">Rating:</span> {rating.toFixed(1)}</p>
          </>
        )}

        <p className="pet-list__item-info"><span className="pet-list__item-label">Price:</span> ${price}</p>

        {typeOfPage !== 'cart' && (
          <button
            className="btn add-to-cart-button"
            onClick={handleAddToCart}
            disabled={isUnavailable || isReserved}
          >
            {isUnavailable ? '🐾 Homed' : isReserved ? 'Reserved' : 'Reserve Pet'}
          </button>
        )}
      </div>
    </div>
  );
};

export default PetItem;
