import { useState } from "react";
import { IFiles, SortOption } from "../../data/files";

  type IDirectoryProps = {
  root: IFiles;
};

const Directory: React.FC<IDirectoryProps> = ({ root }) => {

  const [filter, setFilter] = useState('');
  const [sortOption, setSortOption] = useState<SortOption>(SortOption.Name);
  const [expandedNodes, setExpandedNodes] = useState<Record<string, boolean>>({});

  const filterTree = (node: IFiles ): IFiles | null => {

    const filteredNode: IFiles = {
      ...node,
      // @ts-ignore÷
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
    if(node === null) return node;

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

  const handleNodeToggle = (node: IFiles) => {
    setExpandedNodes((prevExpanded) => ({
      ...prevExpanded,
      [getNodeKey(node)]: !prevExpanded[getNodeKey(node)],
    }));
  };

  const getNodeKey = (node: IFiles) => {
    // Generate a unique key for each node based on its properties
    return `${node.type}_${node.name}_${node.added}`;
  };

  const filteredAndSortedRoot = sortTree(filterTree(root) as IFiles);

  const renderNode = (node: IFiles, index: number) => {
    const isFolder = node.type === "folder";
    const isNodeExpanded = expandedNodes[getNodeKey(node)];

    return (
      <div key={index} className="element">
        <div className="folder">
          {isFolder && (
            <button className="button" data-testid={'directoryButton'} onClick={() => handleNodeToggle(node)}>
              {isNodeExpanded ? "-" : "+"}
            </button>
          )}
          {isFolder ? <strong className="directory">{node.name}</strong> : <span>{`--${node.name} - Date: ${node.added} Type: ${node.type}`}</span>}
        </div>
        {isNodeExpanded && node.files && node.files.map(renderNode)}
      </div>
    );
  };
  
  return (
      <div>
        <div className="filter-container">
          <input
            type="text"
            placeholder="Filter directory..."
            value={filter}
            onChange={handleFilterChange}
            data-testid={'filterInput'}
            className="filter"
          />
        </div>
        <section className="radio-button-container">
          <div>
            Sort by:
            <label className="button-container">
              Name
              <input type="radio" value="name" checked={sortOption === SortOption.Name} onChange={() => handleSortChange(SortOption.Name)} />
            </label>
            <label className="button-container">
              Added
              <input type="radio" value="added" checked={sortOption === SortOption.Added} onChange={() => handleSortChange(SortOption.Added)} />
            </label>            
            <label className="button-container">
              Type
              <input type="radio" value="type" checked={sortOption === SortOption.Type} onChange={() => handleSortChange(SortOption.Type)} />
            </label>
            
          </div>
        </section >
        <div className="tree-container">
          <h2>Files and Folders</h2>
          {filteredAndSortedRoot ? filteredAndSortedRoot.files && filteredAndSortedRoot.files?.map(renderNode) : <div className="error-message">Unable to find any files</div>}
        </div>
      </div>
  )
};
export default Directory;

