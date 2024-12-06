import '@testing-library/jest-dom';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import HomePage from '../app/HomePage';

global.fetch = jest.fn();

describe('HomePage Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders navbar and search bar', () => {
    render(<HomePage />);

    // Check if navbar elements are present
    expect(screen.getByText('LAKA')).toBeInTheDocument();
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Profile')).toBeInTheDocument();
    expect(screen.getByText('Logout')).toBeInTheDocument();

    // Check if search bar is present
    expect(screen.getByPlaceholderText('Software Engineer')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Charlotte, NC, USA')).toBeInTheDocument();
    expect(screen.getByText('Search')).toBeInTheDocument();
  });

  test('displays loading state and fetches tech jobs', async () => {
    const mockJobs = [
      {
        id: '1',
        title: 'Software Engineer',
        location: { display_name: 'Charlotte, NC' },
        company: { display_name: 'Tech Corp' },
        description: 'Develop software solutions.',
        redirect_url: 'http://example.com',
      },
    ];

    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ results: mockJobs }),
    });

    render(<HomePage />);

    // Check loading state
    expect(screen.getByText('Loading jobs...')).toBeInTheDocument();

    // Wait for jobs to load
    await waitFor(() => {
      expect(screen.getByText('Software Engineer')).toBeInTheDocument();
    });
  });

  test('handles search functionality', async () => {
    const mockJobs = [
      {
        id: '1',
        title: 'Frontend Developer',
        location: { display_name: 'New York, NY' },
        company: { display_name: 'Code Inc' },
        description: 'Build user interfaces.',
        redirect_url: 'http://example.com',
      },
    ];

    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ results: mockJobs }),
    });

    render(<HomePage />);

    // Enter search criteria
    fireEvent.change(screen.getByPlaceholderText('Software Engineer'), {
      target: { value: 'Frontend Developer' },
    });
    fireEvent.change(screen.getByPlaceholderText('Charlotte, NC, USA'), {
      target: { value: 'New York, NY' },
    });

    fireEvent.click(screen.getByText('Search'));

    // Wait for jobs to load
    await waitFor(() => {
      expect(screen.getByText(/Software Engineer/)).toBeInTheDocument();
    });
  });

  test('displays error message when fetch fails', async () => {
    fetch.mockResolvedValueOnce({ ok: false });

    render(<HomePage />);

    // Wait for error message
    await waitFor(() => {
      expect(screen.getByText('An error occurred while fetching jobs.')).toBeInTheDocument();
    });
  });

  test('renders job details when a job is clicked', async () => {
    const mockJobs = [
      {
        id: '1',
        title: 'Software Engineer',
        location: { display_name: 'Charlotte, NC' },
        company: { display_name: 'Tech Corp' },
        description: 'Develop software solutions.',
        redirect_url: 'http://example.com',
      },
    ];

    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ results: mockJobs }),
    });

    render(<HomePage />);

    // Wait for jobs to load
    await waitFor(() => {
      expect(screen.getByText('Software Engineer')).toBeInTheDocument();
    });

    // Click on a job
    fireEvent.click(screen.getByText('Software Engineer'));

    // Check if job details are displayed
    expect(screen.getByText('Develop software solutions.')).toBeInTheDocument();
    expect(screen.getByText('Apply Now')).toBeInTheDocument();
    expect(screen.getByText('Save')).toBeInTheDocument();
  });

  test('handles Apply Now button click', async () => {
    const mockJobs = [
      {
        id: '1',
        title: 'Software Engineer',
        location: { display_name: 'Charlotte, NC' },
        company: { display_name: 'Tech Corp' },
        description: 'Develop software solutions.',
        redirect_url: 'http://example.com',
      },
    ];

    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ results: mockJobs }),
    });

    render(<HomePage />);

    // Wait for jobs to load
    await waitFor(() => {
      expect(screen.getByText(/Software Engineer/)).toBeInTheDocument();
    });

    // Click on a job
    fireEvent.click(screen.getByText('Software Engineer'));

    // Mock window.open
    const openSpy = jest.spyOn(window, 'open').mockImplementation(() => null);

    // Click Apply Now
    fireEvent.click(screen.getByText('Apply Now'));

    expect(openSpy).toHaveBeenCalledWith('http://example.com', '_blank');
    openSpy.mockRestore();
  });
});
