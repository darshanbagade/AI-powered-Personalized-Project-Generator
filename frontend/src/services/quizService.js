import { axiosInstance } from '../lib/axios';

export const getQuiz = async ({ concept, domains, summary }) => {
  try {
    const res = await axiosInstance.post('/user/generate-evaluation', {
      concept,
      domains,
      summary,
    });
    return res.data;
  } catch (error) {
    return { success: false, message: error?.response?.data?.message || 'Quiz API error' };
  }
};

export const evaluateQuiz = async ({ quiz, answers }) => {
  try {
    const res = await axiosInstance.post('/user/evaluate-answers', {
      quiz,
      answers,
    });
    return res.data;
  } catch (error) {
    return { success: false, message: error?.response?.data?.message || 'Evaluation API error' };
  }
}; 