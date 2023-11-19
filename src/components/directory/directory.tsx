import { useState } from "react";
import { IFiles } from "../../data/files";

  type IDirectoryProps = {
  root: IFiles;
};

const Directory: React.FC<IDirectoryProps> = ({ root }) => {

  const [filter, setFilter] = useState('');

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

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilter(e.target.value);
  };

  const filteredRoot = filterTree(root) as IFiles;

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
         <input
          type="text"
          placeholder="Filter directory..."
          value={filter}
          onChange={handleFilterChange}
          data-testid={'filterInput'}
        />
        {filteredRoot.files && filteredRoot.files?.map(renderNode)}
      </div>
  )
};
export default Directory;

