// src/pages/PetDetails.js

import React from 'react';
import { useLocation } from 'react-router-dom';

/**
 * React component for displaying pet details.
 * @component
 * @returns {JSX.Element}
 */
const PetDetails = () => {
  const location = useLocation();
  const { petData } = location.state || {};

  // If no pet data passed in state
  if (!petData) {
    return <p>Pet not found</p>;
  }

  const {
    name,
    species,
    age,
    size,
    origin,
    priceRange,
    description,
    reviews,
    rating,
    image_url,
  } = petData;

  return (
    <div className="pet-details">
      <div className="pet-details__image">
        <img src={image_url} alt={name} />
      </div>
      <div className="pet-details__info">
        <h2>{name}</h2>
        <p>{description}</p>
        <p>
          <strong>Species:</strong> {species}
        </p>
        <p>
          <strong>Age:</strong> {age} year{age > 1 ? 's' : ''}
        </p>
        <p>
          <strong>Size:</strong> {size}
        </p>
        <p>
          <strong>Origin:</strong> {origin}
        </p>
        <p>
          <strong>Rating:</strong> {rating.toFixed(1)} / 5
        </p>
        <p>
          <strong>Price Range:</strong> {priceRange}
        </p>
        <div className="pet-details__reviews">
          <h3>Reviews:</h3>
          <ul>
            {reviews.map((review, idx) => (
              <li key={idx}>{review}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default PetDetails;
