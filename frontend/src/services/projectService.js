import { axiosInstance } from '../lib/axios';

export const getProjectSuggestions = async ({ level, domain, concept }) => {
  try {
    const res = await axiosInstance.post('/user/suggest-projects', {
      level,
      domain,
      concept,
    });
    return res.data;
  } catch (error) {
    return { success: false, message: error?.response?.data?.message || 'Project suggestions API error' };
  }
}; 