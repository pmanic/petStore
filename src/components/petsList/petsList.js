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

/**
 * React component for displaying a list of pets with filtering options.
 * @component
 */
const PetsList = () => {
  const dispatch = useDispatch();

  // Redux state selectors
  const petsFromState = useSelector(petsState);
  const petsLoading = useSelector(petsListLoadingState);
  const petsError = useSelector(petsListErrorState);

  // Component state
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [filterName, setFilterName] = useState('');
  const [filterSpecies, setFilterSpecies] = useState('');
  const [filterRating, setFilterRating] = useState(0);
  const [filterPriceRange, setFilterPriceRange] = useState('');

  // Fetch pets on mount
  useEffect(() => {
    dispatch(getPetsList());
  }, [dispatch]);

  /**
   * Filters the list of pets based on search and filter criteria.
   */
  const filterPets = (pets, query, name, species, rating, priceRange) =>
    pets.filter((pet) => {
      const {
        name: petName,
        species: petSpecies,
        rating: petRating,
        priceRange: petPriceRange,
      } = pet;

      return (
        (query === '' ||
          petName.toLowerCase().includes(query.toLowerCase()) ||
          petSpecies.toLowerCase().includes(query.toLowerCase())) &&
        (name === '' ||
          petName.toLowerCase().includes(name.toLowerCase())) &&
        (species === '' ||
          petSpecies.toLowerCase().includes(species.toLowerCase())) &&
        (rating === 0 || petRating >= rating) &&
        (priceRange === '' ||
          petPriceRange.toLowerCase().includes(priceRange.toLowerCase()))
      );
    });

  const filteredPets = filterPets(
    petsFromState,
    searchQuery,
    filterName,
    filterSpecies,
    filterRating,
    filterPriceRange
  );

  const toggleFilters = () => setShowFilters((prev) => !prev);

  return (
    <div className="pet-list__wrapper">
      <div className="pet-list__header">
        <h1 className="pet-list__title">Welcome to PetStore</h1>

        <div className="pet-list__filters">
          <button
            className={`pet-list__filter-button btn ${
              showFilters ? 'pet-list__filter-button--opened' : ''
            }`}
            onClick={toggleFilters}
          >
            Filters
          </button>

          {showFilters && (
            <div className="pet-list__filter-form">
              <h3>Filter Pets</h3>

              <div className="form-group">
                <label>Name</label>
                <input
                  type="text"
                  value={filterName}
                  onChange={(e) => setFilterName(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label>Species</label>
                <input
                  type="text"
                  value={filterSpecies}
                  onChange={(e) => setFilterSpecies(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label>Rating</label>
                <input
                  type="range"
                  min="0"
                  max="5"
                  step="0.1"
                  value={filterRating}
                  onChange={(e) =>
                    setFilterRating(parseFloat(e.target.value))
                  }
                />
                <span>{filterRating.toFixed(1)}</span>
              </div>

              <div className="form-group">
                <label>Price Range</label>
                <input
                  type="text"
                  placeholder="e.g. $100 - $200"
                  value={filterPriceRange}
                  onChange={(e) => setFilterPriceRange(e.target.value)}
                />
              </div>
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

      {petsLoading ? (
        <Loader text="Loading pets..." />
      ) : petsError ? (
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
        <p>No pets match your search or filter criteria.</p>
      )}
    </div>
  );
};

export default PetsList;
