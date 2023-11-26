import React from 'react';

interface IFilterProps {
    filter: string;
    handleFilterChange: (filter: React.ChangeEvent<HTMLInputElement>) => void;
}

const Filter: React.FC<IFilterProps> = ({ filter, handleFilterChange }) => {
    return (
        <div className="filter-container">
        <input
          type="text"
          placeholder="Filter files..."
          value={filter}
          onChange={handleFilterChange}
          data-testid={'filterInput'}
          className="filter"
        />
      </div>
    )
};
export default Filter;