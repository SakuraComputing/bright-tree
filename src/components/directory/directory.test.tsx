import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Directory from './Directory'; 
import { root } from '../../data/files';

describe('./components/directory', () => {
    it('should display a filter', () => {
      render(<Directory root={root} />);
      expect(screen.getByPlaceholderText('Filter directory...')).toBeInTheDocument();
    });

    it('should filter the directories', () => {
      render(<Directory root={root} />);

      const filterInput = screen.getByTestId('filterInput');
      fireEvent.change(filterInput, { target: { value: 'Cost centres'}});

      expect(screen.queryByText('Employee Handbook.doc')).not.toBeInTheDocument();
      expect(screen.getByText('Cost centres.csv')).toBeInTheDocument();
    });

    it('should return nothing if unable to find any files', () => {
      render(<Directory root={root} />);

      const filterInput = screen.getByTestId('filterInput');
      fireEvent.change(filterInput, { target: { value: 'zzzzz'}});
      
      expect(screen.getByText('Unable to find any files')).toBeInTheDocument();
    });

    it('should display a sort radio group', () => {
      render(<Directory root={root} />);

      expect(screen.getByText('Sort by:')).toBeInTheDocument();
      expect(screen.getByText('Name')).toBeInTheDocument();
      expect(screen.getByText('Added')).toBeInTheDocument();
      expect(screen.getByText('Type')).toBeInTheDocument();
    });

    it('should sort the by name', () => {
      render(<Directory root={root} />);

      const firstElement = screen.getByText('Employee Handbook.pdf');
      const secondElement = screen.getByText('Public Holiday policy.pdf');

      expect(firstElement.compareDocumentPosition(secondElement)).toBe(4); 
    })

    it('should expand the file structure when the expand button is clicked', () => {
      render(<Directory root={root} />);

      const firstExpandableDir = screen.getAllByTestId('directoryButton')[1];

      fireEvent.click(firstExpandableDir);      

      expect(screen.getByText('Expenses claim form.doc')).toBeInTheDocument();
    })

});