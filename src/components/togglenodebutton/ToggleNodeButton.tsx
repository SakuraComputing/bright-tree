import React from 'react';
import { TiFolderOpen, TiFolder } from "react-icons/ti";

interface IButton {
    isNodeExpanded: boolean;
    onClick: () => void;
}

const ToggleNodeButton: React.FC<IButton> = ({ isNodeExpanded, onClick }) => {

    return (
        <button className="folder-button" data-testid={'directoryButton'} onClick={onClick}>
            {isNodeExpanded ? <TiFolderOpen /> : <TiFolder />}
        </button> 
    )
}
export default ToggleNodeButton;