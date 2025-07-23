// src/components/petList/PetItem.js

import { useDispatch } from 'react-redux';
import { addToCart } from '../../redux/cartSlice';
import { Link } from 'react-router-dom';

/**
 * React component for displaying a pet item.
 * @component
 * @param {Object} data - The pet data to display.
 * @param {string} typeOfPage - The type of page where the pet item is displayed.
 * @returns {JSX.Element}
 */
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
    image_url,
  } = data;

  const dispatch = useDispatch();

  /**
   * Handles the addition of a pet to the cart.
   * @param {Object} pet - The pet data to add to the cart.
   */
  const handleAddToCart = (pet) => {
    dispatch(addToCart(pet));
  };

  return (
    <div className="pet-list__item" key={id}>
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
            <p className="pet-list__item-info">
              <span className="pet-list__item-label">Species:</span> {species}
            </p>
            <p className="pet-list__item-info">
              <span className="pet-list__item-label">Age:</span> {age} year
              {age > 1 ? 's' : ''}
            </p>
            <p className="pet-list__item-info">
              <span className="pet-list__item-label">Size:</span> {size}
            </p>
            <p className="pet-list__item-info">
              <span className="pet-list__item-label">Origin:</span> {origin}
            </p>
            <p className="pet-list__item-info">
              <span className="pet-list__item-label">Rating:</span>{' '}
              {rating.toFixed(1)}
            </p>
          </>
        )}

        <p className="pet-list__item-info">
          <span className="pet-list__item-label">Price:</span>{' '}
          ${price}
        </p>

        {typeOfPage !== 'cart' && (
          <button
            className="btn add-to-cart-button"
            onClick={() => handleAddToCart(data)}
          >
            Reserve Pet
          </button>
        )}
      </div>
    </div>
  );
};

export default PetItem;
