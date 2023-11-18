import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

describe('./App', () => {
  it('should render bright tree', () => {
    render(<App />);
    const linkElement = screen.getByText(/Bright Tree/i);
    expect(linkElement).toBeInTheDocument();
  });  
});