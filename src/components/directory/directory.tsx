import { IFiles } from "../../data/files";

  type IDirectoryProps = {
  root: IFiles;
};

const Directory: React.FC<IDirectoryProps> = ({ root }) => {

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
          {root.files?.map(renderNode)}
      </div>
  )
};
export default Directory;

