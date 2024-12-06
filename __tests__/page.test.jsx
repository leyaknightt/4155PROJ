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

// import { render, screen, fireEvent, waitFor } from '@testing-library/react';
// import HomePage from './HomePage';

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
    expect(screen.getByText('Post a Job')).toBeInTheDocument();
    expect(screen.getByText('Contact')).toBeInTheDocument();

    // Check if search bar is present
    expect(screen.getByPlaceholderText('Software Engineer')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Charlotte, NC, USA')).toBeInTheDocument();
    expect(screen.getByText('Search')).toBeInTheDocument();
  });

  test('displays loading state and fetches jobs', async () => {
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

    // Loading state
    expect(screen.getByText('Loading jobs...')).toBeInTheDocument();

    // Wait for jobs to load
    await waitFor(() => {
      expect(screen.getByText('Software Engineer')).toBeInTheDocument();
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
      expect(screen.getByText('Software Engineer')).toBeInTheDocument();
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
