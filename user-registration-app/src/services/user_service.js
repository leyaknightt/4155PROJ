import axios from 'axios';

const API_URL = 'http://localhost:3000';

const registerUser = async (userData) => {
    try {
        const response = await axios.post(`${API_URL}/registration_form`, userData);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export { registerUser };
