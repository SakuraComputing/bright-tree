import React from "react";
import { SortOption } from "../../data/files";

type ISortOptionsProps = {
  sortOption: SortOption;
  onSortChange: (sortBy: SortOption) => void;
};

const SortOptions: React.FC<ISortOptionsProps> = ({ sortOption, onSortChange }) => {
  return (
    <div>
      Sort by:
      <label className="button-container">
        Name
        <input
          type="radio"
          value="name"
          checked={sortOption === SortOption.Name}
          onChange={() => onSortChange(SortOption.Name)}
        />
      </label>
      <label className="button-container">
        Added
        <input
          type="radio"
          value="added"
          checked={sortOption === SortOption.Added}
          onChange={() => onSortChange(SortOption.Added)}
        />
      </label>
      <label className="button-container">
        Type
        <input
          type="radio"
          value="type"
          checked={sortOption === SortOption.Type}
          onChange={() => onSortChange(SortOption.Type)}
        />
      </label>
    </div>
  );
};

export default SortOptions;
