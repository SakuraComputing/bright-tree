import { useState } from "react";
import { TiDocument } from "react-icons/ti";
import { IoReturnDownForwardSharp } from "react-icons/io5";
import SortOptions from "../SortOptions/SortOptions";
import Filter from "../Filter/Filter";
import { IFiles, SortOption } from "../../types/tree";
import { sortTree } from "../Helpers/TreeHelper";
import Folder from "../Folder/Folder";

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

  const filteredAndSortedRoot = sortTree(filterTree(root) as IFiles, sortOption);

  const renderNode = (node: IFiles, index: number) => {

    const { name, type, added } = node;

    const isFolder = type === "folder";
    const isNodeExpanded = expandedNodes[getNodeKey(node)];

    return (
      <div key={index} className="element">
        <div className="folder">
          {isFolder ? 
            <Folder fileName={name} isNodeExpanded={isNodeExpanded} onClick={() => handleNodeToggle(node)} /> 
            : <div className="document-container"><IoReturnDownForwardSharp /><TiDocument className="document"/><div>{name}.{type}</div>{added}</div>
          }
        </div>
        {isNodeExpanded && node.files && node.files.map(renderNode)}
      </div>
    );
  };
  
  return (
      <div>
        <div className="tree-container">
          <h2>Files and Folders</h2>
          <div className="modify-container">
            <Filter filter={filter} handleFilterChange={handleFilterChange} />
            <section className="radio-button-container">
              <SortOptions sortOption={sortOption} onSortChange={handleSortChange} />
            </section >
          </div>
          <div className="folder">
            <Folder fileName="root" isNodeExpanded={false} onClick={() => {}} />
          </div>
          {filteredAndSortedRoot ? filteredAndSortedRoot.files && filteredAndSortedRoot.files?.map(renderNode) : <div className="error-message">Unable to find any files</div>}
        </div>
      </div>
  )
};
export default Directory;

