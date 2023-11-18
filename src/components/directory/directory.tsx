import { useState } from "react";
import { IFiles } from "../../data/files";

  type IDirectoryProps = {
  root: IFiles;
};

const Directory: React.FC<IDirectoryProps> = ({ root }) => {

  const [filter, setFilter] = useState('');

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilter(e.target.value);
  };

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
        />
        {root.files?.map(renderNode)}
      </div>
  )
};
export default Directory;

