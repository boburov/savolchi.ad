export const API_ENDPOINT = {
  BASE_URL: "http://localhost:5000",
  REGISTER: "/auth/admin/register",
  LOGIN: "/auth/admin/login",
  ALL: "/channel/all",
  VERIFY: "/auth/verify-email",
  VERIFY_TOKEN: "/auth/verify_token",
  QUESTIONS: "/questions",
  ASK_QUESTION: "/questions/ask",
  ANSWER_QUESTION: (questionId: string) => `/questions/${questionId}/answer`,
  USER_PROFILE: (userId: string) => `/users/${userId}`,
};
