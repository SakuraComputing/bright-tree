import { useState } from "react";
import { IFiles, SortOption } from "../../data/files";

  type IDirectoryProps = {
  root: IFiles;
};

const Directory: React.FC<IDirectoryProps> = ({ root }) => {

  const [filter, setFilter] = useState('');
  const [sortOption, setSortOption] = useState<SortOption>(SortOption.Name);

  const filterTree = (node: IFiles ): IFiles | null => {
    const filteredNode: IFiles = {
      ...node,
      // @ts-ignore
      files: node.files ? node.files.map(filterTree).filter((n) => n !== null) : null
    };

    // If the node passes the filter or has filtered children, return the filtered node
    if (
      filteredNode.name.toLowerCase().includes(filter.toLowerCase()) ||
      (filteredNode.files && filteredNode.files.length > 0)
    ) {
      return filteredNode;
    }

    // If the node and its children don't pass the filter, return null
    return null;
  };

  const sortTree = (node: IFiles): IFiles => {
    const sortedNode: IFiles = {
      ...node,
      files: node.files ? node.files.map(sortTree) : undefined,
    };

    // Sort the node's children based on the selected sort option
    if (sortedNode.files) {
      sortedNode.files.sort((a, b) => {
        switch (sortOption) {
          case SortOption.Name:
            return a.name.localeCompare(b.name);
          case SortOption.Added:
            return (a.added || '').localeCompare(b.added || '');
          case SortOption.Type:
            return a.type.localeCompare(b.type);
          default:
            return 0;
        }
      });
    }

    return sortedNode;
  };

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilter(e.target.value);
  };

  const handleSortChange = (sortBy: SortOption) => {
    setSortOption(sortBy as SortOption);
  };

  const filteredAndSortedRoot = sortTree(filterTree(root) as IFiles);

  const renderNode = (node: IFiles, index: number) => (
      <div key={index} className="element">
        {node.type === 'folder' ? (
          <strong>{node.name}</strong>
        ) : (
          <span>{node.name}</span>
        )}
        {node.files && node.files.map(renderNode)}
      </div>
    );

  return (
      <div>
        <div>
          <input
            type="text"
            placeholder="Filter directory..."
            value={filter}
            onChange={handleFilterChange}
            data-testid={'filterInput'}
          />
        </div>
        <label>
          Sort by:
          <div>
            <label>
              Name
              <input type="radio" value="name" checked={sortOption === SortOption.Name} onChange={() => handleSortChange(SortOption.Name)} />
            </label>
            <label>
              Added
              <input type="radio" value="added" checked={sortOption === SortOption.Added} onChange={() => handleSortChange(SortOption.Added)} />
            </label>            
            <label>
              Type
              <input type="radio" value="type" checked={sortOption === SortOption.Type} onChange={() => handleSortChange(SortOption.Type)} />
            </label>
            
          </div>
        </label>
        {filteredAndSortedRoot.files && filteredAndSortedRoot.files?.map(renderNode)}
      </div>
  )
};
export default Directory;

