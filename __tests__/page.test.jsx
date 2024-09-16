import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import Page from '../app/page';

describe('Page', () => {
  it('renders the page', () => {
    const { container } = render(<Page />);
    
    // Check if the container exists in the document
    expect(container).toBeInTheDocument();
  });
});