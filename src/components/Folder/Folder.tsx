import React from 'react';
import { TiFolderOpen, TiFolder } from "react-icons/ti";

interface IFolderProps {
    fileName: string;
    isNodeExpanded: boolean;
    onClick: () => void;
}

const Folder: React.FC<IFolderProps> = ({ fileName, isNodeExpanded, onClick }) => {
    return (
        <div>
            <button className="folder-button" data-testid={'directoryButton'} onClick={onClick}>
                {isNodeExpanded ? <TiFolderOpen /> : <TiFolder />}
            </button> 
            <strong className="directory">{fileName}</strong>
        </div>
    )
};
export default Folder;