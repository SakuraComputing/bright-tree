export type IFiles = {
    type: string;
    name: string;
    files?: IFiles[];
    added?: string;
  };
  
  export type SortOption = 'name' | 'added' | 'type';
  
  type IDirectoryProps = {
    root: IFiles;
  };

  const Directory: React.FC<IDirectoryProps> = ({ root }) => {

    return (
        <div>
            {root.files?.map((file, i) => <div key={i}>{file.name}</div>)}
        </div>
    )
  };
  export default Directory;

