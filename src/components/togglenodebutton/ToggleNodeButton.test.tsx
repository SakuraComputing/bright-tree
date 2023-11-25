import React from 'react';
import { render, screen } from '@testing-library/react';
import ToggleNodeButton from './ToggleNodeButton';

describe('Button component', () => {
  it('renders correctly', () => {
    render(<ToggleNodeButton isNodeExpanded={false} onClick={() => jest.fn()} />);
    const buttonElement = screen.getByTestId('directoryButton');
    expect(buttonElement).toBeInTheDocument();
  });
});
