import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Folder from './Folder'; // Replace with the actual path to your file

describe('/Folder component', () => {
  it('should render Folder component with closed folder icon', () => {
    const props = {
      fileName: 'FolderName',
      isNodeExpanded: false,
      onClick: jest.fn(),
    };

    render(<Folder {...props} />);

    expect(screen.getByTestId('directoryButton')).toBeInTheDocument();
    expect(screen.getByText('FolderName')).toBeInTheDocument();
  });

  it('should render Folder component with open folder icon', () => {
    const props = {
      fileName: 'FolderName',
      isNodeExpanded: true,
      onClick: jest.fn(),
    };

    render(<Folder {...props} />);

    expect(screen.getByTestId('directoryButton')).toBeInTheDocument();
    expect(screen.getByText('FolderName')).toBeInTheDocument();
  });

  it('should call onClick prop when button is clicked', () => {
    const props = {
      fileName: 'FolderName',
      isNodeExpanded: false,
      onClick: jest.fn(),
    };

    render(<Folder {...props} />);
    fireEvent.click(screen.getByTestId('directoryButton'));

    expect(props.onClick).toHaveBeenCalled();
  });
});
