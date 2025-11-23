import axios from 'axios';
import { Application } from '../types';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001';

export const applicationsApi = {
  create: async (data: {
    candidateName: string;
    email: string;
    fullName: string;
    position: string;
    cvFilename?: string;
  }): Promise<Application> => {
    const response = await axios.post(`${API_URL}/api/applications`, data);
    return response.data;
  },

  getAll: async (): Promise<Application[]> => {
    const response = await axios.get(`${API_URL}/api/applications`);
    return response.data;
  },

  getByEmail: async (email: string): Promise<Application[]> => {
    const response = await axios.get(`${API_URL}/api/applications/by-email`, {
      params: { email },
    });
    return response.data;
  },

  getById: async (id: number): Promise<Application> => {
    const response = await axios.get(`${API_URL}/api/applications/${id}`);
    return response.data;
  },

  update: async (
    id: number,
    data: { status?: string; notes?: string }
  ): Promise<Application> => {
    const response = await axios.put(`${API_URL}/api/applications/${id}`, data);
    return response.data;
  },

  delete: async (id: number): Promise<void> => {
    await axios.delete(`${API_URL}/api/applications/${id}`);
  },
};


