import axios from 'axios';

const API_URL = 'http://localhost:8000/api';

export const api = axios.create({
    baseURL: API_URL,
});

export const getEvents = async () => {
    const response = await api.get('/events/');
    return response.data;
};

export const createEvent = async (data: any) => {
    const response = await api.post('/events/', data);
    return response.data;
};

export const getEventBySlug = async (slug: string) => {
    const response = await api.get(`/events/${slug}`);
    return response.data;
};
