import { useState, useEffect } from 'react';
import listingsData from '../data/ListingData.json';

const useListings = (initialPage = 1, itemsPerPage = 20) => {
  const [listings, setListings] = useState([]);
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchListings = () => {
      setLoading(true);
      const start = (currentPage - 1) * itemsPerPage;
      const end = start + itemsPerPage;
      setListings((prevListings) => [
        ...prevListings,
        ...listingsData.slice(start, end),
      ]);
      setLoading(false);
    };

    fetchListings();
  }, [currentPage, itemsPerPage]);

  const loadMore = () => setCurrentPage((prevPage) => prevPage + 1);

  return { listings, loading, loadMore };
};

export default useListings;
