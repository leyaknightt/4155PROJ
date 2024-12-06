import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Login from '../app/login/page';

beforeEach(() => {
    jest.spyOn(window, 'alert').mockImplementation(() => {});
});

// Restore `window.alert` after all tests
afterEach(() => {
    jest.restoreAllMocks();
});

describe('Login Function', () => {
    test('Renders Login Page', () => {
        render(<Login />);

        // Check if the heading exists
        expect(screen.getByText(/login/i)).toBeInTheDocument();
    
        // Check if email and password inputs exist
        expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    
        // Check if the submit button exists
        expect(screen.getByRole('button', { name: /submit/i })).toBeInTheDocument();
      });
    
      test('shows error alert for invalid credentials', async () =>  {
        render(<Login />);
    
        // Enter invalid credentials
         await userEvent.type(screen.getByLabelText(/email/i), 'wrong@example.com');
         await userEvent.type(screen.getByLabelText(/password/i), 'wrongpassword');

        // Simulate form submission
         await userEvent.click(screen.getByText(/submit/i));

        // Check if the error alert is shown
        expect(window.alert).toHaveBeenCalledWith('Invalid email or password!');
      }); 
    
      test('redirects on successful login', async () => {
        delete window.location; // Mock window.location for testing
        window.location = { href: '' };
    
        render(<Login />);
    
        // Enter valid credentials
        await userEvent.type(screen.getByLabelText(/email/i), 'test@example.com');
        await userEvent.type(screen.getByLabelText(/password/i), '12345');

       // Simulate form submission
        await userEvent.click(screen.getByText(/submit/i));
    
        // Assert that the page redirects
        expect(window.location.href).toBe('/');
      }); 
    });