// src/components/petList/PetsList.js

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  getPetsList,
  petsState,
  petsListLoadingState,
  petsListErrorState,
} from '../../redux/petsListSlice';
import Loader from '../shared/loader';
import Error from '../shared/error';
import PetItem from './petItem';
import { cartItemsState } from '../../redux/cartSlice';
import { selectUser } from '../../redux/authSlice';

const PetsList = () => {
  const dispatch = useDispatch();

  const pets = useSelector(petsState);
  const loading = useSelector(petsListLoadingState);
  const error = useSelector(petsListErrorState);
  const cartItems = useSelector(cartItemsState);
  const user = useSelector(selectUser);

  const [formName, setFormName] = useState('');
  const [formSpecies, setFormSpecies] = useState('');
  const [formRating, setFormRating] = useState(0);
  const [formMinAge, setFormMinAge] = useState('');
  const [formMaxAge, setFormMaxAge] = useState('');
  const [formSize, setFormSize] = useState('');
  const [formOrigin, setFormOrigin] = useState('');
  const [formPrice, setFormPrice] = useState('');
  const [showOnlyAvailable, setShowOnlyAvailable] = useState(false);
  const [sortBy, setSortBy] = useState('');

  const [appliedFilters, setAppliedFilters] = useState({
    name: '',
    species: '',
    rating: 0,
    minAge: '',
    maxAge: '',
    size: '',
    origin: '',
    price: '',
    onlyAvailable: false,
    sortBy: '',
  });

  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    dispatch(getPetsList());
  }, [dispatch]);

  const applyFilters = () => {
    setAppliedFilters({
      name: formName,
      species: formSpecies,
      rating: formRating,
      minAge: formMinAge,
      maxAge: formMaxAge,
      size: formSize,
      origin: formOrigin,
      price: formPrice,
      onlyAvailable: showOnlyAvailable,
      sortBy: sortBy,
    });
    setShowFilters(false);
  };

  const filteredPets = pets
    .filter((pet) => {
      const {
        name,
        species,
        rating,
        age,
        size,
        origin,
        priceRange,
      } = pet;

      const {
        name: fName,
        species: fSpecies,
        rating: fRating,
        minAge,
        maxAge,
        size: fSize,
        origin: fOrigin,
        price: fPrice,
        onlyAvailable,
      } = appliedFilters;

      const matchesSearch =
        searchQuery === '' ||
        name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        species.toLowerCase().includes(searchQuery.toLowerCase());

      const isReserved = cartItems.some(cartItem => cartItem.id === pet.id);
      const isHomed = (user?.ownedPets || []).some(ownedPet => ownedPet.id === pet.id);
      const matchesAvailability = !onlyAvailable || (!isReserved && !isHomed);

      const matchesName = fName === '' || name.toLowerCase().includes(fName.toLowerCase());
      const matchesSpecies = fSpecies === '' || species.toLowerCase().includes(fSpecies.toLowerCase());
      const matchesRating = fRating === 0 || rating >= fRating;
      const matchesMinAge = minAge === '' || age >= parseInt(minAge, 10);
      const matchesMaxAge = maxAge === '' || age <= parseInt(maxAge, 10);
      const matchesSize = fSize === '' || size === fSize;
      const matchesOrigin = fOrigin === '' || origin.toLowerCase().includes(fOrigin.toLowerCase());
      const matchesPrice = fPrice === '' || priceRange.toLowerCase().includes(fPrice.toLowerCase());

      return (
        matchesSearch &&
        matchesName &&
        matchesSpecies &&
        matchesRating &&
        matchesMinAge &&
        matchesMaxAge &&
        matchesSize &&
        matchesOrigin &&
        matchesPrice &&
        matchesAvailability
      );
    })
    .sort((a, b) => {
      switch (appliedFilters.sortBy) {
        case 'price-asc':
          return a.price - b.price;
        case 'price-desc':
          return b.price - a.price;
        case 'rating-asc':
          return a.rating - b.rating;
        case 'rating-desc':
          return b.rating - a.rating;
        default:
          return 0;
      }
    });

  const toggleFilters = () => setShowFilters(o => !o);

  return (
    <div className="pet-list__wrapper">
      <div className="pet-list__header">
        <h1 className="pet-list__title">Find your new pet</h1>

        <div className="pet-list__filters">
          <button
            className={`pet-list__filter-button btn ${showFilters ? 'pet-list__filter-button--opened' : ''}`}
            onClick={toggleFilters}
          >
            Filters
          </button>

          {showFilters && (
            <div className="pet-list__filter-form">
              <h3>Sort Pets</h3>
              <div className="form-group">
                <label><input type="radio" name="sort" value="price-asc" checked={sortBy === 'price-asc'} onChange={() => setSortBy('price-asc')} /> Price: Low to High</label>
                <label><input type="radio" name="sort" value="price-desc" checked={sortBy === 'price-desc'} onChange={() => setSortBy('price-desc')} /> Price: High to Low</label>
                <label><input type="radio" name="sort" value="rating-asc" checked={sortBy === 'rating-asc'} onChange={() => setSortBy('rating-asc')} /> Rating: Low to High</label>
                <label><input type="radio" name="sort" value="rating-desc" checked={sortBy === 'rating-desc'} onChange={() => setSortBy('rating-desc')} /> Rating: High to Low</label>
              </div>

              <hr/>

              <h3>Filter Pets</h3>
              <div className="flex">
                <div className="form-group">
                  <label>Name</label>
                  <input
                    type="text"
                    value={formName}
                    onChange={(e) => setFormName(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label>Species</label>
                  <input
                    type="text"
                    value={formSpecies}
                    onChange={(e) => setFormSpecies(e.target.value)}
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Rating (min)</label>
                <input
                  type="range"
                  min="0"
                  max="5"
                  step="0.1"
                  value={formRating}
                  onChange={(e) => setFormRating(parseFloat(e.target.value))}
                />
                <span>{formRating.toFixed(1)}</span>
              </div>

              <div className="flex">
                <div className="form-group">
                  <label>Age (min)</label>
                  <input
                    type="number"
                    min="0"
                    value={formMinAge}
                    onChange={(e) => setFormMinAge(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label>Age (max)</label>
                  <input
                    type="number"
                    min="0"
                    value={formMaxAge}
                    onChange={(e) => setFormMaxAge(e.target.value)}
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Size</label>
                <select
                  value={formSize}
                  onChange={(e) => setFormSize(e.target.value)}
                >
                  <option value="">All</option>
                  <option value="Small">Small</option>
                  <option value="Medium">Medium</option>
                  <option value="Large">Large</option>
                </select>
              </div>

              <div className="form-group">
                <label>Origin</label>
                <input
                  type="text"
                  value={formOrigin}
                  onChange={(e) => setFormOrigin(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label>Price Range</label>
                <input
                  type="text"
                  placeholder="e.g. $100"
                  value={formPrice}
                  onChange={(e) => setFormPrice(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label>
                  <input
                    type="checkbox"
                    checked={showOnlyAvailable}
                    onChange={(e) => setShowOnlyAvailable(e.target.checked)}
                  />
                  Show only available pets
                </label>
              </div>

              <button className="btn pet-list__apply-button" onClick={applyFilters}>
                Apply
              </button>
            </div>
          )}
        </div>

        <input
          type="text"
          className="pet-list__search"
          placeholder="Search by name or species"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {loading ? (
        <Loader text="Loading pets..." />
      ) : error ? (
        <Error text="An error occurred while loading pets!" />
      ) : filteredPets.length > 0 ? (
        <div className="pet-list__content">
          {filteredPets.map((pet) => (
            <div className="pet-list__link" key={pet.id}>
              <PetItem data={pet} typeOfPage="petsList" />
            </div>
          ))}
        </div>
      ) : (
        <p>No pets match your criteria.</p>
      )}
    </div>
  );
};

export default PetsList;
