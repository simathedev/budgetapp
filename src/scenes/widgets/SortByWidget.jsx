import React, { useState, useEffect } from 'react';

const SortByWidget = ({ responseData: propResponseData }) => {
  const [sortOption, setSortOption] = useState(null);
  const [responseData, setResponseData] = useState([]);

  // Function to handle sorting based on the selected option
  const handleSort = (option) => {
    setSortOption(option);

    // Sort the data based on the selected option
    let sortedData = [...propResponseData];
    switch (option) {
      case 'priceHighToLow':
        sortedData.sort((a, b) => b.amount - a.amount);
        break;
      case 'priceLowToHigh':
        sortedData.sort((a, b) => a.amount - b.amount);
        break;
      case 'nameAToZ':
        sortedData.sort((a, b) => a.description.localeCompare(b.description));
        break;
      case 'nameZToA':
        sortedData.sort((a, b) => b.description.localeCompare(a.description));
        break;
      default:
        // No sorting, use the original order
        break;
    }
    setResponseData(sortedData);
  };

  useEffect(() => {
    // Set initial responseData when component mounts
    setResponseData(propResponseData);
  }, [propResponseData]);

  return (
    <div>
      {/* Sort By UI */}
      <label>
        Sort By:
        <select value={sortOption} onChange={(e) => handleSort(e.target.value)}>
          <option value="">No Sorting</option>
          <option value="priceHighToLow">Amount High to Low</option>
          <option value="priceLowToHigh">Amount Low to High</option>
          <option value="nameAToZ">Name A to Z</option>
          <option value="nameZToA">Name Z to A</option>
        </select>
      </label>

      <p>{responseData}</p>
    </div>
  );
};

export default SortByWidget;
