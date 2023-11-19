import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Directory from './directory'; 
import { root } from '../../data/files';

describe('./components/directory', () => {
    it('should verify that each file name is rendered', () => {
        render(<Directory root={root} />);

        const fileNames = root.files?.map((file) => file.name);
        fileNames?.forEach((fileName) => {
          const fileElement = screen.getByText(fileName as string);
          expect(fileElement).toBeInTheDocument();
        });    
    });

    it('should display a filter', () => {
      render(<Directory root={root} />);
      expect(screen.getByPlaceholderText('Filter directory...')).toBeInTheDocument();
    });

    it('should filter the directories', () => {
      render(<Directory root={root} />);

      const filterInput = screen.getByTestId('filterInput');
      fireEvent.change(filterInput, { target: { value: 'Cost centres'}});

      expect(screen.queryByText('Employee Handbook')).not.toBeInTheDocument();
      expect(screen.getByText('Cost centres')).toBeInTheDocument();
    })
});