import api from "../axios";
import { API_ENDPOINT } from "../endpoin";

// Test yaratish
export const createTest = async (
  subjectId: string,
  question: string,
  options: { text: string; isCorrect: boolean }[]
) => {
  const { data } = await api.post(API_ENDPOINT.CREATE_TEST, {
    subjectId,
    question,
    options,
  });
  return data;
};

// Testni yangilash
export const updateTest = async (
  testId: string,
  question: string,
  options?: { text: string; isCorrect: boolean }[]
) => {
  const { data } = await api.put(API_ENDPOINT.UPDATE_TEST(testId), {
    question,
    options,
  });
  return data;
};

// Testni o‘chirish
export const deleteTest = async (testId: string) => {
  const { data } = await api.delete(API_ENDPOINT.DELETE_TEST(testId));
  return data;
};

// Bitta testni olish
export const getTestById = async (testId: string) => {
  const { data } = await api.get(API_ENDPOINT.GET_TEST_BY_ID(testId));
  return data;
};

// Subjectdagi barcha testlarni olish
export const getTestsBySubject = async (subjectId: string) => {
  const { data } = await api.get(API_ENDPOINT.ALL_TESTS_BY_SUBJECT(subjectId));
  return data;
};
