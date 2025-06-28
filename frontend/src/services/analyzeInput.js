import { axiosInstance } from '../lib/axios';

export const analyzeInput = async ({ concept, transcript, domains }) => {
  try {
    const res = await axiosInstance.post('/user/analyze-input', {
      concept,
      transcript,
      domains,
    });
    return res.data;
  } catch (error) {
    return { success: false, message: error?.response?.data?.message || 'API error' };
  }
}; 