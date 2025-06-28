import { axiosInstance } from '../lib/axios';

export const getHints = async ({ concept, projectTitle }) => {
  try {
    const res = await axiosInstance.post('/user/get-hints', {
      concept,
      projectTitle,
    });
    return res.data;
  } catch (error) {
    return { success: false, message: error?.response?.data?.message || 'Hints API error' };
  }
};

export const revealSolution = async ({ projectTitle, userLevel }) => {
  try {
    const res = await axiosInstance.post('/user/reveal-solution', {
      projectTitle,
      userLevel,
    });
    return res.data;
  } catch (error) {
    return { success: false, message: error?.response?.data?.message || 'Solution API error' };
  }
}; 