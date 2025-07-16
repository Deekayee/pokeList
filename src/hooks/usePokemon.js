import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPokemons } from '../pokemonSlice';

export const usePokemon = () => {
  const dispatch = useDispatch();
  const { pokemons, loading, error } = useSelector((state) => state.pokemon);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRegions, setSelectedRegions] = useState([]);
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    dispatch(fetchPokemons());
  }, [dispatch]);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
    setCurrentPage(1);
  };

  const handleRegionToggle = (region) => {
    setSelectedRegions((prev) =>
      prev.includes(region) ? prev.filter((r) => r !== region) : [...prev, region]
    );
    setCurrentPage(1);
  };

  const handleTypeToggle = (type) => {
    setSelectedTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    );
    setCurrentPage(1);
  };

  const resetFilters = () => {
    setSelectedRegions([]);
    setSelectedTypes([]);
    setCurrentPage(1);
  };

  const allRegions = [...new Set(pokemons.map((p) => p.region))].sort();
  const allTypes = [...new Set(pokemons.flatMap((p) => p.types || []))].sort();

  const filteredPokemons = pokemons.filter((pokemon) => {
    const matchesSearch = pokemon.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRegion = selectedRegions.length === 0 || selectedRegions.includes(pokemon.region);
    const matchesType = selectedTypes.length === 0 || pokemon.types?.some((type) => selectedTypes.includes(type));
    return matchesSearch && matchesRegion && matchesType;
  });

  return {
    pokemons,
    loading,
    error,
    searchQuery,
    selectedRegions,
    selectedTypes,
    currentPage,
    allRegions,
    allTypes,
    filteredPokemons,
    handleSearchChange,
    handleRegionToggle,
    handleTypeToggle,
    resetFilters,
    setCurrentPage,
  };
};