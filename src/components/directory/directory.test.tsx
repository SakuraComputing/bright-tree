import React from 'react';
import { render, screen } from '@testing-library/react';
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
});