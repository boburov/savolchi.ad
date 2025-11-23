import api from "../axios";
import { API_ENDPOINT } from "../endpoin";

const testService = {
  createTest: async (data: {
    subjectId: string;
    question: string;
    options: { text: string; isCorrect: boolean }[];
  }) => {
    try {
      const response = await api.post(API_ENDPOINT.CREATE_TEST, data);

      if (!response.status || response.status !== 200) {
        throw new Error("Failed to create test");
      }

      return response.data;
    } catch (error: any) {
      console.error("Test yaratishda xatolik:", error.response?.data || error.message);
      throw new Error(
        error.response?.data?.error ||
          error.message ||
          "Test yaratishda xatolik yuz berdi"
      );
    }
  },

  getTestsBySubject: async (subjectId: string) => {
    const res = await api.get(API_ENDPOINT.ALL_TESTS_BY_SUBJECT(subjectId));
    return res.data;
  },

  getTestById: async (id: string) => {
    const res = await api.get(API_ENDPOINT.GET_TEST_BY_ID(id));
    return res.data;
  },

  updateTest: async (id: string, data: any) => {
    const res = await api.put(API_ENDPOINT.UPDATE_TEST(id), data);
    return res.data;
  },

  deleteTest: async (id: string) => {
    const res = await api.delete(API_ENDPOINT.DELETE_TEST(id));
    return res.data;
  },
};

export default testService;
