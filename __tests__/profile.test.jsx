import '@testing-library/jest-dom';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Profile from '../app/profile/page';

describe('Profile page', () => {
    test('should display user profile details', async () => {
        render(<Profile />);

        // wait for data to be rendered
        await waitFor(() => {
            expect(screen.getByText(/Jane Doe/)).toBeInTheDocument();
        });
    });

    test('should allow user to edit their bio', async () => {
        render(<Profile />);

        // wait for data to be rendered
        await waitFor(() => {
            fireEvent.click(screen.getAllByText(/Edit/)[0]);

            //Check if inputs are displayed
            expect(screen.getByPlaceholderText(/Enter your name/)).toHaveValue('Jane Doe');
            expect(screen.getByPlaceholderText('Tell us about yourself')).toHaveValue('Aspiring software developer with a passion for learning.');
            expect(screen.getByPlaceholderText('Enter your email')).toHaveValue('jane.doe@gmail.com');

            //Simulate entering new values
            fireEvent.change(screen.getByPlaceholderText('Enter your name'), { target: { value: 'Jess' } });

            fireEvent.click(screen.getByText('Save'));

            // Verify new values are displayed
            expect(screen.getByText('Jess')).toBeInTheDocument();
        });
    });


    test('allow user to edit education section', async () => {
        render(<Profile />);

        await waitFor(() => {
            fireEvent.click(screen.getAllByText(/Edit/)[1]);

            //check if inputs are displayed
            expect(screen.getByPlaceholderText('School Name')).toHaveValue('University of North Carolina at Charlotte');

            //Simulate entering new values
            fireEvent.change(screen.getByPlaceholderText('School Name'), { target: { value: 'University of Utah' } });

            fireEvent.click(screen.getByText('Save Changes'));

            // Verify new values are displayed
            expect(screen.getByText('University of Utah')).toBeInTheDocument();

        });
    });

    test('all user to delete an education', async () => {
        render(<Profile />);

        await waitFor(() => {
            fireEvent.click(screen.getAllByText(/Delete/)[0]);

            //check if inputs are displayed
            expect(screen.queryByText('University of North Carolina at Charlotte')).not.toBeInTheDocument();
        });
    });

    test('allow user to add a new education', async () => {
        render(<Profile />);

        await waitFor(() => {
            fireEvent.click(screen.getAllByText('+')[0]);

            // add new experience
            fireEvent.change(screen.getByPlaceholderText('School Name'), { target: { value: 'Harvard University' } });
            fireEvent.change(screen.getByPlaceholderText('Bachelor of Science'), { target: { value: 'Bachelor of Arts' } });
            fireEvent.change(screen.getByPlaceholderText('2020-2024'), { target: { value: '2024-Present' } });
            fireEvent.change(screen.getByPlaceholderText('Enter your major here'), { target: { value: 'Graphic Design' } });

            fireEvent.click(screen.getByText('Add Education'));

            //assert new interest is in the list
            expect(screen.getByText('Harvard University')).toBeInTheDocument();

        });
    });

    // certifications section
    test('add a new certification to the list', async () => {
        render(<Profile />);

        await waitFor(() => {
            // add a new cert
            fireEvent.change(screen.getByPlaceholderText('Add certification here'), { target: { value: 'CompTIA A+' } });

            fireEvent.click(screen.getAllByText('+')[1]);

            //asserts it is added
            expect(screen.getByText('CompTIA A+')).toBeInTheDocument();
        });
    });

    // Skills and Interests section
    test('allow user to add a skill tag', async() => {
        render(<Profile />);

        await waitFor(() => {
            fireEvent.click(screen.getByText('Skill Tags'));
            fireEvent.change(screen.getByPlaceholderText('Add tag here'), {target: {value: 'React'}});
            fireEvent.click(screen.getAllByText('+')[2]);

            expect(screen.getByText('React')).toBeInTheDocument();
        });
    });

    test('allow user to add interest tag', async() => {
        render(<Profile />);

        await waitFor(() => {
            fireEvent.click(screen.getByText('Interest Tags'));
            fireEvent.change(screen.getByPlaceholderText('Add tag here'), {target: {value: 'Cars'}});
            fireEvent.click(screen.getAllByText('+')[2]);

            expect(screen.getByText('Cars')).toBeInTheDocument();
        });
    });

    // experience section
    test('allow user to edit experience section', async () => {
        render(<Profile />);

        await waitFor(() => {
            fireEvent.click(screen.getAllByText(/Edit/)[2]);
            //check if inputs are displayed
            expect(screen.getByPlaceholderText('Enter job title')).toHaveValue('Software Engineer');

            //Simulate entering new values
            fireEvent.change(screen.getByPlaceholderText('Enter job title'), { target: { value: 'Game Designer' } });

            fireEvent.click(screen.getByText('Save Changes'));

            // Verify new values are displayed
            expect(screen.getByText('Game Designer')).toBeInTheDocument();

        });
    });

    test('all user to delete an experience', async () => {
        render(<Profile />);

        await waitFor(() => {
            fireEvent.click(screen.getAllByText(/Delete/)[1]);

            //check if inputs are displayed
            expect(screen.queryByText('Microsoft')).not.toBeInTheDocument();
        });
    });

    test('allow user to add a new experience', async () => {
        render(<Profile />);

        await waitFor(() => {
            fireEvent.click(screen.getAllByText('+')[3]);

            // add new experience
            fireEvent.change(screen.getByPlaceholderText('Enter job title'), { target: { value: 'Graphic Designer' } });
            fireEvent.change(screen.getByPlaceholderText('Enter company name'), { target: { value: 'EASports' } });
            fireEvent.change(screen.getAllByPlaceholderText('Month Year')[0], { target: { value: 'Jan 2024' } });
            fireEvent.change(screen.getAllByPlaceholderText('Month Year')[1], { target: { value: 'Present' } });
            fireEvent.change(screen.getByPlaceholderText('Add a brief description of your job responsibilities'), { target: { value: 'Designed graphics for video game' } });

            fireEvent.click(screen.getByText('Add Experience'));

            //assert new interest is in the list
            expect(screen.getByText('Graphic Designer')).toBeInTheDocument();

        });
    });
});